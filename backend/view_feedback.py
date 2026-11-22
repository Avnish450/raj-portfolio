#!/usr/bin/env python3
"""
CLI tool for local inspection of stored feedback.
Allows Raj (or their professor) to securely view saved SQLite feedback in the terminal.
Usage:
    python view_feedback.py
    python view_feedback.py --limit 20
"""

import argparse
import sys
from database import get_all_feedback, count_feedback, DB_PATH


def format_stars(rating: int) -> str:
    """Format rating number as stars representation."""
    return "★" * rating + "☆" * (5 - rating)


def display_feedback(limit: int = 50):
    total = count_feedback()
    print("\n" + "=" * 70)
    print("  RAJ'S PORTFOLIO — STORED FEEDBACK VIEWER (SQLITE)")
    print(f"  Database path: {DB_PATH}")
    print(f"  Total submissions recorded: {total}")
    print("=" * 70 + "\n")

    if total == 0:
        print("  [No feedback records found yet.]")
        print("  Submit one from the portfolio feedback form or test script!\n")
        return

    records = get_all_feedback(limit=limit)
    print(f"Showing the latest {len(records)} entries (ordered newest first):\n")

    for i, row in enumerate(records, start=1):
        created_at = row.get("created_at", "Unknown")
        name = row.get("name") or "Anonymous"
        category = row.get("category", "General")
        rating = row.get("rating", 0)
        message = row.get("message", "")
        record_id = row.get("id")

        print(f"  ┌─ Record #{record_id} ─────────────────────────────")
        print(f"  │ Time:     {created_at} UTC")
        print(f"  │ From:     {name}")
        print(f"  │ Category: {category}")
        print(f"  │ Rating:   {format_stars(rating)} ({rating}/5)")
        print(f"  │ Message:")
        for line in message.splitlines():
            print(f"  │   {line}")
        print("  └────────────────────────────────────────────────\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Inspect Raj's portfolio feedback records.")
    parser.add_argument("--limit", type=int, default=50, help="Maximum number of records to show.")
    args = parser.parse_args()
    display_feedback(limit=args.limit)
