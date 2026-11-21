import React, { useState } from 'react';
import { 
  Database, 
  AlertTriangle, 
  ShieldAlert, 
  History, 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import { PAST_MEETING_DECISIONS } from '../data/crossMeetingMemory';

export default function CrossMeetingMemoryModal({
  isOpen,
  onClose,
  conflicts,
  onResolveConflict
}) {
  const [activeTab, setActiveTab] = useState('conflicts'); // 'conflicts' | 'vault'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-neutral-950 border border-amber-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl gold-glow overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center">
                <Database className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Cross-Meeting Memory & Conflict Detection
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-950 text-red-300 border border-red-500/40 animate-pulse">
                  {conflicts.filter(c => c.status === 'UNRESOLVED').length} Active Conflicts
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Autonomous system memory across historical executive syncs & architecture charters
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-neutral-800 bg-neutral-950/60 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('conflicts')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'conflicts'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Detected Conflicts ({conflicts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'vault'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Past Decisions Vault ({PAST_MEETING_DECISIONS.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {activeTab === 'conflicts' ? (
            conflicts.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 space-y-2">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                <p className="text-sm font-semibold text-white">No Policy Contradictions Detected</p>
                <p className="text-xs">All current meeting decisions align with prior decisions stored in system memory.</p>
              </div>
            ) : (
              conflicts.map((conf) => {
                const isUnresolved = conf.status === 'UNRESOLVED';

                return (
                  <div
                    key={conf.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isUnresolved
                        ? 'bg-neutral-900/90 border-red-500/50 red-alert-pulse'
                        : 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    {/* Top Row: Severity & Type */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          conf.severity === 'CRITICAL_CONFLICT'
                            ? 'bg-red-500 text-white'
                            : conf.severity === 'HIGH_CONFLICT'
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : 'bg-yellow-950 text-yellow-300 border border-yellow-500/40'
                        }`}>
                          {conf.severity.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-semibold text-neutral-300">
                          {conf.type}
                        </span>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isUnresolved 
                          ? 'bg-red-900/40 text-red-300 border border-red-600/40' 
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {isUnresolved ? '⚠️ Action Required' : '✓ Resolved / Superseded'}
                      </span>
                    </div>

                    {/* Comparison Grid: Current Decision vs Memory Vault */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {/* Current Meeting Decision */}
                      <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs space-y-1">
                        <div className="text-[10px] uppercase font-bold text-amber-400 flex items-center justify-between">
                          <span>Current Meeting Decision</span>
                          <span className="text-neutral-500">{conf.currentMeetingSpeaker}</span>
                        </div>
                        <p className="font-semibold text-white leading-relaxed">
                          "{conf.currentMeetingDecision}"
                        </p>
                      </div>

                      {/* Past Decision in Memory */}
                      <div className="p-3 rounded-lg bg-neutral-950 border border-red-900/30 text-xs space-y-1">
                        <div className="text-[10px] uppercase font-bold text-red-400 flex items-center justify-between">
                          <span>Earlier Decision in Memory Vault</span>
                          <span className="text-neutral-500">{conf.pastMeetingTitle}</span>
                        </div>
                        <p className="font-semibold text-neutral-300 leading-relaxed">
                          "{conf.pastDecisionText}"
                        </p>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-xs space-y-1.5 mb-3">
                      <div className="font-bold text-red-300 flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-red-400" />
                        <span>Why This Was Flagged:</span>
                      </div>
                      <p className="text-neutral-300 leading-relaxed">
                        {conf.explanation}
                      </p>
                      <div className="pt-1 text-[11px] text-amber-300 font-medium">
                        👉 <strong>Suggested Resolution:</strong> {conf.recommendedAction}
                      </div>
                    </div>

                    {/* Resolution Buttons */}
                    {isUnresolved && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                        <button
                          type="button"
                          onClick={() => onResolveConflict(conf.id, 'OVERRIDE')}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors"
                        >
                          Override Past Policy
                        </button>
                        <button
                          type="button"
                          onClick={() => onResolveConflict(conf.id, 'RATIFY')}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Resolve & Enforce Gate</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-neutral-400">
                Historical executive sync decisions indexed in ExecFlow's persistent memory vault:
              </div>
              {PAST_MEETING_DECISIONS.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs space-y-2 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400">{item.meetingTitle}</span>
                    <span className="text-neutral-500">{item.meetingDate}</span>
                  </div>
                  <p className="font-semibold text-white text-sm">
                    "{item.decision}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
                    <span>Speaker: <strong className="text-neutral-300">{item.speaker}</strong></span>
                    <span className="px-2 py-0.5 rounded bg-neutral-800 font-mono text-[10px] text-amber-300">
                      Zone: {item.impactZone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
          <span>Cross-Meeting Memory Engine v2.4 • Active Vector Lookup</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
}
