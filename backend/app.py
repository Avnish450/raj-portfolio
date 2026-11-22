"""
Flask Backend API for Raj's Portfolio.
Provides:
- POST /api/feedback: Validated, rate-limited feedback submission with SQLite persistence.
- GET /api/health: Health check and connectivity status.
"""

import os
import time
from collections import defaultdict
from typing import Dict, List, Tuple
from flask import Flask, request, jsonify
from database import init_db, insert_feedback

# Optional flask_cors integration with graceful fallback
try:
    from flask_cors import CORS
    HAS_FLASK_CORS = True
except ImportError:
    HAS_FLASK_CORS = False

app = Flask(__name__)

# Request size limit: 32 KB maximum payload to prevent payload inflation
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024

# CORS configuration
ALLOWED_ORIGINS_RAW = os.environ.get(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000",
)
ALLOWED_ORIGINS = [orig.strip() for orig in ALLOWED_ORIGINS_RAW.split(",") if orig.strip()]

if HAS_FLASK_CORS:
    CORS(app, resources={r"/api/*": {"origins": "*" if "*" in ALLOWED_ORIGINS else ALLOWED_ORIGINS}})


@app.after_request
def add_cors_headers(response):
    """Ensure CORS headers are set properly even if flask_cors is not present."""
    origin = request.headers.get("Origin")
    if origin and ("*" in ALLOWED_ORIGINS or origin in ALLOWED_ORIGINS):
        response.headers["Access-Control-Allow-Origin"] = origin
    elif "*" in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response


# Rate limiting: Max 5 submissions per 10 minutes (600 seconds) per IP
RATE_LIMIT_MAX_REQUESTS = 5
RATE_LIMIT_WINDOW_SECONDS = 600
ip_submissions: Dict[str, List[float]] = defaultdict(list)


def check_rate_limit(ip_address: str) -> bool:
    """Check if the given IP address has exceeded the submission rate limit."""
    now = time.time()
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS

    # Filter out timestamps older than the window
    recent = [ts for ts in ip_submissions[ip_address] if ts > cutoff]
    ip_submissions[ip_address] = recent

    if len(recent) >= RATE_LIMIT_MAX_REQUESTS:
        return False

    recent.append(now)
    ip_submissions[ip_address] = recent
    return True


VALID_CATEGORIES = [
    "Design & UI",
    "Projects",
    "Content",
    "Suggestions",
    "Other",
]


def validate_feedback_payload(data: dict) -> Tuple[bool, str, dict]:
    """
    Strict server-side validation.
    Returns (is_valid, error_message, sanitized_data).
    """
    if not isinstance(data, dict):
        return False, "Request body must be a JSON object.", {}

    # 1. Honeypot check: Bots usually fill out invisible fields
    honeypot = data.get("honeypot") or data.get("website")
    if honeypot:
        # Silently reject bot activity or return a standard generic error
        return False, "Automated submission rejected.", {}

    # 2. Name validation (optional, max 80 chars)
    name_raw = data.get("name")
    if name_raw is not None:
        if not isinstance(name_raw, str):
            return False, "Name must be a text string.", {}
        name = name_raw.strip()
        if len(name) > 80:
            return False, "Name cannot exceed 80 characters.", {}
    else:
        name = "Anonymous"

    # 3. Category validation (mandatory, must match allowed list)
    category = data.get("category")
    if not category or not isinstance(category, str):
        return False, "Feedback category is required.", {}
    category = category.strip()
    if category not in VALID_CATEGORIES:
        return False, f"Invalid category. Must be one of: {', '.join(VALID_CATEGORIES)}.", {}

    # 4. Rating validation (mandatory, integer between 1 and 5)
    rating_raw = data.get("rating")
    if rating_raw is None:
        return False, "Rating is required (1 to 5 stars).", {}
    try:
        # Disallow floats disguised as ints if strict
        rating = int(rating_raw)
    except (ValueError, TypeError):
        return False, "Rating must be an integer between 1 and 5.", {}

    if rating < 1 or rating > 5:
        return False, "Rating must be between 1 and 5.", {}

    # 5. Message validation (mandatory, min 10 chars, max 1000 chars)
    message_raw = data.get("message")
    if not message_raw or not isinstance(message_raw, str):
        return False, "Feedback message is required.", {}
    message = message_raw.strip()
    if len(message) < 10:
        return False, "Message is too short. Please provide at least 10 characters of feedback.", {}
    if len(message) > 1000:
        return False, "Message is too long. Please keep it under 1000 characters.", {}

    sanitized = {
        "name": name if name else "Anonymous",
        "category": category,
        "rating": rating,
        "message": message,
    }
    return True, "", sanitized


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to test server connectivity."""
    return (
        jsonify(
            {
                "status": "healthy",
                "service": "raj-portfolio-backend",
                "storage": "sqlite",
            }
        ),
        200,
    )


@app.route("/api/feedback", methods=["POST", "OPTIONS"])
def handle_feedback():
    """Handle feedback submissions with validation, rate limiting, and persistence."""
    if request.method == "OPTIONS":
        return "", 204

    # Determine client IP for rate limiting
    client_ip = (
        request.headers.get("X-Forwarded-For", request.remote_addr or "127.0.0.1")
        .split(",")[0]
        .strip()
    )

    if not check_rate_limit(client_ip):
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Submission rate limit reached. Please wait a few minutes before submitting again.",
                }
            ),
            429,
        )

    # Parse JSON body
    if not request.is_json:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Content-Type must be application/json.",
                }
            ),
            400,
        )

    try:
        data = request.get_json(silent=True)
        if data is None:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Malformed or empty JSON body.",
                    }
                ),
                400,
            )
    except Exception:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "Could not parse JSON body.",
                }
            ),
            400,
        )

    # Server-side validation
    is_valid, error_msg, sanitized = validate_feedback_payload(data)
    if not is_valid:
        return (
            jsonify(
                {
                    "status": "error",
                    "message": error_msg,
                }
            ),
            400,
        )

    # Safe parameterized insert into SQLite
    try:
        feedback_id = insert_feedback(
            name=sanitized["name"],
            category=sanitized["category"],
            rating=sanitized["rating"],
            message=sanitized["message"],
        )
        return (
            jsonify(
                {
                    "status": "success",
                    "message": "Feedback received. Thank you.",
                    "id": feedback_id,
                }
            ),
            201,
        )
    except Exception as exc:
        # Don't leak raw database tracebacks to visitors
        app.logger.error(f"Database error during feedback insertion: {exc}")
        return (
            jsonify(
                {
                    "status": "error",
                    "message": "An error occurred while saving your feedback. Please try again later.",
                }
            ),
            500,
        )


@app.errorhandler(413)
def request_entity_too_large(error):
    return (
        jsonify(
            {
                "status": "error",
                "message": "Request payload too large (maximum 32 KB).",
            }
        ),
        413,
    )


@app.errorhandler(404)
def not_found(error):
    return (
        jsonify(
            {
                "status": "error",
                "message": "Endpoint not found.",
            }
        ),
        404,
    )


@app.errorhandler(405)
def method_not_allowed(error):
    return (
        jsonify(
            {
                "status": "error",
                "message": "HTTP method not allowed.",
            }
        ),
        405,
    )


# Automatically initialize SQLite table on app startup
init_db()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"Starting Raj Portfolio Backend on http://{host}:{port} ...")
    app.run(host=host, port=port, debug=False)
