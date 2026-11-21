import React from 'react';
import { 
  FileText, 
  Play, 
  Clock, 
  Users, 
  Sparkles, 
  ChevronRight,
  Terminal,
  Volume2,
  ShieldAlert,
  Database
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
  engineMode,
  conflictsCount
}) {
  const currentPreset = SAMPLE_PRESETS.find(p => p.id === selectedPresetId);

  const pipelineStages = [
    { label: 'Attributing Speakers', desc: 'Isolating dialogue & statements per attendee' },
    { label: 'Querying Cross-Meeting Memory', desc: 'Comparing against historical decisions in vault' },
    { label: 'Detecting Conflicts & Blockers', desc: 'Flagging policy contradictions & unassigned owners' },
    { label: 'Synthesizing Trackers & Reminders', desc: 'Drafting Jira, Slack, Calendar & T-24h alerts' }
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md transition-all">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              Transcript Ingestion & Attribution
            </h2>
            <p className="text-xs text-neutral-400">Raw meeting audio transcripts with speaker attribution</p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-amber-400 border border-amber-500/30">
          Section 1
        </span>
      </div>

      {/* Preset Selectors */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs text-neutral-400 px-0.5">
          <span className="font-bold text-neutral-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Sample Scenarios:
          </span>
          <span className="text-[11px] text-neutral-500">Instant test cases</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {SAMPLE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            const isSample1 = preset.id === 'product-launch-sync';

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset.id)}
                disabled={isProcessing}
                className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900/90 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500"></div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full ${
                        isSample1 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                          : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {isSample1 ? 'Sample 1 • Product Sync' : 'Sample 2 • Post-Mortem'}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                        {preset.name}
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 line-clamp-1">
                      {isSample1 
                        ? 'Implicit tasks, unassigned blockers, conflicting deadlines, and cross-meeting SecOps policy conflict.' 
                        : 'Technical incident: Aurora failover, PgBouncer DNS TTL, driver jitter, and 60s charter contradiction.'}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {preset.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-neutral-500" />
                        {preset.participants.length} Attributed Speakers
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 mt-1 transition-transform ${
                    isSelected ? 'text-amber-400 translate-x-0.5' : 'text-neutral-600 group-hover:text-neutral-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speaker Attribution Bar */}
      {currentPreset?.speakerAttribution && (
        <div className="mb-3 p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
          <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1.5 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-amber-400" />
            Detected Speakers in Meeting:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentPreset.speakerAttribution.map((spk, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <strong>{spk.speaker}</strong>
                <span className="text-neutral-500">({spk.role})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Editable Transcript Textarea */}
      <div className="flex-1 flex flex-col min-h-[220px]">
        <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
          <label htmlFor="transcript-input" className="font-bold text-neutral-200 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            Attributed Dialogue Log
          </label>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
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
            placeholder="Paste raw meeting transcript with speaker names..."
            className="w-full flex-1 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Primary CTA & Multi-Stage Agent Pipeline */}
      <div className="mt-4 pt-3.5 border-t border-neutral-800 space-y-3">
        {/* Animated Pipeline Indicator */}
        {isProcessing && (
          <div className="p-4 rounded-xl bg-neutral-900 border border-amber-500/40 space-y-2.5 animate-pulse gold-glow">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Agent Reasoning Pipeline ({engineMode === 'gemini' ? 'Gemini 2.5 Flash' : 'Instant Demo Engine'})
              </span>
              <span className="text-[11px] font-mono text-amber-400">
                Step {pipelineStage + 1}/4
              </span>
            </div>

            {/* Stage Progress Bar */}
            <div className="grid grid-cols-4 gap-1.5">
              {pipelineStages.map((stage, idx) => {
                const isCurrent = idx === pipelineStage;
                const isCompleted = idx < pipelineStage;

                return (
                  <div
                    key={stage.label}
                    className={`h-2 rounded-full transition-all ${
                      isCompleted
                        ? 'bg-amber-400'
                        : isCurrent
                        ? 'bg-yellow-400 animate-pulse'
                        : 'bg-neutral-800'
                    }`}
                  />
                );
              })}
            </div>

            <div className="text-xs text-white font-medium">
              👉 <strong className="text-amber-400">{pipelineStages[pipelineStage]?.label}:</strong>{' '}
              <span className="text-neutral-300 text-[11px]">{pipelineStages[pipelineStage]?.desc}</span>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          type="button"
          onClick={onRunAgent}
          disabled={isProcessing || !transcript.trim()}
          className="w-full py-3.5 px-4 rounded-xl font-black text-sm tracking-wide bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              <span>Extracting & Auditing Decisions...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-black transition-transform group-hover:scale-110" />
              <span>Run Execution Agent -&gt;</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-center text-neutral-500">
          Cross-meeting memory active: automatically flags conflicts with prior meetings.
        </p>
      </div>
    </div>
  );
}
