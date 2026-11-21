import React, { useState } from 'react';
import { 
  FileText, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  Sparkles, 
  RotateCcw,
  AlertTriangle,
  Flame,
  ShieldCheck,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/sampleMeetings';

export default function TranscriptIngestion({
  selectedPresetId,
  onSelectPreset,
  transcript,
  setTranscript,
  onRunAgent,
  isProcessing,
  pipelineStage,
  engineMode
}) {
  const currentPreset = SAMPLE_PRESETS.find(p => p.id === selectedPresetId);

  const pipelineStages = [
    { label: 'Extracting Decisions', desc: 'Isolating binding agreements & policies' },
    { label: 'Resolving Owners', desc: 'Detecting ambiguous or unassigned tasks' },
    { label: 'Detecting Blockers', desc: 'Evaluating SLA risks & deadlines' },
    { label: 'Drafting Executions', desc: 'Synthesizing Jira, Slack & Calendar outputs' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 lg:p-5 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
              Transcript Ingestion
            </h2>
            <p className="text-xs text-slate-400">Raw meeting audio transcripts & multi-party dialogue</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
          Col 1 (35%)
        </span>
      </div>

      {/* Preset Selectors */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-0.5">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Sample Presets:
          </span>
          <span className="text-[11px] text-slate-500">Click to switch instant scenario</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            const isSample1 = preset.id === 'product-launch-sync';

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                disabled={isProcessing}
                className={`w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500/80 shadow-md shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500"></div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        isSample1 
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isSample1 ? 'Sample 1 • Product' : 'Sample 2 • Engineering'}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {preset.name}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {isSample1 
                        ? 'Messy conversation: implicit tasks, unassigned blockers, conflicting deadlines.' 
                        : 'Technical post-mortem: PgBouncer DNS failover, drivers, SLA metrics.'}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {preset.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        {preset.participants.length} Speakers
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${
                    isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editable Transcript Textarea */}
      <div className="flex-1 flex flex-col min-h-[220px]">
        <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
          <label htmlFor="transcript-input" className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            Editable Transcript
          </label>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{transcript.split('\n').length} lines</span>
            <span>•</span>
            <span>{transcript.length} chars</span>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col">
          <textarea
            id="transcript-input"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isProcessing}
            placeholder="Paste raw meeting transcript or notes here..."
            className="w-full flex-1 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Primary CTA & Animated Pipeline Indicator */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
        {/* Animated Pipeline Indicator */}
        {isProcessing && (
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2.5 animate-pulse">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-200">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
                Agent Pipeline Active ({engineMode === 'gemini' ? 'Gemini 2.5 Flash' : 'Instant Demo Engine'})
              </span>
              <span className="text-[11px] font-mono text-indigo-300">
                Stage {pipelineStage + 1}/4
              </span>
            </div>

            {/* Stage Pills */}
            <div className="grid grid-cols-4 gap-1">
              {pipelineStages.map((stage, idx) => {
                const isCurrent = idx === pipelineStage;
                const isCompleted = idx < pipelineStage;

                return (
                  <div
                    key={stage.label}
                    className={`h-1.5 rounded-full transition-all ${
                      isCompleted
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-indigo-400 animate-pulse'
                        : 'bg-slate-800'
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-xs text-indigo-300 font-medium">
              👉 {pipelineStages[pipelineStage]?.label}: <span className="text-slate-300 text-[11px]">{pipelineStages[pipelineStage]?.desc}</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          type="button"
          onClick={onRunAgent}
          disabled={isProcessing || !transcript.trim()}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Executing Autonomous Agent...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
              <span>Run Execution Agent -&gt;</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-slate-500">
          Zero-risk sandbox: analyzes transcript, extracts decisions, flags unassigned owners & simulates live integrations.
        </p>
      </div>
    </div>
  );
}

