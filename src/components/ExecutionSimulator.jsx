import React, { useState } from 'react';
import { 
  Kanban, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Layers, 
  Clock, 
  Users, 
  Hash, 
  Send, 
  AlertTriangle, 
  Video, 
  CheckCheck, 
  FileCheck2, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

export default function ExecutionSimulator({
  actionItems,
  decisions,
  blockers,
  slackDigest,
  calendarFollowUp,
  executionLogs
}) {
  const [activeTab, setActiveTab] = useState('jira'); // 'jira' | 'slack' | 'calendar' | 'decisions'
  const [copiedSection, setCopiedSection] = useState(null);

  const executedItems = actionItems.filter(item => item.status === 'executed');
  const pendingItems = actionItems.filter(item => item.status === 'pending');

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-sm">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Live Execution Integrations
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-400">Real-time simulated outputs as tasks are approved</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
          Col 3 (30%)
        </span>
      </div>

      {/* Integration Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl mb-3 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('jira')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'jira'
              ? 'bg-indigo-600 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Kanban className="w-3.5 h-3.5" />
          <span>Jira ({executedItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('slack')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'slack'
              ? 'bg-emerald-600 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Slack</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('calendar')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'calendar'
              ? 'bg-amber-600 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Sync</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('decisions')}
          className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'decisions'
              ? 'bg-sky-600 text-white shadow-sm font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Decisions</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[380px]">
        {/* TAB 1: JIRA / LINEAR BOARD CARDS */}
        {activeTab === 'jira' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Kanban className="w-3.5 h-3.5 text-indigo-400" />
                Live Jira Cloud Board
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCheck className="w-3 h-3" />
                {executedItems.length} Created Live
              </span>
            </div>

            {executedItems.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-2">
                <Kanban className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-300">No Tickets Created Yet</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Click <strong className="text-indigo-400">"Approve & Execute"</strong> on any task in Column 2 to dispatch tickets directly to this board.
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
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/30 shadow-lg shadow-indigo-950/40 relative overflow-hidden group hover:border-indigo-500/60 transition-all"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>

                    {/* Ticket Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                          {ticket.key}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {ticket.issueType || 'Task'}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        {ticket.status || 'IN PROGRESS'}
                      </span>
                    </div>

                    {/* Summary */}
                    <h4 className="text-xs font-semibold text-slate-100 mb-2 leading-relaxed">
                      {ticket.summary}
                    </h4>

                    {/* Description preview */}
                    {ticket.description && (
                      <p className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 mb-2.5 leading-relaxed font-mono line-clamp-2">
                        {ticket.description}
                      </p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-[10px] font-bold text-indigo-200">
                          {ticket.assignee?.charAt(0) || 'U'}
                        </span>
                        <span className="font-medium text-slate-300">
                          {ticket.assignee}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono">
                        Priority: <strong className="text-amber-400">{ticket.priority}</strong>
                      </span>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pending queue preview */}
            {pendingItems.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>{pendingItems.length} tasks waiting for human approval</span>
                <span className="text-[11px] text-amber-400 font-mono">Queue Ready</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SLACK SUMMARY DIGEST CARD */}
        {activeTab === 'slack' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                Simulated Slack Post
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(JSON.stringify(slackDigest, null, 2), 'slack')}
                className="text-[11px] flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                {copiedSection === 'slack' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
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
            <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 shadow-xl text-slate-200 text-xs space-y-3 font-sans">
              {/* Slack Header */}
              <div className="flex items-start gap-2.5 pb-2 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                  EF
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">ExecFlow Bot</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">APP</span>
                    <span className="text-[11px] text-slate-500">{slackDigest?.timestamp || 'Today at 10:45 AM'}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <span>{slackDigest?.channel || '#product-launch-war-room'}</span>
                  </div>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-100">
                  {slackDigest?.title}
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {slackDigest?.summary}
                </p>
              </div>

              {/* Urgent Blocker Alert Callout */}
              {slackDigest?.urgentBlockerAlert && (
                <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-200 font-semibold text-[11px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{slackDigest.urgentBlockerAlert}</span>
                </div>
              )}

              {/* Digest Sections */}
              {slackDigest?.sections?.map((sec, idx) => (
                <div key={idx} className="space-y-1.5 pt-1">
                  <div className="font-bold text-slate-200 text-xs">
                    {sec.title}
                  </div>
                  <div className="space-y-1 pl-1 text-[11px] text-slate-300">
                    {sec.items.map((line, lIdx) => (
                      <div key={lIdx} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Slack Reactions bar */}
              <div className="pt-2 flex items-center gap-1.5 border-t border-slate-800">
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] flex items-center gap-1">
                  🚀 <span className="text-slate-400 font-mono">4</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] flex items-center gap-1">
                  👀 <span className="text-slate-400 font-mono">7</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] flex items-center gap-1">
                  ✅ <span className="text-slate-400 font-mono">3</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CALENDAR FOLLOW-UP CARD */}
        {activeTab === 'calendar' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Auto-Scheduled Calendar Block
              </span>
              <span className="text-[11px] text-amber-400 font-mono">Google Calendar API</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 shadow-xl space-y-3 text-xs">
              {/* Meeting Title & Duration */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Confirmed Sync Block
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-1.5">
                  {calendarFollowUp?.title || 'Execution Review Sync'}
                </h4>
              </div>

              {/* Timing & Meet Link */}
              <div className="space-y-2 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold">{calendarFollowUp?.suggestedTime}</span>
                  <span className="text-slate-500">({calendarFollowUp?.duration})</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 truncate text-indigo-300">
                    <Video className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate text-[11px] font-mono">{calendarFollowUp?.room}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calendarFollowUp?.room, 'meet')}
                    className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
                  >
                    {copiedSection === 'meet' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Attendees */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Users className="w-3 h-3 text-slate-500" />
                  Required Attendees ({calendarFollowUp?.attendees?.length || 0}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {calendarFollowUp?.attendees?.map((att, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{att.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Automated Agenda:
                </div>
                <ul className="space-y-1 text-[11px] text-slate-300 pl-1">
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

        {/* TAB 4: DECISIONS & RISKS LOG */}
        {activeTab === 'decisions' && (
          <div className="space-y-3">
            {/* Binding Decisions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Binding Architectural & Product Decisions
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-bold">
                  {decisions?.length || 0} Decisions
                </span>
              </div>

              <div className="space-y-2">
                {decisions?.map((dec) => (
                  <div
                    key={dec.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs space-y-1 shadow-sm"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        ✓
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-100">{dec.decision}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          <strong>Rationale:</strong> {dec.rationale}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unresolved Blockers & Risks */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  Flagged Blockers & Unresolved Risks
                </span>
                <span className="text-[11px] text-rose-400 font-mono font-bold">
                  {blockers?.length || 0} Alerts
                </span>
              </div>

              <div className="space-y-2">
                {blockers?.map((blk) => (
                  <div
                    key={blk.id}
                    className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/40 text-xs space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {blk.severity}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Target: <strong className="text-amber-300">{blk.suggestedOwner}</strong>
                      </span>
                    </div>

                    <h4 className="font-semibold text-rose-100">
                      {blk.blocker}
                    </h4>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
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
      <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-emerald-400" />
            Live Webhook & Integration Feed
          </span>
          <span className="text-[10px] text-slate-500">Instant Sync</span>
        </div>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 max-h-24 overflow-y-auto">
          {executionLogs.length === 0 ? (
            <div className="text-slate-600 italic">No webhook dispatches yet. Approve a task to trigger integration pipeline.</div>
          ) : (
            executionLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 leading-tight">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                <span className={`truncate ${
                  log.type === 'jira' ? 'text-indigo-400' :
                  log.type === 'slack' ? 'text-emerald-400' :
                  log.type === 'calendar' ? 'text-amber-400' : 'text-slate-300'
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
