# ClearConsent

A tablet-based web application that helps surgeons and patients navigate medical consent forms together. It transforms dense medical language into plain, readable text and verifies patient understanding before signing.

---

## The Problem

Medical consent forms are written in complex legal and medical jargon. Patients often sign documents they don't fully understand, creating ethical concerns and legal liability for hospitals.

---

## What It Does

- Translates medical consent forms into plain, easy-to-understand language
- Highlights complex medical terms with tap-to-expand definitions
- Verifies patient comprehension through a short quiz before signing
- Optionally reads the simplified form aloud for accessibility

---

## Team

| Role | Responsibility |
|---|---|
| Frontend | React UI, document viewer, modals, quiz, signature flow |
| AI Integration | LLM API connection, text simplification, prompt engineering |
| Backend | REST API, PDF parsing, data storage |
| Data & QA | Storage schema, quiz logic, audit log, demo & testing |

---

## Tech Stack

> Note: Specific APIs and services may change during development.

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| AI / LLM | TBD |
| PDF Parsing | TBD |
| Database / Storage | TBD |
| Text-to-Speech | TBD |
| Hosting | Local |

---

## Project Structure
clearconsent/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
---

## Getting Started

### Prerequisites
- Node.js (LTS)
- Git

### Frontend
```bash
cd frontend
npm install
npm run dev
Runs at localhost:5173
Backend
cd backend
npm install
node index.js
Runs at localhost:3000
Environment Variables
Create a .env file inside /backend:
# Add API keys here — never commit this file
Git Workflow
# Create your branch
git checkout -b feature/your-feature-name

# Save your work
git add .
git commit -m "describe what you built"
git push origin feature/your-feature-name

# Get latest changes from teammates
git pull origin main
Notes
No authentication in MVP
Hosted locally for the hackathon — no deployment needed
.env is gitignored — never push API keys
Tech stack details will be updated as decisions are finalized
---
