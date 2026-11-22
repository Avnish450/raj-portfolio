"""
Integration and validation test suite for Raj's portfolio backend.
Tests endpoints, SQLite persistence, rate limiting, and honeypot protection.
"""

import os
import tempfile
import unittest
import json

# Use a temporary database for test suite isolation
temp_db_fd, temp_db_path = tempfile.mkstemp(suffix=".db")
os.environ["DATABASE_PATH"] = temp_db_path

import database
database.DB_PATH = temp_db_path
database.init_db()

from app import app, ip_submissions


class FeedbackAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.client = self.app.test_client()
        # Reset rate limiting between tests
        ip_submissions.clear()

    def test_health_check(self):
        """GET /api/health returns 200 with healthy status."""
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data["status"], "healthy")

    def test_valid_feedback_submission(self):
        """POST /api/feedback saves valid feedback and returns 201."""
        payload = {
            "name": "Sarah Connor",
            "category": "Design & UI",
            "rating": 5,
            "message": "The typography and dark aesthetic are exceptionally well crafted. Clean work!",
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data["status"], "success")
        self.assertIn("id", data)

        # Verify persisted in SQLite
        records = database.get_all_feedback(limit=1)
        self.assertGreater(len(records), 0)
        latest = records[0]
        self.assertEqual(latest["name"], "Sarah Connor")
        self.assertEqual(latest["category"], "Design & UI")
        self.assertEqual(latest["rating"], 5)
        self.assertIn("typography", latest["message"])

    def test_anonymous_feedback_submission(self):
        """Name is optional; defaults to 'Anonymous' if omitted."""
        payload = {
            "category": "Projects",
            "rating": 4,
            "message": "Really like the layout of the project cards. The technical spec grid is clear.",
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        latest = database.get_all_feedback(limit=1)[0]
        self.assertEqual(latest["name"], "Anonymous")

    def test_honeypot_rejection(self):
        """If bot fills the honeypot field, submission is rejected."""
        payload = {
            "name": "Bot Spammer",
            "category": "Other",
            "rating": 5,
            "message": "Buy cheap stuff at spam dot com!",
            "website": "http://spam.example.com",  # Honeypot trap
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        data = response.get_json()
        self.assertEqual(data["status"], "error")

    def test_name_exceeds_80_chars(self):
        """Names longer than 80 chars are rejected."""
        payload = {
            "name": "A" * 81,
            "category": "Suggestions",
            "rating": 3,
            "message": "A constructive message with sufficient length.",
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("cannot exceed 80 characters", response.get_json()["message"])

    def test_invalid_category_rejected(self):
        """Unrecognized categories are rejected."""
        payload = {
            "name": "Alex",
            "category": "Crypto & Stocks",
            "rating": 4,
            "message": "This should fail because of category check.",
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid category", response.get_json()["message"])

    def test_invalid_rating_rejected(self):
        """Ratings must be integer 1 to 5."""
        for invalid_rating in [0, 6, -1, "five", None]:
            payload = {
                "category": "Design & UI",
                "rating": invalid_rating,
                "message": "Valid length message for testing ratings.",
            }
            response = self.client.post(
                "/api/feedback",
                data=json.dumps(payload),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, 400)

    def test_short_message_rejected(self):
        """Messages with under 10 characters are rejected."""
        payload = {
            "category": "Content",
            "rating": 5,
            "message": "Good!",  # Only 5 chars
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("at least 10 characters", response.get_json()["message"])

    def test_long_message_rejected(self):
        """Messages with over 1000 characters are rejected."""
        payload = {
            "category": "Content",
            "rating": 5,
            "message": "A" * 1001,
        }
        response = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("under 1000 characters", response.get_json()["message"])

    def test_rate_limiting(self):
        """Client IP is rate limited after 5 submissions."""
        payload = {
            "category": "Suggestions",
            "rating": 5,
            "message": "Automated stress test message for rate limiter.",
        }
        for i in range(5):
            res = self.client.post(
                "/api/feedback",
                data=json.dumps(payload),
                content_type="application/json",
                environ_base={"REMOTE_ADDR": "192.168.1.100"},
            )
            self.assertEqual(res.status_code, 201)

        # 6th request from same IP must receive 429
        blocked = self.client.post(
            "/api/feedback",
            data=json.dumps(payload),
            content_type="application/json",
            environ_base={"REMOTE_ADDR": "192.168.1.100"},
        )
        self.assertEqual(blocked.status_code, 429)


if __name__ == "__main__":
    unittest.main()
