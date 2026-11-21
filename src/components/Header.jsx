import React from 'react';
import { 
  Zap, 
  Sparkles, 
  Cpu, 
  RotateCcw, 
  Key, 
  CheckCircle2, 
  Layers,
  Activity,
  Bot
} from 'lucide-react';

export default function Header({
  engineMode,
  setEngineMode,
  onReset,
  onOpenApiKeyModal,
  apiKey,
  hasEnvApiKey,
  executedCount,
  totalCount,
  isProcessing
}) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                ExecFlow
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Autonomous Meeting-to-Execution Agent
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Turn messy meeting transcripts into binding decisions, assigned tasks & live integrations
            </p>
          </div>
        </div>

        {/* Engine Toggle & Actions */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Progress Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">Execution:</span>
            <span className="font-semibold text-emerald-400">{executedCount}</span>
            <span className="text-slate-500">/</span>
            <span className="font-semibold text-slate-200">{totalCount}</span>
          </div>

          {/* Engine Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setEngineMode('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                engineMode === 'demo'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="Instant zero-config simulated AI execution"
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                engineMode === 'gemini'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="Execute live analysis with Google Gemini 2.5 Flash"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Live Gemini AI</span>
              {(apiKey || hasEnvApiKey) && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              )}
            </button>
          </div>

          {/* API Key Config Button */}
          <button
            type="button"
            onClick={onOpenApiKeyModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">API Key</span>
            {(apiKey || hasEnvApiKey) && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>

          {/* Reset Workspace */}
          <button
            type="button"
            onClick={onReset}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/60 text-slate-300 hover:text-rose-200 text-xs font-medium transition-all disabled:opacity-50"
            title="Reset Workspace to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Workspace</span>
          </button>
        </div>
      </div>
    </header>
  );
}

