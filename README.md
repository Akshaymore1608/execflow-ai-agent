# ExecFlow — Autonomous Meeting-to-Execution Agent ⚡

> **Transform messy meeting transcripts into binding decisions, assigned tasks, and live enterprise tool integrations — powered by cross-meeting persistent memory and autonomous conflict detection.**

ExecFlow goes beyond simple transcript summarizers: it acts as an **autonomous organizational brain** that remembers historical commitments across past meetings, detects contradictory policies, schedules multi-channel deadline reminders, compiles individualized weekly digests, and enforces a mandatory human-in-the-loop confirmation gate before anything gets dispatched to production trackers.

---

## 🎨 Design System: Executive Obsidian & Gold
- **Base Background:** Deep Jet Black (`#070709`)
- **Primary Accents:** Rich Luxury Gold & Golden Amber (`#f59e0b`, `#fbbf24`, gold borders, glowing badges)
- **Alert & Conflict Accents:** Crimson Red (`#ef4444`, `#dc2626`) for P0 Urgent tasks, unassigned blockers & policy contradictions
- **Warning & Pending Accents:** Warm Canary Yellow (`#eab308`, `#fde047`)
- **Typography:** Crisp Pure White (`#ffffff`, `#f8fafc`) with **Plus Jakarta Sans** and **JetBrains Mono** for technical code and hashes
- **Spacious Layout:** Clean, breathable 3-column architecture with zero clumsiness, clear section separation, and smooth micro-interactions

---

## 🧠 Core System Capabilities

### 1. Transcript Ingestion with Speaker Attribution
- Ingests raw multi-party audio transcripts with line-by-line speaker attribution.
- **Sample 1:** *Product Launch Sync (Q4 Checkout Redesign)* — Sarah (Product Lead), Dave (Payment Infra), Priya (Frontend Eng), Marcus (Compliance), Elena (UX Research).
- **Sample 2:** *Engineering Incident Post-Mortem (INC-4921)* — Alex (Incident Commander), Chen (Database Arch), Sam (Platform Eng), Maya (Chaos Eng).

### 2. Extraction of Decisions, Action Items, Owners & Deadlines
- Extracts actionable tasks paired with **exact verbatim context quotes** from the transcript.
- **Ambiguity Detection:** Flags ambiguous or unowned tasks with a glowing amber alert (`⚠️ Unassigned — Needs Owner`).
- Priority ratings (`P0 Urgent`, `P1 High`, `P2 Normal`) and strict deadlines.

### 3. Cross-Meeting Memory & Conflict Detection 🚨 *(The Differentiator)*
- Houses a persistent **Cross-Meeting Memory Vault** indexing historical binding decisions from past syncs.
- **Autonomous Conflict Detection:** Compares new meeting agreements against past policies and flags contradictions:
  - *Conflict Example 1:* Current sync approves automated Adyen fallback routing ⚡ Contradicts Oct 12 Security Charter requiring a 14-day VP SecOps audit.
  - *Conflict Example 2:* Current post-mortem sets PgBouncer DNS TTL to 5 seconds ⚡ Contradicts Sep 28 Reliability Charter (minimum 60s rule).
- Interactive resolution modal: Override past policy or enforce SecOps gate.

### 4. Task Creation in Trackers (Jira / Linear)
- Dispatches structured tickets directly to a simulated Jira Cloud board (`CHK-104`, assignees, priorities, issue types, and statuses).

### 5. Automated Reminders Before Deadlines
- Multi-tier automated escalation timeline (`T-48h`, `T-24h`, `T-2h`) routed across Slack DMs, email, and PagerDuty alerts.

### 6. Personalized Weekly Digest Per Person
- Individualized executive digests tailored for each team member (`@Dave`, `@Priya`, `@Elena`, `@Sarah`, `@Chen`, `@Sam`, `@Maya`, `@Alex`).
- Highlights their specific commitments, deadlines, and personalized conflict warnings, with a one-click "Dispatch Weekly DM" action.

### 7. Mandatory Confirmation Step Before Posting (Confirmation Gate)
- Dedicated safety review gate before any output is broadcast to live external tools.
- Verification checklist for resolved conflicts, assigned owners, and multi-system dispatch approval.

---

## 🚀 Quickstart

### 1. Run the Development Server
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 with custom golden glow and red alert animations
- **Icons:** Lucide React
- **AI Engine:** Dual Engine (Zero-Config Instant Demo Simulation + Live Google Gemini 2.5 Flash)
