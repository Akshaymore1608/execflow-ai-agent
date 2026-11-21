import React, { useState } from 'react';
import { 
  Kanban, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  Clock, 
  Users, 
  Hash, 
  AlertTriangle, 
  Video, 
  CheckCheck, 
  FileCheck2,
  Database,
  ShieldCheck
} from 'lucide-react';

export default function ExecutionSimulator({
  actionItems,
  decisions,
  blockers,
  slackDigest,
  calendarFollowUp,
  conflicts,
  executionLogs,
  onOpenMemoryModal,
  onOpenConfirmationGate
}) {
  const [activeTab, setActiveTab] = useState('jira'); // 'jira' | 'slack' | 'calendar' | 'decisions'
  const [copiedSection, setCopiedSection] = useState(null);

  const executedItems = actionItems.filter(item => item.status === 'executed');
  const pendingItems = actionItems.filter(item => item.status === 'pending');
  const activeConflicts = conflicts.filter(c => c.status === 'UNRESOLVED');

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md transition-all">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <Kanban className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Execution Integrations
              </h2>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-neutral-400">Real-time simulated outputs as tasks are confirmed & approved</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-amber-400 border border-amber-500/30">
          Section 3
        </span>
      </div>

      {/* Integration Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl mb-3.5 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('jira')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'jira'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Jira ({executedItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('slack')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'slack'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Slack</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'calendar'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Sync</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('decisions')}
          className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'decisions'
              ? 'bg-amber-500 text-black shadow-sm font-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Log</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 min-h-[380px]">
        {/* TAB 1: JIRA BOARD CARDS */}
        {activeTab === 'jira' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Kanban className="w-3.5 h-3.5 text-amber-400" />
                Live Jira Cloud Board
              </span>
              <span className="text-[11px] text-amber-300 bg-amber-950 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                <CheckCheck className="w-3 h-3" />
                {executedItems.length} Created Live
              </span>
            </div>

            {executedItems.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/40 text-center space-y-2.5">
                <Kanban className="w-10 h-10 text-neutral-600 mx-auto" />
                <p className="text-xs font-bold text-white">No Tickets Dispatched Yet</p>
                <p className="text-[11px] text-neutral-400 max-w-xs mx-auto">
                  Click <strong className="text-amber-400">"Approve & Post"</strong> or trigger the <strong className="text-red-400">Confirmation Gate</strong> to create tickets.
                </p>
              </div>
            ) : (
              executedItems.map((item) => {
                const ticket = item.jiraTicket || {
                  key: item.toolKey || 'CHK-100',
                  summary: item.title,
                  assignee: item.owner,
                  priority: item.priority,
                  status: 'IN PROGRESS',
                  description: item.contextQuote
                };

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-neutral-900 border border-amber-500/40 shadow-xl relative overflow-hidden group hover:border-amber-400 transition-all"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>

                    {/* Ticket Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-amber-500/30">
                          {ticket.key}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {ticket.issueType || 'Task'}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        {ticket.status || 'IN PROGRESS'}
                      </span>
                    </div>

                    {/* Summary */}
                    <h4 className="text-xs font-bold text-white mb-2 leading-relaxed">
                      {ticket.summary}
                    </h4>

                    {/* Description preview */}
                    {ticket.description && (
                      <p className="text-[11px] text-neutral-400 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 mb-2.5 leading-relaxed font-mono line-clamp-2">
                        {ticket.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-black text-amber-300">
                          {ticket.assignee?.charAt(0) || 'U'}
                        </span>
                        <span className="font-bold text-neutral-200">
                          {ticket.assignee}
                        </span>
                      </div>

                      <span className="text-[10px] text-neutral-400 font-mono">
                        Priority: <strong className="text-amber-400">{ticket.priority}</strong>
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pending queue preview */}
            {pendingItems.length > 0 && (
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
                <span>{pendingItems.length} tasks ready for confirmation</span>
                <button
                  type="button"
                  onClick={onOpenConfirmationGate}
                  className="text-[11px] text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Review Gate →
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SLACK SUMMARY DIGEST CARD */}
        {activeTab === 'slack' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                Simulated Slack Post
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(JSON.stringify(slackDigest, null, 2), 'slack')}
                className="text-[11px] flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              >
                {copiedSection === 'slack' ? (
                  <>
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Post</span>
                  </>
                )}
              </button>
            </div>

            {/* Authentic Slack Message UI */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/30 shadow-xl text-neutral-200 text-xs space-y-3 font-sans">
              {/* Slack Header */}
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-neutral-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-black text-xs shadow-md">
                  EF
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">ExecFlow Autonomous Bot</span>
                    <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.2 rounded font-mono">APP</span>
                    <span className="text-[11px] text-neutral-500">{slackDigest?.timestamp || 'Today at 10:45 AM'}</span>
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <span>{slackDigest?.channel || '#product-launch-war-room'}</span>
                  </div>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">
                  {slackDigest?.title}
                </h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  {slackDigest?.summary}
                </p>
              </div>

              {/* Urgent Blocker Alert Callout */}
              {slackDigest?.urgentBlockerAlert && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 font-bold text-[11px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{slackDigest.urgentBlockerAlert}</span>
                </div>
              )}

              {/* Conflict Alert Callout */}
              {slackDigest?.conflictAlert && (
                <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-200 font-bold text-[11px] flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{slackDigest.conflictAlert}</span>
                </div>
              )}

              {/* Digest Sections */}
              {slackDigest?.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-1.5 pt-1">
                  <div className="font-bold text-white text-xs">
                    {sec.title}
                  </div>
                  <div className="space-y-1 pl-1 text-[11px] text-neutral-300">
                    {sec.items.map((line, lIdx) => (
                      <div key={lIdx} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Reactions bar */}
              <div className="pt-2 flex items-center gap-1.5 border-t border-neutral-800">
                <span className="px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] flex items-center gap-1">
                  🚀 <span className="text-neutral-400 font-mono">4</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] flex items-center gap-1">
                  👀 <span className="text-neutral-400 font-mono">7</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] flex items-center gap-1">
                  ✅ <span className="text-neutral-400 font-mono">3</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR FOLLOW-UP CARD */}
        {activeTab === 'calendar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Auto-Scheduled Calendar Block
              </span>
              <span className="text-[11px] text-amber-400 font-mono">Google Calendar API</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/30 shadow-xl space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Confirmed Sync Block
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">
                  {calendarFollowUp?.title || 'Execution Review Sync'}
                </h4>
              </div>

              {/* Timing & Meet Link */}
              <div className="space-y-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">{calendarFollowUp?.suggestedTime}</span>
                  <span className="text-neutral-500">({calendarFollowUp?.duration})</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-800">
                  <div className="flex items-center gap-2 truncate text-amber-300">
                    <Video className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate text-[11px] font-mono">{calendarFollowUp?.room}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calendarFollowUp?.room, 'meet')}
                    className="text-[10px] text-neutral-400 hover:text-white px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700"
                  >
                    {copiedSection === 'meet' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Attendees */}
              <div>
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3 text-neutral-500" />
                  Required Attendees ({calendarFollowUp?.attendees?.length || 0}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {calendarFollowUp?.attendees?.map((att, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-neutral-950 border border-neutral-800 text-neutral-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      <span>{att.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div>
                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Automated Agenda:
                </div>
                <ul className="space-y-1 text-[11px] text-neutral-300 pl-1">
                  {calendarFollowUp?.agenda?.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DECISIONS & CONFLICTS LOG */}
        {activeTab === 'decisions' && (
          <div className="space-y-3">
            {/* Active Conflicts Button */}
            {activeConflicts.length > 0 && (
              <button
                type="button"
                onClick={onOpenMemoryModal}
                className="w-full p-3 rounded-xl bg-red-950/40 border border-red-500/50 red-alert-pulse text-left text-xs space-y-1 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-red-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    {activeConflicts.length} Cross-Meeting Policy Conflicts
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-900/60 text-red-200">
                    Open Vault →
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  {activeConflicts[0]?.explanation}
                </p>
              </button>
            )}

            {/* Binding Decisions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Binding Architectural & Product Decisions
                </span>
                <span className="text-[11px] text-amber-400 font-mono font-bold">
                  {decisions?.length || 0} Decisions
                </span>
              </div>

              <div className="space-y-2">
                {decisions?.map((dec) => (
                  <div
                    key={dec.id}
                    className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-1 shadow-sm hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-bold text-white">{dec.decision}</h4>
                        <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                          <strong>Rationale:</strong> {dec.rationale}
                        </p>
                        {dec.conflictDetected && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                            ⚠️ Memory Conflict Detected with earlier sync
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blockers */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Flagged Blockers & Risks
                </span>
                <span className="text-[11px] text-red-400 font-mono font-bold">
                  {blockers?.length || 0} Alerts
                </span>
              </div>

              <div className="space-y-2">
                {blockers?.map((blk) => (
                  <div
                    key={blk.id}
                    className="p-3 rounded-xl bg-neutral-900 border border-red-500/40 text-xs space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30">
                        {blk.severity}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        Target: <strong className="text-amber-300">{blk.suggestedOwner}</strong>
                      </span>
                    </div>

                    <h4 className="font-bold text-red-200">
                      {blk.blocker}
                    </h4>

                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      <strong>Impact:</strong> {blk.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Execution Activity Ticker / Dispatch Stream */}
      <div className="mt-3.5 pt-3 border-t border-neutral-800 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-neutral-400">
          <span className="font-mono flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-amber-400" />
            Live Webhook & Integration Feed
          </span>
          <span className="text-[10px] text-neutral-500">Instant Sync</span>
        </div>

        <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono space-y-1 max-h-24 overflow-y-auto">
          {executionLogs.length === 0 ? (
            <div className="text-neutral-600 italic">No webhook dispatches yet. Approve a task to trigger integration pipeline.</div>
          ) : (
            executionLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 leading-tight">
                <span className="text-neutral-500 shrink-0">[{log.time}]</span>
                <span className={`truncate ${
                  log.type === 'jira' ? 'text-amber-400' :
                  log.type === 'slack' ? 'text-yellow-400' :
                  log.type === 'conflict' ? 'text-red-400 font-bold' :
                  log.type === 'calendar' ? 'text-amber-300' : 'text-neutral-300'
                }`}>
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
