import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  UserCheck, 
  ExternalLink, 
  Tag, 
  Check, 
  Filter, 
  MessageSquare, 
  FileText, 
  Quote, 
  AlertTriangle,
  Send,
  Plus,
  Sparkles
} from 'lucide-react';
import { TEAM_MEMBERS, TARGET_TOOLS } from '../data/sampleMeetings';

export default function ActionItemsQueue({
  actionItems,
  onToggleStatus,
  onApproveAll,
  onUpdateOwner,
  onAddItem,
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
        return <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Slack Update':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Calendar Invite':
        return <Calendar className="w-3.5 h-3.5 text-amber-400" />;
      case 'Notion Spec':
        return <FileText className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <Tag className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'P0 Urgent':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'P1 High':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'P2 Normal':
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddItem({
      id: `act-manual-${Date.now()}`,
      title: newTitle.trim(),
      contextQuote: 'Manual action item added during review',
      owner: newOwner,
      isUnassigned: newOwner.toLowerCase().includes('unassigned'),
      priority: newPriority,
      dueDate: 'End of Sprint',
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
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-sm">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                Action Items & Approval Queue
              </h2>
              {unassignedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                  {unassignedCount} Needs Owner
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Human-in-the-Loop review: verify owners & approve live executions</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
          Col 2 (35%)
        </span>
      </div>

      {/* Top Filter & Batch Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-slate-800 text-slate-100 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({actionItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'pending'
                ? 'bg-amber-950/60 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('executed')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              filter === 'executed'
                ? 'bg-emerald-950/60 text-emerald-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
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
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Add Custom Action Item"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onApproveAll}
            disabled={actionItems.length === 0 || pendingCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve & Execute All</span>
          </button>
        </div>
      </div>

      {/* Action Items List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-[420px]">
        {filteredItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-800 rounded-xl bg-slate-950/40">
            <CheckSquare className="w-8 h-8 text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-300">No Action Items in this view</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              {actionItems.length === 0 
                ? 'Click "Run Execution Agent ->" to extract structured tasks from the transcript.' 
                : 'All tasks matching this filter have been processed.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isUnassigned = item.owner?.toLowerCase().includes('unassigned') || item.isUnassigned;
            const isExecuted = item.status === 'executed';

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all duration-200 relative ${
                  isExecuted
                    ? 'bg-slate-950/70 border-emerald-900/40 text-slate-300'
                    : isUnassigned
                    ? 'bg-amber-950/20 border-amber-500/50 glow-amber-alert text-slate-100'
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 text-slate-100'
                }`}
              >
                {/* Top Row: Target Tool & Priority & Due Date */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-900 border border-slate-800 text-slate-200">
                      {getToolIcon(item.targetTool)}
                      <span>{item.targetTool}</span>
                    </span>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getPriorityStyle(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{item.dueDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xs sm:text-sm font-semibold leading-snug mb-2 ${
                  isExecuted ? 'line-through text-slate-400' : 'text-slate-100'
                }`}>
                  {item.title}
                </h3>

                {/* Context Quote from Transcript */}
                {item.contextQuote && (
                  <div className="mb-3 p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5 rotate-180 opacity-70" />
                    <span className="italic leading-relaxed font-mono">
                      "{item.contextQuote}"
                    </span>
                  </div>
                )}

                {/* Bottom Row: Owner Assignment & Status Toggle */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 flex-wrap">
                  {/* Owner Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Owner:</span>
                    <div className="relative">
                      <select
                        value={item.owner}
                        onChange={(e) => onUpdateOwner(item.id, e.target.value)}
                        className={`text-xs font-medium py-1 px-2 pr-6 rounded-lg appearance-none cursor-pointer border focus:outline-none focus:ring-1 transition-all ${
                          isUnassigned
                            ? 'bg-amber-950/80 text-amber-200 border-amber-500/80 font-bold focus:ring-amber-500'
                            : 'bg-slate-900 text-slate-200 border-slate-800 hover:border-slate-700 focus:ring-indigo-500'
                        }`}
                      >
                        {isUnassigned && (
                          <option value="Unassigned — Needs Owner" className="bg-slate-900 text-amber-300 font-bold">
                            ⚠️ Unassigned — Needs Owner
                          </option>
                        )}
                        {TEAM_MEMBERS.map(member => (
                          <option key={member} value={member} className="bg-slate-900 text-slate-200">
                            {member}
                          </option>
                        ))}
                      </select>
                      <User className={`w-3 h-3 absolute right-2 top-2 pointer-events-none ${
                        isUnassigned ? 'text-amber-400' : 'text-slate-400'
                      }`} />
                    </div>
                  </div>

                  {/* Status Toggle & Execute Button */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isExecuted
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Approved & Executed</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>Approve & Execute</span>
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Add Custom Action Item
            </h3>

            <form onSubmit={handleCreateCustom} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Schedule audit with compliance team"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Assignee</label>
                  <select
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    {TEAM_MEMBERS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                    <option value="Unassigned — Needs Owner">⚠️ Unassigned — Needs Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    <option value="P0 Urgent">P0 Urgent</option>
                    <option value="P1 High">P1 High</option>
                    <option value="P2 Normal">P2 Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Integration</label>
                <select
                  value={newTargetTool}
                  onChange={(e) => setNewTargetTool(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                >
                  <option value="Jira Ticket">Jira Ticket</option>
                  <option value="Slack Update">Slack Update</option>
                  <option value="Calendar Invite">Calendar Invite</option>
                  <option value="Notion Spec">Notion Spec</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

