import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  User, 
  Tag, 
  Filter, 
  MessageSquare, 
  FileText, 
  Quote, 
  AlertTriangle,
  Send,
  Plus,
  Bell,
  ShieldCheck,
  Check
} from 'lucide-react';
import { TEAM_MEMBERS } from '../data/sampleMeetings';

export default function ActionItemsQueue({
  actionItems,
  onToggleStatus,
  onApproveAll,
  onUpdateOwner,
  onAddItem,
  onOpenConfirmationGate,
  isProcessing
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'executed'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState(TEAM_MEMBERS[0]);
  const [newPriority, setNewPriority] = useState('P1 High');
  const [newTargetTool, setNewTargetTool] = useState('Jira Ticket');

  const pendingCount = actionItems.filter(i => i.status === 'pending').length;
  const executedCount = actionItems.filter(i => i.status === 'executed').length;
  const unassignedCount = actionItems.filter(i => i.owner?.toLowerCase().includes('unassigned') || i.isUnassigned).length;

  const filteredItems = actionItems.filter(item => {
    if (filter === 'pending') return item.status === 'pending';
    if (filter === 'executed') return item.status === 'executed';
    return true;
  });

  const getToolIcon = (toolName) => {
    switch (toolName) {
      case 'Jira Ticket':
        return <CheckSquare className="w-3.5 h-3.5 text-amber-400" />;
      case 'Slack Update':
        return <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />;
      case 'Calendar Invite':
        return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
      case 'Notion Spec':
        return <FileText className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'P0 Urgent':
        return 'bg-red-950 text-red-300 border-red-500/50 font-black';
      case 'P1 High':
        return 'bg-amber-950 text-amber-300 border-amber-500/40 font-bold';
      case 'P2 Normal':
      default:
        return 'bg-yellow-950/60 text-yellow-300 border-yellow-500/30';
    }
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddItem({
      id: `act-manual-${Date.now()}`,
      title: newTitle.trim(),
      contextQuote: 'Manual action item synthesized during human-in-the-loop triage',
      speaker: 'Reviewer',
      owner: newOwner,
      isUnassigned: newOwner.toLowerCase().includes('unassigned'),
      priority: newPriority,
      dueDate: 'End of Sprint',
      reminders: [
        { time: 'T-24h', label: '1 Day Prior', channel: 'Slack DM', status: 'Scheduled' },
        { time: 'T-2h', label: '2 Hours Prior', channel: 'Escalation Alert', status: 'Armed' }
      ],
      targetTool: newTargetTool,
      toolKey: `MANUAL-${Math.floor(Math.random() * 900 + 100)}`,
      toolDetails: 'User created item',
      status: 'pending',
      jiraTicket: {
        key: `MANUAL-${Math.floor(Math.random() * 900 + 100)}`,
        summary: newTitle.trim(),
        assignee: newOwner,
        priority: newPriority === 'P0 Urgent' ? 'Highest (P0)' : 'High (P1)',
        issueType: 'Task',
        status: 'BACKLOG',
        description: 'Manually synthesized task added to execution plan.'
      }
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md transition-all">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Action Items & Approval Queue
              </h2>
              {unassignedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-950 text-red-300 border border-red-500/50 animate-pulse">
                  {unassignedCount} Needs Owner
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400">Human-in-the-Loop review: verify owners, deadlines & approve</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-amber-400 border border-amber-500/30">
          Section 2
        </span>
      </div>

      {/* Top Filter & Batch Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All ({actionItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'pending'
                ? 'bg-yellow-950 text-yellow-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('executed')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              filter === 'executed'
                ? 'bg-amber-500 text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Executed ({executedCount})
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Add Custom Action Item"
          >
            <Plus className="w-4 h-4 text-amber-400" />
          </button>

          <button
            type="button"
            onClick={onOpenConfirmationGate}
            disabled={actionItems.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-md shadow-amber-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Confirmation Gate ({pendingCount})</span>
          </button>
        </div>
      </div>

      {/* Action Items List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 min-h-[420px]">
        {filteredItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/30">
            <CheckSquare className="w-10 h-10 text-neutral-600 mb-2" />
            <p className="text-sm font-bold text-white">No Action Items in this view</p>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              {actionItems.length === 0 
                ? 'Click "Run Execution Agent ->" to extract structured tasks from the transcript.' 
                : 'All tasks matching this filter have been executed.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isUnassigned = item.owner?.toLowerCase().includes('unassigned') || item.isUnassigned;
            const isExecuted = item.status === 'executed';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all duration-200 relative ${
                  isExecuted
                    ? 'bg-neutral-900/50 border-neutral-800 text-neutral-400'
                    : isUnassigned
                    ? 'bg-neutral-900/90 border-red-500/70 red-alert-pulse text-white'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-amber-500/40 text-white'
                }`}
              >
                {/* Top Row: Target Tool & Priority & Due Date */}
                <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-neutral-950 border border-neutral-800 text-neutral-200">
                      {getToolIcon(item.targetTool)}
                      <span>{item.targetTool}</span>
                    </span>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] uppercase tracking-wider border ${getPriorityStyle(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Due: <strong className="text-white">{item.dueDate}</strong></span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-sm font-bold leading-snug mb-2.5 ${
                  isExecuted ? 'line-through text-neutral-500' : 'text-white'
                }`}>
                  {item.title}
                </h3>

                {/* Verbatim Context Quote from Transcript */}
                {item.contextQuote && (
                  <div className="mb-3 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/90 text-[11px] text-neutral-300 flex items-start gap-2">
                    <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 rotate-180 opacity-80" />
                    <span className="italic leading-relaxed font-mono">
                      "{item.contextQuote}"
                    </span>
                  </div>
                )}

                {/* Reminders Preview Pill */}
                {item.reminders && (
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                    <Bell className="w-3 h-3 text-yellow-400" />
                    <span>Automated Reminders:</span>
                    <span className="px-1.5 py-0.2 rounded bg-neutral-950 border border-neutral-800 text-amber-300 font-semibold">
                      T-24h
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-neutral-950 border border-neutral-800 text-red-300 font-semibold">
                      T-2h
                    </span>
                  </div>
                )}

                {/* Bottom Row: Owner Assignment & Status Toggle */}
                <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-neutral-800 flex-wrap">
                  {/* Owner Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-400 font-medium">Owner:</span>
                    <div className="relative">
                      <select
                        value={item.owner}
                        onChange={(e) => onUpdateOwner(item.id, e.target.value)}
                        className={`text-xs font-bold py-1 px-2.5 pr-7 rounded-xl appearance-none cursor-pointer border focus:outline-none focus:ring-1 transition-all ${
                          isUnassigned
                            ? 'bg-red-950 text-red-200 border-red-500 font-black focus:ring-red-500'
                            : 'bg-neutral-950 text-white border-neutral-800 hover:border-amber-500/50 focus:ring-amber-500'
                        }`}
                      >
                        {isUnassigned && (
                          <option value="Unassigned — Needs Owner" className="bg-neutral-950 text-red-400 font-black">
                            ⚠️ Unassigned — Needs Owner
                          </option>
                        )}
                        {TEAM_MEMBERS.map(member => (
                          <option key={member} value={member} className="bg-neutral-950 text-neutral-200">
                            {member}
                          </option>
                        ))}
                      </select>
                      <User className={`w-3.5 h-3.5 absolute right-2 top-2 pointer-events-none ${
                        isUnassigned ? 'text-red-400' : 'text-neutral-400'
                      }`} />
                    </div>
                  </div>

                  {/* Status Toggle & Execute Button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isExecuted
                          ? 'bg-neutral-950 text-amber-400 border border-amber-500/40 hover:bg-neutral-900'
                          : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Approved & Executed</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Approve & Post</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              Add Action Item to Execution Plan
            </h3>

            <form onSubmit={handleCreateCustom} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule compliance review before cutoff"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Assignee</label>
                  <select
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    {TEAM_MEMBERS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                    <option value="Unassigned — Needs Owner">⚠️ Unassigned — Needs Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                  >
                    <option value="P0 Urgent">P0 Urgent</option>
                    <option value="P1 High">P1 High</option>
                    <option value="P2 Normal">P2 Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">Target Integration</label>
                <select
                  value={newTargetTool}
                  onChange={(e) => setNewTargetTool(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                >
                  <option value="Jira Ticket">Jira Ticket</option>
                  <option value="Slack Update">Slack Update</option>
                  <option value="Calendar Invite">Calendar Invite</option>
                  <option value="Notion Spec">Notion Spec</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all disabled:opacity-40"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
