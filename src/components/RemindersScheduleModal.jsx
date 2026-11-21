import React from 'react';
import { Clock, Bell, Check, AlertTriangle, X, Shield, Calendar } from 'lucide-react';

export default function RemindersScheduleModal({
  isOpen,
  onClose,
  actionItems
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Automated Reminders Before Deadlines
              </h3>
              <p className="text-xs text-neutral-400">
                Multi-channel automated escalation sequence (T-48h, T-24h, T-2h)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="space-y-3">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.toolKey || item.id}
                    </span>
                    <span className="font-semibold text-white">{item.title}</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Due: <strong className="text-white">{item.dueDate}</strong>
                  </span>
                </div>

                <div className="text-[11px] text-neutral-400">
                  Owner: <strong className="text-amber-300">{item.owner}</strong>
                </div>

                {/* Reminder Schedule Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-neutral-800">
                  {item.reminders?.map((rem, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-[11px]"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-400 font-mono">{rem.time}</span>
                        <div className="text-[10px] text-neutral-400">{rem.channel}</div>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        rem.status.includes('Armed') ? 'bg-red-950 text-red-300 border border-red-500/40' :
                        rem.status.includes('Warning') ? 'bg-yellow-950 text-yellow-300 border border-yellow-500/40' :
                        'bg-neutral-800 text-neutral-300'
                      }`}>
                        {rem.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
          <span>Escalation Rules: Automated Pings via Slack, Email & PagerDuty</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

