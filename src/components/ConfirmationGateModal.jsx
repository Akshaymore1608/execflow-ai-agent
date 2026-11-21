import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  ExternalLink, 
  Lock, 
  FileCheck2, 
  Send,
  Kanban,
  MessageSquare,
  Calendar
} from 'lucide-react';

export default function ConfirmationGateModal({
  isOpen,
  onClose,
  actionItems,
  conflicts,
  onFinalBroadcast
}) {
  const [hasVerifiedConflicts, setHasVerifiedConflicts] = useState(false);
  const [hasVerifiedOwners, setHasVerifiedOwners] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const unassignedCount = actionItems.filter(i => i.owner?.toLowerCase().includes('unassigned') || i.isUnassigned).length;
  const unresolvedConflicts = conflicts.filter(c => c.status === 'UNRESOLVED').length;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onFinalBroadcast();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-red-500/60 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 relative red-alert-pulse">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-red-600/30">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Confirmation Gate (Human-in-the-Loop)
            </h3>
            <p className="text-xs text-neutral-400">
              Mandatory confirmation step before anything gets posted to production integrations
            </p>
          </div>
        </div>

        {/* Audit Metrics */}
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <div className="text-lg font-black text-amber-400">{actionItems.length}</div>
            <div className="text-[11px] text-neutral-400">Action Items</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <div className={`text-lg font-black ${unassignedCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {unassignedCount}
            </div>
            <div className="text-[11px] text-neutral-400">Unassigned Tasks</div>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
            <div className={`text-lg font-black ${unresolvedConflicts > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
              {unresolvedConflicts}
            </div>
            <div className="text-[11px] text-neutral-400">Memory Conflicts</div>
          </div>
        </div>

        {/* Target Systems Dispatch Preview */}
        <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-2">
          <div className="font-bold text-white text-xs uppercase tracking-wider">
            Ready to dispatch to 3 external systems:
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Kanban className="w-3.5 h-3.5 text-amber-400" />
              <span>Jira Cloud REST API</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Batch Ticket Sync</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
              <span>Slack Webhook Broadcast</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">#channel digest</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Google Calendar Integration</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Auto-Invite Attendees</span>
          </div>
        </div>

        {/* Required Verification Checkboxes */}
        <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer text-neutral-300 hover:text-white">
            <input
              type="checkbox"
              checked={hasVerifiedConflicts}
              onChange={(e) => setHasVerifiedConflicts(e.target.checked)}
              className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <span>
              I have reviewed the cross-meeting decisions and confirmed no conflicting architectural policies are being bypassed.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer text-neutral-300 hover:text-white">
            <input
              type="checkbox"
              checked={hasVerifiedOwners}
              onChange={(e) => setHasVerifiedOwners(e.target.checked)}
              className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <span>
              I confirm the assigned owners, deadlines, and priorities are accurate before live tickets are posted.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            Cancel / Edit Queue
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={!hasVerifiedConflicts || !hasVerifiedOwners || isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Broadcasting to Tools...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Broadcast Everything</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

