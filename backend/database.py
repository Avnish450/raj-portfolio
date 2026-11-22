"""
Database management for Raj's Portfolio Feedback System.
Handles SQLite connection, schema creation, and safe parameterized queries.
"""

import os
import sqlite3
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional

DEFAULT_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "feedback.db")
DB_PATH = os.environ.get("DATABASE_PATH", DEFAULT_DB_PATH)


def get_db_connection() -> sqlite3.Connection:
    """Create and return a configured SQLite connection."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    """Initialize database tables with the required schema."""
    conn = get_db_connection()
    try:
        with conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS feedback (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    category TEXT NOT NULL,
                    rating INTEGER NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            )
            # Create index for created_at for fast ordering
            conn.execute(
                """
                CREATE INDEX IF NOT EXISTS idx_feedback_created_at
                ON feedback (created_at DESC);
                """
            )
    finally:
        conn.close()


def insert_feedback(name: Optional[str], category: str, rating: int, message: str) -> int:
    """
    Safely insert a new feedback entry using parameterized SQL.
    Returns the auto-generated primary key ID.
    """
    conn = get_db_connection()
    try:
        with conn:
            cursor = conn.execute(
                """
                INSERT INTO feedback (name, category, rating, message, created_at)
                VALUES (?, ?, ?, ?, ?);
                """,
                (
                    name.strip() if name and name.strip() else "Anonymous",
                    category.strip(),
                    int(rating),
                    message.strip(),
                    datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"),
                ),
            )
            return cursor.lastrowid
    finally:
        conn.close()


def get_all_feedback(limit: int = 100) -> List[Dict[str, Any]]:
    """
    Retrieve feedback entries for developer local inspection.
    Never exposed through public API endpoints.
    """
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            SELECT id, name, category, rating, message, created_at
            FROM feedback
            ORDER BY id DESC
            LIMIT ?;
            """,
            (limit,),
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()


def count_feedback() -> int:
    """Return total number of feedback records stored."""
    conn = get_db_connection()
    try:
        cursor = conn.execute("SELECT COUNT(*) FROM feedback;")
        return cursor.fetchone()[0]
    finally:
        conn.close()
