# Raj's Personal Portfolio & Feedback System
> An editorial, responsive personal portfolio for **Raj, a Computer Science & AIML student**, featuring an integrated Python Flask & SQLite backend feedback engine.

---

## 1. Project Overview

This project was built to balance two goals:
1. **Human-designed aesthetic:** A dark, editorial visual identity inspired by high-end independent design studios and technical documentation. It strictly avoids generic AI tropes (no purple/blue gradients, floating blobs, glassmorphic cards, fake statistics, or exaggerated proficiency progress bars).
2. **Real Python Backend Integration:** A genuine, fully functional full-stack feature. Rather than simulating feedback in JavaScript, the website sends visitor thoughts, categories, ratings, and messages to a Python Flask API that validates the payload, applies security protections (honeypot + sliding-window rate limiting), and commits records to a local SQLite database.

---

## 2. Key Features

- **Personal Brand & Navigation:**
  - Distinctive `RAJ.` wordmark with a subtle blinking cursor.
  - Sticky minimalist navigation with active section detection and smooth scrolling.
  - Accessible mobile drawer navigation with ESC key listener and screen-reader semantics.

- **Hero Section:**
  - Clear academic eyebrow: `COMPUTER SCIENCE · AI & MACHINE LEARNING`.
  - Headline: *"Building ideas into intelligent experiences."*
  - Minimalist abstract neural network & latent vector diagram rendered directly with SVG and CSS geometry.
  - Quick jump links to explore projects and leave feedback.

- **01 — About:**
  - Honest, authentic student narrative focusing on learning by building.
  - Compact two-column profile metadata (Degree, Specialization, Role, Location).
  - Absolutely zero fake claims, imaginary internships, or fabricated achievements.

- **02 — Selected Work:**
  - Three distinct layout presentations (Asymmetric Split, Technical Spec Grid, Terminal Runtime Log).
  - Clear status tags: `EDIT PROJECT DETAILS`.
  - Configurable GitHub and live demo buttons that automatically hide when URLs are left empty in configuration.

- **03 — Toolkit:**
  - Categorized skill structure: **Programming**, **Web**, and **Tools**.
  - Simple, honest badges without arbitrary percentage bars or fake proficiency levels.
  - Managed via an editable configuration file (`src/config/portfolio.js`).

- **04 — Functional Feedback System (Flask + SQLite):**
  - Name (optional, defaults to "Anonymous").
  - Category selector: *Design & UI*, *Projects*, *Content*, *Suggestions*, *Other*.
  - Accessible 5-star interactive rating component with hover states and full keyboard navigation (Arrow keys, 1–5 numbers, Space/Enter).
  - Multiline message with real-time character counter (10 to 1000 characters).
  - Honeypot spam trap that rejects automated bot submissions.
  - Server-side rate limiter (max 5 submissions per 10 minutes per client IP).
  - Terminal-friendly inspection script (`view_feedback.py`) for the student or professor to view stored feedback.

---

## 3. Technology Stack

### Frontend
- **Framework:** React 18
- **Bundler & Dev Server:** Vite 6
- **Styling:** Tailwind CSS + Custom CSS Variables & Typography
- **Icons:** Lucide React
- **Fonts:** Plus Jakarta Sans & JetBrains Mono

### Backend
- **Language:** Python 3.10+
- **Framework:** Flask 3
- **Database:** SQLite 3 (built into Python standard library, zero external database setup required)
- **CORS:** Built-in CORS handler + `flask-cors` support
- **Testing:** Python `unittest` integration test suite

---

## 4. Folder Structure

```text
raj-portfolio/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky header & mobile drawer
│   │   │   ├── HeroDiagram.jsx     # Technical SVG neural pipeline diagram
│   │   │   ├── ProjectCard.jsx     # 3 distinct editorial project card layouts
│   │   │   ├── StarRating.jsx      # Accessible 1-5 star rating component
│   │   │   ├── FeedbackForm.jsx    # Full-featured form with validation & fetch
│   │   │   └── Footer.jsx          # Attribution, back to top, and dynamic year
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx     # Section 0: Hero & status indicator
│   │   │   ├── AboutSection.jsx    # Section 1: About & metadata list
│   │   │   ├── ProjectsSection.jsx # Section 2: Selected work
│   │   │   ├── ToolkitSection.jsx  # Section 3: Technologies & tools
│   │   │   └── FeedbackSection.jsx # Section 4: Feedback form & architecture spec
│   │   ├── config/
│   │   │   └── portfolio.js        # Centralized editable configuration
│   │   ├── styles/
│   │   │   └── index.css           # Editorial dark theme design system
│   │   ├── App.jsx                 # App root assembly
│   │   └── main.jsx                # React entry point
│   ├── index.html                  # HTML5 shell & fonts
│   ├── vite.config.js              # Vite config with API proxy
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── app.py                      # Flask REST API with rate limiting & validation
│   ├── database.py                 # SQLite connection & parameterized queries
│   ├── view_feedback.py            # CLI script to inspect saved feedback in terminal
│   ├── test_feedback.py            # Automated test suite (10 integration tests)
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Backend environment configuration
│   └── feedback.db                 # SQLite database file (created automatically)
│
├── README.md                       # Comprehensive guide & professor explanation
└── .gitignore                      # Git exclusion rules
```

---

## 5. Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)

### 1. Clone or Open the Repository
```bash
cd raj-portfolio
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

---

## 6. Running the Application Locally

You will run the backend in one terminal and the frontend in a second terminal.

### Terminal 1: Start the Python Flask Backend
```bash
cd backend
python3 app.py
```
*The backend starts at `http://localhost:5001`. It automatically initializes `feedback.db` if it does not exist.*

