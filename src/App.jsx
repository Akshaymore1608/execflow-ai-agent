import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TranscriptIngestion from './components/TranscriptIngestion';
import ActionItemsQueue from './components/ActionItemsQueue';
import ExecutionSimulator from './components/ExecutionSimulator';
import ApiKeyModal from './components/ApiKeyModal';
import { SAMPLE_PRESETS } from './data/sampleMeetings';
import { extractWithGemini } from './services/geminiService';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  const initialPreset = SAMPLE_PRESETS[0];

  const [selectedPresetId, setSelectedPresetId] = useState(initialPreset.id);
  const [transcript, setTranscript] = useState(initialPreset.transcript);
  const [engineMode, setEngineMode] = useState('demo'); // 'demo' | 'gemini'
  
  // Execution state
  const [actionItems, setActionItems] = useState(initialPreset.extractedData.actionItems);
  const [decisions, setDecisions] = useState(initialPreset.extractedData.decisions);
  const [blockers, setBlockers] = useState(initialPreset.extractedData.blockers);
  const [slackDigest, setSlackDigest] = useState(initialPreset.extractedData.slackDigest);
  const [calendarFollowUp, setCalendarFollowUp] = useState(initialPreset.extractedData.calendarFollowUp);

  // Pipeline animation
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);

  // Live execution logs
  const [executionLogs, setExecutionLogs] = useState([
    { time: '10:00:12', message: 'Workspace initialized. Ready for agent ingestion.', type: 'system' }
  ]);

  // API Key management
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('execflow_gemini_key') || envApiKey);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setExecutionLogs(prev => [
      { time, message, type },
      ...prev.slice(0, 19)
    ]);
  };

  // Switching Presets
  const handleSelectPreset = (presetId) => {
    setSelectedPresetId(presetId);
    const target = SAMPLE_PRESETS.find(p => p.id === presetId);
    if (target) {
      setTranscript(target.transcript);
      setActionItems(target.extractedData.actionItems);
      setDecisions(target.extractedData.decisions);
      setBlockers(target.extractedData.blockers);
      setSlackDigest(target.extractedData.slackDigest);
      setCalendarFollowUp(target.extractedData.calendarFollowUp);
      addLog(`Loaded preset: "${target.name}"`, 'system');
      showToast(`Loaded ${target.name}`);
    }
  };

  // Running Execution Agent Pipeline
  const handleRunAgent = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    setPipelineStage(0);
    addLog('Agent pipeline started: Ingesting raw transcript...', 'system');

    // Simulate multi-stage visual pipeline
    const stageInterval = setInterval(() => {
      setPipelineStage(prev => {
        if (prev < 3) {
          const next = prev + 1;
          const stageNames = ['Extracting Decisions', 'Resolving Owners', 'Detecting Blockers', 'Drafting Executions'];
          addLog(`Pipeline Stage ${next + 1}/4: ${stageNames[next]}...`, 'agent');
          return next;
        }
        return prev;
      });
    }, 450);

    try {
      const activeKey = apiKey || envApiKey;
      let resultData;

      if (engineMode === 'gemini' && activeKey) {
        addLog('Connecting to Google Gemini 2.5 Flash...', 'agent');
        resultData = await extractWithGemini(transcript, activeKey);
      } else {
        // Instant Demo Simulation Mode
        // Check if matching preset or fallback synthesis
        const matchingPreset = SAMPLE_PRESETS.find(p => p.id === selectedPresetId);
        await new Promise(r => setTimeout(r, 1900));

        if (matchingPreset && transcript.trim() === matchingPreset.transcript.trim()) {
          resultData = matchingPreset.extractedData;
        } else {
          // Dynamic simulation for custom transcript in Demo mode
          resultData = {
            actionItems: [
              {
                id: `act-gen-${Date.now()}-1`,
                title: 'Review action items with cross-functional leadership team',
                contextQuote: transcript.slice(0, 120) + '...',
                owner: 'Sarah (Product Lead)',
                isUnassigned: false,
                priority: 'P0 Urgent',
                dueDate: 'Tomorrow, 5:00 PM',
                targetTool: 'Jira Ticket',
                toolKey: 'EXEC-201',
                toolDetails: 'Project: EXECFLOW | Component: Review',
                status: 'pending',
                jiraTicket: {
                  key: 'EXEC-201',
                  summary: 'Review meeting action items with leadership',
                  assignee: 'Sarah (Product Lead)',
                  priority: 'Highest (P0)',
                  issueType: 'Task',
                  status: 'BACKLOG',
                  description: 'Synthesized from meeting transcript.'
                }
              },
              {
                id: `act-gen-${Date.now()}-2`,
                title: 'Prepare compliance and architectural risk specification',
                contextQuote: 'Needs owner to volunteer before final release cutoff.',
                owner: 'Unassigned — Needs Owner',
                isUnassigned: true,
                priority: 'P0 Urgent',
                dueDate: 'Wednesday, 2:00 PM',
                targetTool: 'Notion Spec',
                toolKey: 'SPEC-909',
                toolDetails: 'Space: Platform Architecture',
                status: 'pending',
                jiraTicket: {
                  key: 'SPEC-909',
                  summary: 'Compliance & Risk Architecture Specification',
                  assignee: 'Unassigned',
                  priority: 'Highest (P0)',
                  issueType: 'Task',
                  status: 'BACKLOG',
                  description: 'Critical compliance item needing ownership triage.'
                }
              },
              {
                id: `act-gen-${Date.now()}-3`,
                title: 'Send meeting execution digest to team channel',
                contextQuote: 'Keep everyone updated so no one is blocked.',
                owner: 'Priya (Frontend Eng)',
                isUnassigned: false,
                priority: 'P1 High',
                dueDate: 'Today, 6:00 PM',
                targetTool: 'Slack Update',
                toolKey: 'SLACK-PUB',
                toolDetails: 'Channel: #product-launch',
                status: 'pending',
                jiraTicket: {
                  key: 'EXEC-202',
                  summary: 'Distribute summary digest across company Slack',
                  assignee: 'Priya (Frontend Eng)',
                  priority: 'High (P1)',
                  issueType: 'Task',
                  status: 'TO DO',
                  description: 'Broadcast binding decisions and next steps to stakeholders.'
                }
              }
            ],
            decisions: [
              {
                id: 'dec-gen-1',
                decision: 'Agreed on rapid iterative rollout schedule',
                rationale: 'Derived from consensus during team discussion.',
                binding: true
              }
            ],
            blockers: [
              {
                id: 'blk-gen-1',
                blocker: 'Unassigned owner for architecture risk specification',
                severity: 'Critical (Blocker)',
                impact: 'Blocker for scheduled release window.',
                suggestedOwner: 'Dave or Priya'
              }
            ],
            slackDigest: {
              channel: '#product-launch',
              channelId: 'C099182',
              title: '🚀 Executive Action Plan & Decisions',
              summary: 'Agent successfully parsed custom transcript and synthesized 3 core action items.',
              urgentBlockerAlert: '⚠️ ACTION REQUIRED: 1 item flagged as unassigned.',
              sections: [
                {
                  title: '🎯 Action Commitments',
                  items: [
                    '• @Sarah: Review action items with leadership by Tomorrow 5:00 PM',
                    '• @Priya: Send team digest by Today 6:00 PM',
                    '• ⚠️ UNASSIGNED: Compliance & risk specification due Wednesday 2:00 PM'
                  ]
                }
              ]
            },
            calendarFollowUp: {
              title: 'Follow-Up Action Items & Readiness Sync',
              suggestedTime: 'Friday, 3:30 PM - 4:00 PM EST',
              duration: '30 mins',
              room: 'https://meet.google.com/exf-sync-room',
              attendees: [
                { name: 'Sarah (Product Lead)', email: 'sarah@company.com', status: 'Organizer' },
                { name: 'Priya (Frontend Eng)', email: 'priya@company.com', status: 'Required' }
              ],
              agenda: [
                '1. Verify task completion status',
                '2. Confirm assigned owner for compliance spec',
                '3. Rollout go/no-go check'
              ]
            }
          };
        }
      }

      clearInterval(stageInterval);
      setPipelineStage(3);

      setActionItems(resultData.actionItems || []);
      setDecisions(resultData.decisions || []);
      setBlockers(resultData.blockers || []);
      setSlackDigest(resultData.slackDigest || null);
      setCalendarFollowUp(resultData.calendarFollowUp || null);

      const unassignedCount = (resultData.actionItems || []).filter(
        i => i.owner?.toLowerCase().includes('unassigned') || i.isUnassigned
      ).length;

      addLog(`Extraction complete: ${resultData.actionItems?.length || 0} action items, ${unassignedCount} unassigned blockers flagged.`, 'system');
      showToast(`Agent pipeline complete (${resultData.actionItems?.length || 0} tasks extracted)`);
    } catch (err) {
      clearInterval(stageInterval);
      console.error(err);
      addLog(`Extraction error: ${err.message}`, 'error');
      showToast(err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Toggle single action item approval status
  const handleToggleStatus = (id) => {
    setActionItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'executed' ? 'pending' : 'executed';
        const confirmationId = `req_${Math.random().toString(36).substring(2, 8)}`;
        
        if (nextStatus === 'executed') {
          addLog(`[${confirmationId}] Dispatched ${item.targetTool} for "${item.title.substring(0, 32)}..." (${item.owner})`, 'jira');
          showToast(`Approved & Executed: ${item.toolKey || item.title}`);
        } else {
          addLog(`Reverted "${item.title.substring(0, 30)}..." back to pending queue.`, 'system');
        }

        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // Approve & Execute All
  const handleApproveAll = () => {
    const unapproved = actionItems.filter(i => i.status === 'pending');
    if (unapproved.length === 0) return;

    setActionItems(prev => prev.map(item => ({
      ...item,
      status: 'executed'
    })));

    const batchId = `batch_${Math.random().toString(36).substring(2, 7)}`;
    addLog(`[${batchId}] Executed all ${unapproved.length} pending items across Jira, Slack, & Calendar!`, 'slack');
    showToast(`Approved & executed all ${unapproved.length} items!`);
  };

  // Human-in-the-Loop: Reassign Owner
  const handleUpdateOwner = (id, newOwner) => {
    const isUnassigned = newOwner.toLowerCase().includes('unassigned');
    setActionItems(prev => prev.map(item => {
      if (item.id === id) {
        addLog(`Updated owner for "${item.toolKey || 'item'}": ${newOwner}`, 'system');
        return {
          ...item,
          owner: newOwner,
          isUnassigned,
          jiraTicket: item.jiraTicket ? {
            ...item.jiraTicket,
            assignee: newOwner
          } : undefined
        };
      }
      return item;
    }));
    showToast(`Reassigned to ${newOwner}`);
  };

  // Add Custom Action Item
  const handleAddItem = (newItem) => {
    setActionItems(prev => [newItem, ...prev]);
    addLog(`Manual action item added: "${newItem.title}"`, 'system');
    showToast(`Added action item: ${newItem.title}`);
  };

  // Reset Workspace
  const handleReset = () => {
    const target = SAMPLE_PRESETS.find(p => p.id === selectedPresetId) || initialPreset;
    setTranscript(target.transcript);
    // Reset all items to pending status
    const resetItems = target.extractedData.actionItems.map(item => ({
      ...item,
      status: 'pending'
    }));
    setActionItems(resetItems);
    setDecisions(target.extractedData.decisions);
    setBlockers(target.extractedData.blockers);
    setSlackDigest(target.extractedData.slackDigest);
    setCalendarFollowUp(target.extractedData.calendarFollowUp);
    setExecutionLogs([
      { time: new Date().toLocaleTimeString('en-US', { hour12: false }), message: 'Workspace reset to clean review state.', type: 'system' }
    ]);
    showToast('Workspace reset to initial state');
  };

  // Save / Clear API Key
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('execflow_gemini_key', key);
      addLog('Gemini API Key configured and stored in browser.', 'system');
    } else {
      localStorage.removeItem('execflow_gemini_key');
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('execflow_gemini_key');
    setEngineMode('demo');
    addLog('API key removed. Switched to Instant Demo Mode.', 'system');
    showToast('API Key removed');
  };

  const executedCount = actionItems.filter(i => i.status === 'executed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Header */}
      <Header
        engineMode={engineMode}
        setEngineMode={setEngineMode}
        onReset={handleReset}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        apiKey={apiKey}
        hasEnvApiKey={Boolean(envApiKey)}
        executedCount={executedCount}
        totalCount={actionItems.length}
        isProcessing={isProcessing}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-2.5 rounded-xl shadow-2xl border text-xs font-semibold flex items-center gap-2 ${
            toastMessage.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Main 3-Column SaaS Grid */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
          {/* Left Column (35% width -> 4.2 cols approx, represented cleanly as 4 or 4/12) */}
          <div className="lg:col-span-4 flex flex-col min-h-[500px]">
            <TranscriptIngestion
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              transcript={transcript}
              setTranscript={setTranscript}
              onRunAgent={handleRunAgent}
              isProcessing={isProcessing}
              pipelineStage={pipelineStage}
              engineMode={engineMode}
            />
          </div>

          {/* Middle Column (35% width -> 4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[500px]">
            <ActionItemsQueue
              actionItems={actionItems}
              onToggleStatus={handleToggleStatus}
              onApproveAll={handleApproveAll}
              onUpdateOwner={handleUpdateOwner}
              onAddItem={handleAddItem}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right Column (30% width -> 4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[500px]">
            <ExecutionSimulator
              actionItems={actionItems}
              decisions={decisions}
              blockers={blockers}
              slackDigest={slackDigest}
              calendarFollowUp={calendarFollowUp}
              executionLogs={executionLogs}
            />
          </div>
        </div>
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        onClearApiKey={handleClearApiKey}
        hasEnvApiKey={Boolean(envApiKey)}
      />
    </div>
  );
}
