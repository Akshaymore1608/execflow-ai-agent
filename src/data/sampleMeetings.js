export const SAMPLE_PRESETS = [
  {
    id: 'product-launch-sync',
    name: 'Product Launch Sync (Q4 Checkout Redesign)',
    tag: 'Messy Cross-Functional Sync',
    badgeColor: 'indigo',
    participants: ['Sarah (Product Lead)', 'Priya (Frontend Eng)', 'Dave (Payment Infra)', 'Marcus (Compliance)', 'Elena (UX Research)'],
    duration: '45 mins',
    date: 'Today, 10:00 AM',
    transcript: `[00:01] Sarah: Alright everyone, thanks for jumping in. We have exactly 8 business days before the Q4 Checkout Redesign rolls out to 100% of US traffic. I went over the staging metrics this morning and there are still red flags.
[00:15] Dave: Yeah, about that... during our 500 RPS load test yesterday on Stripe Connect, the payment webhook processing spiked to 2.8 seconds and about 4.2% of sessions threw a 504 Gateway Timeout. 
[00:29] Priya: Wait, is that blocking frontend? Because our one-click Apple Pay component is completely done and tested, but if the backend confirmation webhook hangs, users will see the loading spinner forever and double-click the buy button.
[00:43] Sarah: That is a total non-starter. Dave, can we fix the webhook latency?
[00:49] Dave: I need to rewrite the idempotency check in Redis and decouple the order confirmation email from the synchronous HTTP request cycle. I can take that on, but I'll need until Thursday 6 PM.
[01:05] Marcus: Hold on, speaking of Apple Pay—did anyone check the updated California PCI DSS v4 compliance requirement for biometric stored credentials? If we don't have that documented and signed off before Tuesday, Legal is going to veto the release.
[01:19] Priya: Isn't Marcus or someone from Legal supposed to draft that?
[01:23] Marcus: Legal needs the technical payload spec from engineering first. Someone really needs to prepare that Apple Pay compliance payload spec and submit it to Legal before Tuesday 2 PM, or we're stuck.
[01:38] Sarah: Okay, who owns that? Let's make sure someone steps up or we will miss the compliance window. Flagging that as urgent and currently unassigned.
[01:49] Elena: Also, from yesterday's user testing session on mobile: 6 out of 10 users struggled with the tip selection toggle—it's too small on iPhone Mini screens. Elena can redesign the stepper component and provide Figma tokens by tomorrow noon.
[02:08] Priya: Perfect, once Elena hands over the Figma tokens, I'll update the mobile checkout stylesheet and bump the touch target to 48px by Wednesday 3 PM.
[02:22] Dave: What about the fallback payment provider? If Stripe has a degraded outage during Black Friday, do we failover to Adyen?
[02:32] Sarah: Decision: Yes, we are approving Adyen as the automated secondary payment gateway fallback. But we need a Notion spec covering failover retry intervals.
[02:46] Marcus: Also, remember Sarah's calendar—we need a mandatory Go/No-Go readiness check sync with VP of Engineering this Friday at 4 PM to sign off on the 100% canary rollout.
[02:59] Sarah: Agreed. Let's schedule that 30-minute sync for Friday 4:00 PM with Dave, Priya, Marcus, and myself. Let's get these action items into Jira and keep Slack updated so leadership isn't pinging us all afternoon.`,
    extractedData: {
      actionItems: [
        {
          id: 'act-1',
          title: 'Decouple webhook idempotency in Redis & move receipt emails to background queue',
          contextQuote: "Dave: I need to rewrite the idempotency check in Redis and decouple the order confirmation email from the synchronous HTTP request cycle.",
          owner: 'Dave (Payment Infra)',
          isUnassigned: false,
          priority: 'P0 Urgent',
          dueDate: 'Thursday, 6:00 PM',
          targetTool: 'Jira Ticket',
          toolKey: 'PROJ-104',
          toolDetails: 'Project: CHECKOUT | Component: Backend-Infra | Type: Bug Fix',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-104',
            summary: 'Decouple webhook idempotency in Redis & async order receipts',
            assignee: 'Dave (Payment Infra)',
            priority: 'Highest (P0)',
            issueType: 'Bug Fix',
            status: 'IN PROGRESS',
            description: 'Fix 504 Gateway Timeouts under 500 RPS load test on Stripe Connect. Refactor idempotency check into Redis cache and queue confirmation emails.'
          }
        },
        {
          id: 'act-2',
          title: 'Prepare Apple Pay biometric stored credential payload spec for PCI DSS v4 audit',
          contextQuote: "Someone really needs to prepare that Apple Pay compliance payload spec and submit it to Legal before Tuesday 2 PM, or we're stuck.",
          owner: 'Unassigned — Needs Owner',
          isUnassigned: true,
          priority: 'P0 Urgent',
          dueDate: 'Tuesday, 2:00 PM',
          targetTool: 'Notion Spec',
          toolKey: 'SPEC-772',
          toolDetails: 'Workspace: Legal & Compliance | Template: PCI-DSS Audit 2026',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-105',
            summary: 'Apple Pay biometric payload spec for Legal PCI DSS v4 signoff',
            assignee: 'Unassigned (Needs Triage)',
            priority: 'Highest (P0)',
            issueType: 'Task',
            status: 'BACKLOG',
            description: 'Technical payload document detailing tokenization and biometric credential storage for Marcus and Legal team.'
          }
        },
        {
          id: 'act-3',
          title: 'Redesign mobile tip selection toggle with 48px touch targets in Figma',
          contextQuote: "Elena: Elena can redesign the stepper component and provide Figma tokens by tomorrow noon.",
          owner: 'Elena (UX Research)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Tomorrow, 12:00 PM',
          targetTool: 'Jira Ticket',
          toolKey: 'CHK-106',
          toolDetails: 'Project: CHECKOUT | Component: Design-Tokens | Type: Story',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-106',
            summary: 'Redesign mobile tip stepper to comply with 48px minimum touch targets',
            assignee: 'Elena (UX Research)',
            priority: 'High (P1)',
            issueType: 'Design Story',
            status: 'READY FOR DEV',
            description: 'Deliver updated mobile stepper Figma tokens resolving the iPhone Mini usability issue discovered in user testing.'
          }
        },
        {
          id: 'act-4',
          title: 'Implement updated mobile checkout stylesheet with 48px touch targets',
          contextQuote: "Priya: Perfect, once Elena hands over the Figma tokens, I'll update the mobile checkout stylesheet and bump the touch target to 48px by Wednesday 3 PM.",
          owner: 'Priya (Frontend Eng)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Wednesday, 3:00 PM',
          targetTool: 'Jira Ticket',
          toolKey: 'CHK-107',
          toolDetails: 'Project: CHECKOUT | Component: Web-Frontend | Type: Task',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-107',
            summary: 'Update mobile checkout CSS tokens & bump touch targets to 48px',
            assignee: 'Priya (Frontend Eng)',
            priority: 'High (P1)',
            issueType: 'Task',
            status: 'READY FOR DEV',
            description: 'Consume Elena\'s Figma tokens for the tip selector stepper and apply CSS adjustments across iOS/Android mobile web.'
          }
        },
        {
          id: 'act-5',
          title: 'Draft Notion spec for Adyen secondary fallback payment routing',
          contextQuote: "Sarah: Decision: Yes, we are approving Adyen as the automated secondary payment gateway fallback. But we need a Notion spec covering failover retry intervals.",
          owner: 'Dave (Payment Infra)',
          isUnassigned: false,
          priority: 'P2 Normal',
          dueDate: 'Thursday, End of Day',
          targetTool: 'Notion Spec',
          toolKey: 'DOC-889',
          toolDetails: 'Space: Architecture / Payment Resiliency / Failover',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-108',
            summary: 'Document Adyen secondary gateway failover retry policies & SLA',
            assignee: 'Dave (Payment Infra)',
            priority: 'Medium (P2)',
            issueType: 'Doc',
            status: 'TO DO',
            description: 'Write Notion architecture specification detailing Stripe-to-Adyen circuit breaker thresholds, retry backoff, and idempotent retry envelopes.'
          }
        },
        {
          id: 'act-6',
          title: 'Schedule Go/No-Go Launch Readiness Sync with VP of Engineering',
          contextQuote: "Sarah: Agreed. Let's schedule that 30-minute sync for Friday 4:00 PM with Dave, Priya, Marcus, and myself.",
          owner: 'Sarah (Product Lead)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Friday, 4:00 PM',
          targetTool: 'Calendar Invite',
          toolKey: 'CAL-202',
          toolDetails: 'Calendar: Google Workspace | Room: virtual-meet/launch-war-room',
          status: 'pending',
          jiraTicket: {
            key: 'CHK-109',
            summary: 'Executive Go/No-Go Signoff Meeting with VP of Engineering',
            assignee: 'Sarah (Product Lead)',
            priority: 'High (P1)',
            issueType: 'Milestone',
            status: 'SCHEDULED',
            description: 'Coordinate final approval sync with executive leadership prior to rolling out Q4 checkout redesign to 100% US traffic.'
          }
        }
      ],
      decisions: [
        {
          id: 'dec-1',
          decision: 'Adyen approved as secondary automated payment gateway fallback',
          rationale: 'Mitigates Black Friday Stripe outage risk; circuit-breaker will trigger after three consecutive 504 responses.',
          binding: true
        },
        {
          id: 'dec-2',
          decision: 'Minimum mobile interactive touch targets standardized to 48px',
          rationale: 'User testing revealed high error rates on tip selection stepper for smaller mobile screens.',
          binding: true
        },
        {
          id: 'dec-3',
          decision: 'Full canary rollout capped until Redis webhook latency drops below 250ms',
          rationale: 'Load test proved 504 timeouts at 500 RPS without Redis idempotency decoupled from receipt emails.',
          binding: true
        }
      ],
      blockers: [
        {
          id: 'blk-1',
          blocker: 'Unassigned Owner for Apple Pay PCI DSS v4 compliance payload spec',
          severity: 'Critical (Blocker)',
          impact: 'Legal will veto the launch by Tuesday 2:00 PM if specification is not submitted.',
          suggestedOwner: 'Priya (Frontend Eng) or Dave (Payment Infra)'
        },
        {
          id: 'blk-2',
          blocker: 'Stripe webhook 504 timeouts at 500 RPS load threshold',
          severity: 'High',
          impact: 'Causes double-charging or infinite checkout spinners for mobile users.',
          suggestedOwner: 'Dave (Payment Infra)'
        }
      ],
      slackDigest: {
        channel: '#product-launch-q4',
        channelId: 'C06A98F7Z',
        author: 'ExecFlow Agent',
        timestamp: 'Just now',
        title: '📋 Executive Meeting Digest & Action Plan: Q4 Checkout Redesign Sync',
        summary: 'Synchronized alignment for rollout in 8 business days. 6 action items drafted, 1 critical unassigned blocker flagged for Legal compliance.',
        urgentBlockerAlert: '⚠️ ACTION REQUIRED: Apple Pay PCI DSS v4 spec has NO OWNER. Deadline is Tuesday 2:00 PM.',
        sections: [
          {
            title: '🚀 Key Decisions Approved',
            items: [
              '• Adyen approved as automated secondary gateway fallback for high-load periods.',
              '• 48px touch targets approved for all checkout interactive elements.',
              '• Final Go/No-Go sync locked for Friday 4:00 PM EST.'
            ]
          },
          {
            title: '🎯 Critical Commitments & Owners',
            items: [
              '• @Dave: Redis webhook decoupling & async receipts by Thursday 6:00 PM (CHK-104)',
              '• @Elena: Mobile tip stepper redesign Figma tokens by Tomorrow 12:00 PM (CHK-106)',
              '• @Priya: Mobile checkout stylesheet implementation by Wednesday 3:00 PM (CHK-107)',
              '• ⚠️ UNASSIGNED: Apple Pay PCI spec for Legal signoff due Tuesday 2:00 PM (CHK-105)'
            ]
          }
        ]
      },
      calendarFollowUp: {
        title: 'Q4 Checkout Redesign — Go/No-Go Launch Decision Sync',
        suggestedTime: 'Friday, 4:00 PM - 4:30 PM EST',
        duration: '30 mins',
        room: 'https://meet.google.com/exf-q4co-sync',
        attendees: [
          { name: 'Sarah (Product Lead)', email: 'sarah.chen@company.com', status: 'Organizer' },
          { name: 'Dave (Payment Infra)', email: 'dave.miller@company.com', status: 'Required' },
          { name: 'Priya (Frontend Eng)', email: 'priya.sharma@company.com', status: 'Required' },
          { name: 'Marcus (Compliance)', email: 'marcus.vance@company.com', status: 'Required' },
          { name: 'VP of Engineering', email: 'vpe@company.com', status: 'Required' }
        ],
        agenda: [
          '1. Verify Redis idempotency test results under 500 RPS (Dave)',
          '2. Signoff on Apple Pay PCI DSS v4 legal compliance audit (Marcus)',
          '3. Review mobile checkout staging build & 48px touch metrics (Priya)',
          '4. Executive Rollout Vote: 10% -> 50% -> 100% US traffic schedule'
        ]
      }
    }
  },
  {
    id: 'engineering-incident-post-mortem',
    name: 'Engineering Incident Post-Mortem (API Latency & 504 Timeouts)',
    tag: 'Sev-1 Infrastructure Post-Mortem',
    badgeColor: 'emerald',
    participants: ['Alex (Incident Commander / SRE)', 'Chen (Database Architect)', 'Sam (Core Platform Eng)', 'Maya (Chaos & QA)'],
    duration: '35 mins',
    date: 'Yesterday, 3:30 PM',
    transcript: `[00:02] Alex: Welcome to the Sev-1 post-mortem for incident INC-4921. At 14:12 UTC yesterday, the global API gateway experienced a sustained P99 latency spike from 45ms to 8,400ms, causing cascading connection pool exhaustion across 14 downstream microservices. 
[00:22] Sam: The customer impact was severe—checkout was impaired for 42 minutes, breaching our tier-1 enterprise SLA of 99.95% monthly uptime for 8 Fortune 500 accounts.
[00:38] Chen: Root cause is identified: when the secondary replica failed its health check, our Aurora PostgreSQL cluster initiated an unplanned automated failover. The connection pooler (PgBouncer) did not have DNS TTL caching tuned down, so thousands of worker pods kept hammering the zombie primary socket instead of routing to the newly elected primary.
[00:58] Alex: Okay, let's turn this into hard mitigation tasks so this specific failure mode is mathematically impossible going forward. 
[01:06] Chen: Chen will reconfigure PgBouncer DNS resolution TTL from 300 seconds down to 5 seconds and deploy the update to production by tomorrow 10:00 AM.
[01:18] Sam: I'll handle the client-side resiliency. Sam will update the Go and Node.js SDK database drivers with exponential backoff and jitter for disconnect reconnections by Thursday 2:00 PM.
[01:32] Alex: What about notifying enterprise customers who breached SLA credits? 
[01:38] Maya: We need an SLA breach impact report drafted with exact downtime per enterprise tenant, but right now no one has taken ownership of pulling the datadog logs and sending it to Customer Success. 
[01:52] Alex: Right, that SLA impact report is high priority. If CS doesn't get that by Wednesday 11:00 AM, account managers will be blind on customer renewal calls. Marking that as unassigned for now so we can staff it immediately.
[02:07] Maya: Maya will also write an automated chaos engineering drill in Chaos Mesh that simulates mid-day Aurora primary failover. I will schedule the staging drill for next Tuesday at 2:00 PM.
[02:22] Chen: Also, decision made: We are migrating all remaining direct DB connection pools to AWS RDS Proxy before next quarter's freeze.
[02:34] Alex: Recorded. Let's schedule a 30-minute verification sync next Monday at 11:00 AM to review the PgBouncer production deploy metrics and verify the driver backoff telemetry.`,
    extractedData: {
      actionItems: [
        {
          id: 'act-101',
          title: 'Lower PgBouncer DNS TTL from 300s to 5s & deploy config to global clusters',
          contextQuote: "Chen: Chen will reconfigure PgBouncer DNS resolution TTL from 300 seconds down to 5 seconds and deploy the update to production by tomorrow 10:00 AM.",
          owner: 'Chen (Database Architect)',
          isUnassigned: false,
          priority: 'P0 Urgent',
          dueDate: 'Tomorrow, 10:00 AM',
          targetTool: 'Jira Ticket',
          toolKey: 'INFRA-902',
          toolDetails: 'Project: INFRA | Component: DB-PgBouncer | Type: Hotfix',
          status: 'pending',
          jiraTicket: {
            key: 'INFRA-902',
            summary: 'Reduce PgBouncer DNS caching TTL to 5s to eliminate zombie socket storms',
            assignee: 'Chen (Database Architect)',
            priority: 'Highest (P0)',
            issueType: 'Incident Action Item',
            status: 'IN PROGRESS',
            description: 'Apply config update across AWS us-east-1 and eu-west-1 PgBouncer daemons to ensure fast failover detection during Aurora replica promotions.'
          }
        },
        {
          id: 'act-102',
          title: 'Pull Datadog tenant metrics & compile SLA breach credit report for CS',
          contextQuote: "We need an SLA breach impact report drafted with exact downtime per enterprise tenant, but right now no one has taken ownership of pulling the datadog logs and sending it to Customer Success.",
          owner: 'Unassigned — Needs Owner',
          isUnassigned: true,
          priority: 'P0 Urgent',
          dueDate: 'Wednesday, 11:00 AM',
          targetTool: 'Slack Update',
          toolKey: 'SLA-REPORT',
          toolDetails: 'Channel: #customer-success-escalations | Format: CSV + Exec Summary',
          status: 'pending',
          jiraTicket: {
            key: 'OPS-441',
            summary: 'Enterprise customer SLA downtime quantification report for INC-4921',
            assignee: 'Unassigned (Needs Lead Assignment)',
            priority: 'Highest (P0)',
            issueType: 'Urgent Task',
            status: 'BACKLOG',
            description: 'Calculate exact minutes of 504 errors per Fortune 500 enterprise account for billing credit adjustments and proactive CS outreach.'
          }
        },
        {
          id: 'act-103',
          title: 'Implement exponential backoff + jitter in Go & Node.js DB connection drivers',
          contextQuote: "Sam: Sam will update the Go and Node.js SDK database drivers with exponential backoff and jitter for disconnect reconnections by Thursday 2:00 PM.",
          owner: 'Sam (Core Platform Eng)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Thursday, 2:00 PM',
          targetTool: 'Jira Ticket',
          toolKey: 'PLAT-650',
          toolDetails: 'Project: PLATFORM | Component: Core-Drivers | Type: Task',
          status: 'pending',
          jiraTicket: {
            key: 'PLAT-650',
            summary: 'Add full jitter exponential backoff to internal database connection pools',
            assignee: 'Sam (Core Platform Eng)',
            priority: 'High (P1)',
            issueType: 'Task',
            status: 'TO DO',
            description: 'Prevent thundering herd reconnect bursts during database failover by injecting randomized jitter into reconnection retry loops.'
          }
        },
        {
          id: 'act-104',
          title: 'Author Chaos Mesh staging drill simulating mid-day Aurora primary failover',
          contextQuote: "Maya: Maya will also write an automated chaos engineering drill in Chaos Mesh that simulates mid-day Aurora primary failover. I will schedule the staging drill for next Tuesday at 2:00 PM.",
          owner: 'Maya (Chaos & QA)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Next Tuesday, 2:00 PM',
          targetTool: 'Jira Ticket',
          toolKey: 'QA-338',
          toolDetails: 'Project: QA-CHAOS | Component: Staging-Drills | Type: Story',
          status: 'pending',
          jiraTicket: {
            key: 'QA-338',
            summary: 'Simulated automated Aurora failover chaos drill in staging environment',
            assignee: 'Maya (Chaos & QA)',
            priority: 'High (P1)',
            issueType: 'Story',
            status: 'READY FOR DEV',
            description: 'Configure Chaos Mesh workflow to trigger pod network partitions and forced Aurora primary re-election to validate driver reconnect performance.'
          }
        },
        {
          id: 'act-105',
          title: 'Architectural migration RFC: Transition legacy pools to AWS RDS Proxy',
          contextQuote: "Chen: Also, decision made: We are migrating all remaining direct DB connection pools to AWS RDS Proxy before next quarter's freeze.",
          owner: 'Chen (Database Architect)',
          isUnassigned: false,
          priority: 'P2 Normal',
          dueDate: 'Next Friday, 5:00 PM',
          targetTool: 'Notion Spec',
          toolKey: 'RFC-109',
          toolDetails: 'Workspace: Architecture RFCs | Template: Major Infra Migration',
          status: 'pending',
          jiraTicket: {
            key: 'ARCH-109',
            summary: 'RFC: Full platform transition from self-managed PgBouncer to AWS RDS Proxy',
            assignee: 'Chen (Database Architect)',
            priority: 'Medium (P2)',
            issueType: 'RFC',
            status: 'TO DO',
            description: 'Comprehensive cost-benefit and latency analysis of adopting managed RDS Proxy to eliminate self-hosted pooler management.'
          }
        },
        {
          id: 'act-106',
          title: 'Schedule Post-Mortem Action Item Verification Review Sync',
          contextQuote: "Alex: Recorded. Let's schedule a 30-minute verification sync next Monday at 11:00 AM to review the PgBouncer production deploy metrics and verify the driver backoff telemetry.",
          owner: 'Alex (Incident Commander / SRE)',
          isUnassigned: false,
          priority: 'P1 High',
          dueDate: 'Next Monday, 11:00 AM',
          targetTool: 'Calendar Invite',
          toolKey: 'CAL-901',
          toolDetails: 'Calendar: Google Workspace | Room: meet.google.com/inc-postmortem-followup',
          status: 'pending',
          jiraTicket: {
            key: 'INC-4921-SYNC',
            summary: 'INC-4921 Remediation Verification Sync',
            assignee: 'Alex (Incident Commander / SRE)',
            priority: 'High (P1)',
            issueType: 'Meeting',
            status: 'SCHEDULED',
            description: 'Review PgBouncer 5s TTL production logs and verify driver backoff metric dashboards.'
          }
        }
      ],
      decisions: [
        {
          id: 'dec-101',
          decision: 'Permanently retire 300s DNS TTL caching on all internal proxy layers',
          rationale: 'Stale DNS caches caused over 40 minutes of prolonged socket exhaustion during primary failover.',
          binding: true
        },
        {
          id: 'dec-102',
          decision: 'Mandatory exponential backoff with full jitter in all database SDKs',
          rationale: 'Flat retry loops created a destructive thundering herd against newly promoted database replicas.',
          binding: true
        },
        {
          id: 'dec-103',
          decision: 'Approve migration to managed AWS RDS Proxy prior to Q4 code freeze',
          rationale: 'Eliminates maintenance overhead and manual DNS failover reconciliation in self-hosted PgBouncer.',
          binding: true
        }
      ],
      blockers: [
        {
          id: 'blk-101',
          blocker: 'Unassigned SLA Breach Impact Report for 8 impacted Enterprise accounts',
          severity: 'Critical (Blocker)',
          impact: 'Customer Success and Executives unable to calculate credit adjustments or communicate proactively.',
          suggestedOwner: 'Alex (Incident Commander) or Maya (QA)'
        },
        {
          id: 'blk-102',
          blocker: 'Production Aurora connection spikes during failover recovery phase',
          severity: 'High',
          impact: 'Risk of secondary cascade until PgBouncer 5s TTL is deployed and drivers are updated.',
          suggestedOwner: 'Chen (Database Architect)'
        }
      ],
      slackDigest: {
        channel: '#incident-sev1-postmortems',
        channelId: 'C088KLP90',
        author: 'ExecFlow Incident Agent',
        timestamp: 'Just now',
        title: '🔴 Post-Mortem Incident Digest: INC-4921 (Global API Latency Spike)',
        summary: 'Incident duration: 42 mins. Root cause: Aurora replica failover compounded by 300s PgBouncer DNS TTL. 6 remediation items drafted.',
        urgentBlockerAlert: '⚠️ UNASSIGNED OWNER: Enterprise SLA credit quantification report needs an owner by Wednesday 11:00 AM.',
        sections: [
          {
            title: '🛠️ Remediation Commitments',
            items: [
              '• @Chen: Deploy 5s PgBouncer DNS TTL update to production by Tomorrow 10:00 AM (INFRA-902)',
              '• @Sam: Implement exponential backoff + jitter in Go/Node.js SDKs by Thursday 2:00 PM (PLAT-650)',
              '• @Maya: Schedule Chaos Mesh Aurora failover simulation for Next Tuesday 2:00 PM (QA-338)',
              '• ⚠️ UNASSIGNED: Pull Datadog tenant SLA breach report by Wednesday 11:00 AM'
            ]
          },
          {
            title: '📌 Binding Architectural Decisions',
            items: [
              '• 5-second max TTL enforced globally for all internal connection poolers.',
              '• Migration to AWS RDS Proxy approved for next release cycle.'
            ]
          }
        ]
      },
      calendarFollowUp: {
        title: 'INC-4921 Remediation & Action Item Verification Sync',
        suggestedTime: 'Next Monday, 11:00 AM - 11:30 AM EST',
        duration: '30 mins',
        room: 'https://meet.google.com/exf-inc-4921-review',
        attendees: [
          { name: 'Alex (Incident Commander)', email: 'alex.vance@company.com', status: 'Organizer' },
          { name: 'Chen (Database Architect)', email: 'chen.wei@company.com', status: 'Required' },
          { name: 'Sam (Core Platform)', email: 'sam.rivers@company.com', status: 'Required' },
          { name: 'Maya (Chaos & QA)', email: 'maya.lin@company.com', status: 'Required' }
        ],
        agenda: [
          '1. Audit production telemetry from PgBouncer 5s TTL rollout (Chen)',
          '2. Inspect driver backoff telemetry & connection spike graphs (Sam)',
          '3. Review Customer Success SLA credit reconciliation letters (Alex)',
          '4. Confirm Chaos Mesh staging drill test plan (Maya)'
        ]
      }
    }
  }
];

export const TEAM_MEMBERS = [
  'Sarah (Product Lead)',
  'Priya (Frontend Eng)',
  'Dave (Payment Infra)',
  'Marcus (Compliance)',
  'Elena (UX Research)',
  'Alex (Incident Commander / SRE)',
  'Chen (Database Architect)',
  'Sam (Core Platform Eng)',
  'Maya (Chaos & QA)',
  'Jordan (Engineering Manager)'
];

export const TARGET_TOOLS = [
  { id: 'Jira Ticket', name: 'Jira Ticket', icon: 'CheckSquare', color: 'indigo' },
  { id: 'Slack Update', name: 'Slack Update', icon: 'MessageSquare', color: 'emerald' },
  { id: 'Calendar Invite', name: 'Calendar Invite', icon: 'Calendar', color: 'amber' },
  { id: 'Notion Spec', name: 'Notion Spec', icon: 'FileText', color: 'sky' }
];