### Terminal 2: Start the React Frontend
```bash
cd frontend
npm run dev
```
*Vite starts the frontend at `http://localhost:5173`. Open this URL in your web browser.*

Vite is configured with a built-in reverse proxy in `vite.config.js` that automatically forwards requests from `/api/*` to `http://127.0.0.1:5001`.

---

## 7. How the Feedback Feature Works
*(Beginner-Friendly Explanation for Your Professor or Viva)*

When a visitor submits feedback on the website, here is what happens step by step:

```
[Browser / User]
       │
       ▼ (1) Validates input: Rating 1-5, message 10-1000 characters, honeypot empty
[React Frontend]
       │
       ▼ (2) HTTP POST /api/feedback (JSON body)
[Flask API (app.py)]
       │
       ├─ (3) Rate Limiter: Checks if this IP exceeded 5 submissions in 10 minutes.
       ├─ (4) Honeypot Guard: Checks if hidden bot trap field has data.
       ├─ (5) Strict Validation: Trims strings, verifies category, confirms rating integer.
       │
       ▼ (6) Parameterized SQL Query (database.py)
[SQLite Database (feedback.db)]
       │
       ▼ (7) Returns HTTP 201 Created with feedback ID
[Browser Confirmation State]
```

### Why this design is secure and professional:
1. **Parameterized Queries (`?` placeholders):** User inputs are passed as parameters to SQLite rather than string concatenation. This prevents SQL injection attacks.
2. **Zero Plaintext Sensitive Leakage:** If something fails on the database, Flask logs the internal error on the server but returns a clean, sanitized error message to the browser.
3. **No Public Inspection Endpoint:** Feedback entries are private. They cannot be retrieved by arbitrary internet visitors. Only the developer with local or administrative access can view them.
4. **Honeypot Protection:** Bots crawling forms fill out all input fields indiscriminately. An invisible field (`website`) is positioned off-screen. Real humans never see it, but bots fill it, triggering immediate rejection.
5. **Rate Limiting:** A sliding window in memory limits every client IP address to at most 5 submissions per 10 minutes, protecting against spam floods.

---

## 8. Database Schema

The SQLite database file `backend/feedback.db` contains the table:

```sql
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT NOT NULL,
    rating INTEGER NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at
ON feedback (created_at DESC);
```

### Field Breakdown:
- `id`: Auto-incrementing integer identifier for each feedback submission.
- `name`: Name of the sender (defaults to `'Anonymous'` if omitted). Maximum 80 characters.
- `category`: Category string (*Design & UI*, *Projects*, *Content*, *Suggestions*, *Other*).
- `rating`: Integer from 1 to 5 representing star rating.
- `message`: Text content between 10 and 1000 characters.
- `created_at`: UTC timestamp of when the record was saved.

---

## 9. Inspecting Saved Feedback in the Terminal

To inspect saved submissions without needing database client software (e.g., DBeaver or SQLiteStudio), run the included CLI viewer tool:

```bash
cd backend
python3 view_feedback.py
```

### Sample Terminal Output:
```text
======================================================================
  RAJ'S PORTFOLIO — STORED FEEDBACK VIEWER (SQLITE)
  Database path: /path/to/raj-portfolio/backend/feedback.db
  Total submissions recorded: 3
======================================================================

Showing the latest 3 entries (ordered newest first):

  ┌─ Record #3 ─────────────────────────────
  │ Time:     2026-11-22 07:30:15 UTC
  │ From:     Sarah Connor
  │ Category: Design & UI
  │ Rating:   ★★★★★ (5/5)
  │ Message:
  │   The typography and dark aesthetic are exceptionally well crafted. Clean work!
  └────────────────────────────────────────────────
```

---

## 10. Automated Testing

The backend includes a comprehensive automated test suite (`backend/test_feedback.py`) with 10 unit and integration tests covering:
- Health check connectivity (`GET /api/health`).
- Valid submissions with auto-assigned primary keys.
- Anonymous submissions defaulting safely.
- Honeypot bot rejection.
- Name length boundary rejection (>80 characters).
- Invalid category rejection.
- Rating bounds rejection (<1, >5, or non-integer).
- Message minimum length (<10 characters).
- Message maximum length (>1000 characters).
- IP rate limiting.

### Run the tests:
```bash
cd backend
python3 test_feedback.py
```
Output:
```text
..........
----------------------------------------------------------------------
Ran 10 tests in 0.015s

OK
```

---

## 11. Deployment Guide

### A. Frontend Deployment (Vercel)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Configure the build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. In Vercel Project Settings > **Environment Variables**, add:
   ```text
   VITE_API_BASE_URL = https://your-backend-app.onrender.com
   ```
5. Deploy.

### B. Backend Deployment (Render)
1. Sign in to [Render](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python app.py` (or `gunicorn app:app -b 0.0.0.0:$PORT`)
4. In Environment Variables:
   ```text
   PORT = 10000
   CORS_ALLOWED_ORIGINS = https://your-vercel-app.vercel.app,http://localhost:5173
   DATABASE_PATH = /data/feedback.db  # (attach a Render Persistent Disk for production durability)
   ```
5. Note on SQLite in production: Free tier web services often reset ephemeral disks on restart. For permanent SQLite persistence on Render, attach a Persistent Disk at `/data` or use PostgreSQL by swapping `sqlite3` queries with `psycopg2` / SQLAlchemy.

---

## 12. Customizing Raj's Information

To update project descriptions, skills, social links, or personal details, simply edit:
```
frontend/src/config/portfolio.js
```
All sections update immediately thanks to Vite Hot Module Replacement (HMR).
