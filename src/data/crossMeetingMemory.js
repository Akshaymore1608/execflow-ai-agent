// Cross-Meeting Memory Vault
// Stores historical binding decisions from past executive & engineering syncs
// Enables autonomous detection of conflicts with earlier decisions

export const PAST_MEETING_DECISIONS = [
  {
    id: 'mem-dec-89',
    meetingTitle: 'Q3 Payment Resiliency & Compliance Review',
    meetingDate: 'October 12, 2026',
    speaker: 'Marcus (Compliance & Legal)',
    decision: 'All secondary payment gateway fallbacks require 14-day VP SecOps audit prior to automated routing activation.',
    category: 'Security & Compliance',
    status: 'ACTIVE_POLICY',
    tags: ['payments', 'adyen', 'stripe', 'compliance'],
    impactZone: 'Checkout & Gateway Failovers'
  },
  {
    id: 'mem-dec-74',
    meetingTitle: 'Design System Governance Sync',
    meetingDate: 'November 03, 2026',
    speaker: 'Elena (UX Research)',
    decision: 'Mobile button touch targets must strictly maintain 44px minimum bounding box across iOS web.',
    category: 'Design Systems',
    status: 'SUPERSEDED_CANDIDATE',
    tags: ['mobile', 'design-tokens', 'touch-targets'],
    impactZone: 'Mobile UI Components'
  },
  {
    id: 'mem-dec-61',
    meetingTitle: 'Infrastructure Reliability Charter Q3',
    meetingDate: 'September 28, 2026',
    speaker: 'Sam (Core Platform Eng)',
    decision: 'Database connection poolers must maintain minimum 60s DNS TTL to prevent socket thrashing on Aurora replica flaps.',
    category: 'Database Infrastructure',
    status: 'ACTIVE_POLICY',
    tags: ['pgbouncer', 'aurora', 'dns-ttl', 'failover'],
    impactZone: 'PgBouncer & RDS Clusters'
  },
  {
    id: 'mem-dec-55',
    meetingTitle: 'Enterprise Customer SLA Review',
    meetingDate: 'August 14, 2026',
    speaker: 'Alex (SRE Incident Commander)',
    decision: 'Any downtime exceeding 15 minutes requires manual VP of CS approval before customer breach reports are transmitted.',
    category: 'Legal & Customer Operations',
    status: 'ACTIVE_POLICY',
    tags: ['sla-reports', 'enterprise', 'incident-response'],
    impactZone: 'CS Incident Escalations'
  }
];

export const PRESET_CONFLICTS = {
  'product-launch-sync': [
    {
      id: 'conf-1',
      severity: 'HIGH_CONFLICT',
      type: 'Direct Policy Contradiction',
      currentMeetingDecision: 'Adyen approved as automated secondary payment gateway fallback for Black Friday traffic.',
      currentMeetingSpeaker: 'Sarah (Product Lead)',
      pastDecisionId: 'mem-dec-89',
      pastMeetingTitle: 'Q3 Payment Resiliency & Compliance Review (Oct 12)',
      pastDecisionText: 'All secondary payment gateway fallbacks require 14-day VP SecOps audit prior to automated routing activation.',
      pastSpeaker: 'Marcus (Compliance & Legal)',
      explanation: 'Sarah approved automated Adyen routing without scheduling the mandatory 14-day SecOps audit mandated in the October 12 sync.',
      recommendedAction: 'Attach SecOps audit gate to CHK-108 before automated circuit-breaker is enabled in production.',
      status: 'UNRESOLVED'
    },
    {
      id: 'conf-2',
      severity: 'MEDIUM_UPGRADE',
      type: 'Standard Revision / Upgrade',
      currentMeetingDecision: 'Minimum mobile interactive touch targets standardized to 48px.',
      currentMeetingSpeaker: 'Elena & Priya',
      pastDecisionId: 'mem-dec-74',
      pastMeetingTitle: 'Design System Governance Sync (Nov 03)',
      pastDecisionText: 'Mobile button touch targets must strictly maintain 44px minimum bounding box across iOS web.',
      pastSpeaker: 'Elena (UX Research)',
      explanation: 'Current decision expands minimum touch targets from 44px to 48px to accommodate iPhone Mini test findings.',
      recommendedAction: 'Supersede past 44px rule in Figma design tokens and update Global Design System spec.',
      status: 'RESOLVED_SUPERSEDED'
    }
  ],
  'engineering-incident-post-mortem': [
    {
      id: 'conf-101',
      severity: 'CRITICAL_CONFLICT',
      type: 'Architectural Invalidation',
      currentMeetingDecision: 'Chen will reconfigure PgBouncer DNS resolution TTL from 300 seconds down to 5 seconds globally.',
      currentMeetingSpeaker: 'Chen (Database Architect)',
      pastDecisionId: 'mem-dec-61',
      pastMeetingTitle: 'Infrastructure Reliability Charter Q3 (Sep 28)',
      pastDecisionText: 'Database connection poolers must maintain minimum 60s DNS TTL to prevent socket thrashing on Aurora replica flaps.',
      pastSpeaker: 'Sam (Core Platform Eng)',
      explanation: 'The new 5-second TTL overrides the 60-second minimum safety threshold established in the Q3 charter to prevent socket thrashing.',
      recommendedAction: 'Ratify formal architecture waiver in RFC-109 with Sam and Chen before production deployment.',
      status: 'UNRESOLVED'
    },
    {
      id: 'conf-102',
      severity: 'HIGH_CONFLICT',
      type: 'Process Protocol Conflict',
      currentMeetingDecision: 'SLA breach impact report drafted and sent directly to Customer Success by Wednesday 11:00 AM.',
      currentMeetingSpeaker: 'Maya & Alex',
      pastDecisionId: 'mem-dec-55',
      pastMeetingTitle: 'Enterprise Customer SLA Review (Aug 14)',
      pastDecisionText: 'Any downtime exceeding 15 minutes requires manual VP of CS approval before customer breach reports are transmitted.',
      pastSpeaker: 'Alex (Incident Commander)',
      explanation: 'Current 42-minute incident report requires explicit VP of CS signoff prior to account manager distribution.',
      recommendedAction: 'Insert VP of CS signoff milestone before releasing raw Datadog downtime numbers.',
      status: 'UNRESOLVED'
    }
  ]
};

