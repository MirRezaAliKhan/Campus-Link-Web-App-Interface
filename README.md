
  # Campus-Link Web App Interface 🚀

  **Campus-Link** is a polished, role-based web interface prototype (Student / Recruiter / Faculty) built with React, TypeScript and Tailwind CSS. It showcases dashboards, analytics, a leaderboard, profile pages, job application flows and an AI-powered chatbot assistant — all composed with shadcn/ui and Radix primitives.

  This repository is a frontend design & interaction bundle derived from a Figma design: https://www.figma.com/design/Bjmc6tanDJFAvDzmxAn1Uj/Campus-Link-Web-App-Interface

  ---

  ## Key highlights ✅
  - Role-based views: Student, Recruiter, Faculty
  - Interactive dashboards and analytics with Recharts
  - Universal Student Score (USS) concept and leaderboard
  - AI Chatbot widget (uses a generative language API; example key placeholder included)
  - Built using Vite, React (TSX), Tailwind CSS, Radix UI and shadcn/ui components

  ---

  ## Badges (Suggested) 🏷️
  - Add CI / build status badge (e.g. GitHub Actions) and a license badge once you add a `LICENSE` file.
  - Example (GitHub Actions):

  ```md
  ![Build Status](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)
  ```

  For now, no CI or license badges are configured in this repository.

  ## Table of Contents
  - [Demo / Screenshots](#demo--screenshots)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Environment & Secrets](#environment--secrets)
  - [Development](#development)
  - [Notes & Limitations](#notes--limitations)
  - [Attributions](#attributions)
  - [Contributing](#contributing)
  - [License](#license)

  ---

  ## Demo / Screenshots
  Run the app locally (see below) and switch roles from the login screen to explore Student, Recruiter and Faculty experiences. The UI contains analytics charts, profile pages, and a conversational AI assistant.

  > Note: This repo is primarily a UI-focused prototype — some features (AI, backend integration, persistent auth) are represented with mock data or stubs.

  ---

  ## Technologies 🔧
  - React 18 (TypeScript)
  - Vite
  - Tailwind CSS
  - shadcn/ui + Radix primitives
  - Recharts (analytics)
  - Lucide icons
  - Sonner (toasts)

  ---

  ## Features ✨
  - Multi-role dashboards (Student / Recruiter / Faculty)
  - Analytics: placement trends, department USS, skill-gap analysis
  - Leaderboard & student profiles
  - Job application dialog & recruiter pages
  - Chatbot widget with personalized prompts (AI integration example)
  - Reusable design system components under `src/components/ui`

  ---

  ## Getting Started (Local) 🧭
  Requirements:
  - Node.js 18+ (recommended)
  - npm (or yarn/pnpm)

  Install & run:

  ```powershell
  # from repo root
  npm install
  npm run dev
  ```

  Open http://localhost:5173 (or the port shown by Vite) to view the app.

  Build for production:

  ```powershell
  npm run build
  ```

  ---

  ## Environment & Secrets 🔒
  - The Chatbot uses a generative language API call inside `src/components/ChatbotWidget.tsx`. For the prototype a placeholder key is shown in the file — **do not commit real keys**.
  - To use your own key safely, replace the hard-coded key with an environment variable and read it at runtime. Example (recommended):

  1) Create a `.env` file in the project root:

  ```env
  VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
  ```

  2) Update the code (example):

  ```ts
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  ```

  3) Restart the dev server.

  **Security note:** Never commit API keys or credentials. Use environment variables and secrets management for production.

  ---

  ## Development Notes & Where to Look 🔍
  - Entry: `src/main.tsx` → `src/App.tsx`
  - Pages/components: `src/components/*` (Dashboard, ProfilePage, LeaderboardPage, RecruiterPage, AnalyticsPage, ChatbotWidget)
  - UI primitives & shared components: `src/components/ui/*`
  - Styling: Tailwind configuration and global styles in `src/index.css` & `src/styles`.
  - Figma/Assets: design references & attributions in `src/Attributions.md`.

  If you add backend integration, you can replace mock data and the local role state in `App.tsx` with real auth and API calls.

  ---

  ## Notes & Limitations ⚠️
  - Authentication is mock/local only — no real user persistence
  - Chatbot uses a remote API (example call shown) and requires a valid API key and proper handling of secrets
  - No tests are included by default — consider adding unit / integration tests for any production changes
  - No license file exists in this repo; add one if you intend to publish under a specific license

  ---

  ## Attributions 🙏
  - UI components and design tokens are based on shadcn/ui (MIT)
  - Images may include Unsplash assets (see `src/Attributions.md` for details)
  - Figma design source: https://www.figma.com/design/Bjmc6tanDJFAvDzmxAn1Uj/Campus-Link-Web-App-Interface

  ---

  ## Contributing 🤝
  Thanks for your interest! A simple workflow:
  1. Fork the repo and create a feature branch
  2. Install dependencies and run locally
  3. Add tests and update docs where applicable
  4. Open a pull request describing your changes

  If you plan to add backend or production-level features, please open an issue first so we can coordinate.

  ---

  ## License
  No license is specified in this repository. If you'd like to add one, add a `LICENSE` file (for example, MIT) and update this section.

  ---

  If you'd like, I can open a PR with this README and also update `src/components/ChatbotWidget.tsx` to read the API key from an environment variable (and remove the hard-coded key). Would you like me to do that? ✅

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  