import React from 'react';
import { 
  Zap, 
  Sparkles, 
  Cpu, 
  RotateCcw, 
  Key, 
  CheckCircle2, 
  Activity,
  Bot,
  Database,
  Users,
  Bell,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function Header({
  engineMode,
  setEngineMode,
  onReset,
  onOpenApiKeyModal,
  onOpenMemoryModal,
  onOpenWeeklyDigestModal,
  onOpenRemindersModal,
  onOpenConfirmationGate,
  conflictsCount,
  apiKey,
  hasEnvApiKey,
  executedCount,
  totalCount,
  isProcessing
}) {
  return (
    <header className="border-b border-neutral-800/90 bg-neutral-950/90 backdrop-blur-lg sticky top-0 z-30 px-4 lg:px-7 py-3 transition-all">
      <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[1.5px] shadow-lg shadow-amber-500/25">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-neutral-950"></div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-amber-200">
                  ExecFlow
                </span>
                <span className="px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Autonomous Meeting-to-Execution Agent
                </span>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:block">
                Ingestion • Speaker Attribution • Cross-Meeting Memory • Conflict Detection • Trackers & Reminders
              </p>
            </div>
          </div>

          {/* Quick Progress on Mobile */}
          <div className="xl:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs">
            <span className="text-amber-400 font-bold">{executedCount}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-white font-bold">{totalCount}</span>
          </div>
        </div>

        {/* System Capabilities Action Bar */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-2.5 justify-center">
          {/* Cross-Meeting Memory Vault Button */}
          <button
            type="button"
            onClick={onOpenMemoryModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 hover:border-amber-500/60 text-white text-xs font-semibold transition-all shadow-sm relative group cursor-pointer"
            title="Inspect historical decisions and detect cross-meeting conflicts"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Memory & Conflicts</span>
            {conflictsCount > 0 ? (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse">
                {conflictsCount}
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>

          {/* Weekly Digest Per Person */}
          <button
            type="button"
            onClick={onOpenWeeklyDigestModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-yellow-500/40 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            title="View individualized weekly digests for team members"
          >
            <Users className="w-3.5 h-3.5 text-yellow-400" />
            <span>Weekly Digests</span>
          </button>

          {/* Deadline Reminders Timeline */}
          <button
            type="button"
            onClick={onOpenRemindersModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            title="Inspect multi-stage pre-deadline reminder rules"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Reminders</span>
          </button>

          {/* Confirmation Gate Button */}
          <button
            type="button"
            onClick={onOpenConfirmationGate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 hover:border-red-500/70 text-red-200 hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="Review mandatory confirmation step before live posting"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Confirmation Gate</span>
          </button>

          {/* Engine Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
            <button
              type="button"
              onClick={() => setEngineMode('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                engineMode === 'demo'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Instant Demo Mode</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEngineMode('gemini');
                if (!apiKey && !hasEnvApiKey) {
                  onOpenApiKeyModal();
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                engineMode === 'gemini'
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Live Gemini AI</span>
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white text-xs transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-4 h-4 text-amber-400" />
          </button>

          {/* Reset Workspace */}
          <button
            type="button"
            onClick={onReset}
            disabled={isProcessing}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-white text-xs transition-colors disabled:opacity-40"
            title="Reset Workspace"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
