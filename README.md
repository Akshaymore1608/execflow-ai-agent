# ExecFlow — Autonomous Meeting-to-Execution Agent ⚡

> **Transform messy meeting transcripts into binding decisions, assigned tasks, and live enterprise tool integrations.**

ExecFlow is a high-velocity, human-in-the-loop autonomous agent built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons** in a sleek dark-mode SaaS UI (`slate-950` background with `indigo`, `emerald`, and `amber` accents).

---

## 🌟 Key Features

### 1. Dual Engine Mode (Zero-Config + Live AI)
- **Instant Demo Mode (Default):** Works out of the box with zero setup. Demonstrates realistic, full-fidelity AI extraction, risk detection, and integration dispatch.
- **Live Gemini AI Mode:** Powered by Google's `gemini-2.5-flash` model. Can use either an environment variable (`VITE_GEMINI_API_KEY`) or an in-app modal that stores the key locally in your browser.

### 2. 3-Column Autonomous Architecture
1. **Left Column (Transcript Ingestion):**
   - **Sample 1: Product Launch Sync (Q4 Checkout Redesign):** Messy conversation with implicit tasks, unassigned blockers (Apple Pay PCI DSS v4 compliance), conflicting deadlines, and an executive Go/No-Go follow-up sync.
   - **Sample 2: Engineering Incident Post-Mortem (API Latency & 504 Timeouts):** Technical post-mortem covering Aurora replica failover, PgBouncer DNS TTL configuration, driver exponential backoff with jitter, and an unassigned Enterprise SLA credit impact report.
   - **Animated 4-Stage Agent Pipeline:** Visual pipeline showing *Extracting Decisions → Resolving Owners → Detecting Blockers → Drafting Executions*.

2. **Middle Column (Action Items & Approval Queue — Human-in-the-Loop):**
   - **Exact Context Quotes:** Every action item displays the verbatim quote from the transcript it was derived from.
   - **Ambiguity Detection & Glowing Alert:** Flags unowned or ambiguous tasks with a glowing amber alert badge (`⚠️ Unassigned — Needs Owner`).
   - **Inline Reassignment:** Quick dropdown to assign tasks to team members.
   - **Priority & Due Date:** `P0 Urgent`, `P1 High`, and `P2 Normal` badges with extracted deadlines.
   - **Tool Badges:** Jira Ticket, Slack Update, Calendar Invite, and Notion Spec.
   - **Approval Controls:** Individual toggles and a 1-click **"Approve & Execute All"** button.

3. **Right Column (Live Execution Integrations Simulator):**
   - **Jira Cloud Board:** Real-time created tickets (`CHK-104`, priority, assignee, status).
   - **Slack Digest:** Formatted channel message (`#product-launch-q4`) with bot avatar, markdown formatting, owner tags, and urgent blocker callouts.
   - **Calendar Follow-Up:** Auto-scheduled Google Calendar block with timing, Google Meet room link, attendees, and bulleted agenda.
   - **Binding Decisions & Risks Log:** Comprehensive log of architectural decisions made vs unresolved blockers.
   - **Live Webhook Stream:** Real-time event log with confirmation hashes and dispatch latencies.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 💻 Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **AI Engine:** Google Gemini 2.5 Flash (`@google/genai` compatible REST API)
- **Theme:** Slate-950 Dark SaaS with glassmorphism and pulsing status indicators
