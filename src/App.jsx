import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TranscriptIngestion from './components/TranscriptIngestion';
import ActionItemsQueue from './components/ActionItemsQueue';
import ExecutionSimulator from './components/ExecutionSimulator';
import ApiKeyModal from './components/ApiKeyModal';
import CrossMeetingMemoryModal from './components/CrossMeetingMemoryModal';
import WeeklyDigestModal from './components/WeeklyDigestModal';
import ConfirmationGateModal from './components/ConfirmationGateModal';
import RemindersScheduleModal from './components/RemindersScheduleModal';
import { SAMPLE_PRESETS } from './data/sampleMeetings';
import { PRESET_CONFLICTS } from './data/crossMeetingMemory';
import { extractWithGemini } from './services/geminiService';
import { Sparkles, AlertCircle, CheckCircle2, Database, ShieldAlert } from 'lucide-react';

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
  const [weeklyDigests, setWeeklyDigests] = useState(initialPreset.extractedData.weeklyDigests || {});
  
  // Cross-Meeting Memory Conflicts state
  const [conflicts, setConflicts] = useState(PRESET_CONFLICTS[initialPreset.id] || []);

  // Modals state
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showWeeklyDigestModal, setShowWeeklyDigestModal] = useState(false);
  const [showConfirmationGate, setShowConfirmationGate] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);

  // Pipeline animation
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStage, setPipelineStage] = useState(0);

  // Live execution logs
  const [executionLogs, setExecutionLogs] = useState([
    { time: '10:00:12', message: 'ExecFlow Memory Engine online. 4 historical decisions indexed in vault.', type: 'system' }
  ]);

  // API Key management
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('execflow_gemini_key') || envApiKey);

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
      ...prev.slice(0, 24)
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
      setWeeklyDigests(target.extractedData.weeklyDigests || {});
      setConflicts(PRESET_CONFLICTS[presetId] || []);
      
      addLog(`Loaded scenario: "${target.name}" with speaker attribution.`, 'system');
      const conflictCount = (PRESET_CONFLICTS[presetId] || []).filter(c => c.status === 'UNRESOLVED').length;
      if (conflictCount > 0) {
        addLog(`🚨 Cross-Meeting Memory Alert: ${conflictCount} policy conflict(s) detected with prior meetings!`, 'conflict');
      }
      showToast(`Loaded ${target.name}`);
    }
  };

  // Running Execution Agent Pipeline
  const handleRunAgent = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    setPipelineStage(0);
    addLog('Agent pipeline initialized: parsing transcript and speaker attributions...', 'system');

    // Simulate multi-stage visual pipeline
    const stageInterval = setInterval(() => {
      setPipelineStage(prev => {
        if (prev < 3) {
          const next = prev + 1;
          const stageNames = [
            'Attributing Speakers', 
            'Querying Cross-Meeting Memory', 
            'Detecting Conflicts & Blockers', 
            'Synthesizing Trackers & Reminders'
          ];
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
        addLog('Calling Google Gemini 2.5 Flash for autonomous reasoning...', 'agent');
        resultData = await extractWithGemini(transcript, activeKey);
      } else {
        // Instant Demo Simulation Mode
        const matchingPreset = SAMPLE_PRESETS.find(p => p.id === selectedPresetId);
        await new Promise(r => setTimeout(r, 1800));

        if (matchingPreset && transcript.trim() === matchingPreset.transcript.trim()) {
          resultData = matchingPreset.extractedData;
        } else {
          // Fallback synthesis for custom transcript
          resultData = matchingPreset ? matchingPreset.extractedData : initialPreset.extractedData;
        }
      }

      clearInterval(stageInterval);
      setPipelineStage(3);

      setActionItems(resultData.actionItems || []);
      setDecisions(resultData.decisions || []);
      setBlockers(resultData.blockers || []);
      setSlackDigest(resultData.slackDigest || null);
      setCalendarFollowUp(resultData.calendarFollowUp || null);
      if (resultData.weeklyDigests) {
        setWeeklyDigests(resultData.weeklyDigests);
      }

      const activeConf = (PRESET_CONFLICTS[selectedPresetId] || []).filter(c => c.status === 'UNRESOLVED');
      if (activeConf.length > 0) {
        addLog(`🚨 Conflict Engine: Found ${activeConf.length} contradiction(s) against historical meeting decisions in memory!`, 'conflict');
      }

      addLog(`Extraction complete: ${resultData.actionItems?.length || 0} tasks structured with deadline reminders.`, 'system');
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
          showToast(`Approved & Dispatched: ${item.toolKey || item.title}`);
        } else {
          addLog(`Reverted "${item.title.substring(0, 30)}..." back to pending review queue.`, 'system');
        }

        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // Confirmation Gate: Broadcast All Items
  const handleFinalBroadcast = () => {
    const unapproved = actionItems.filter(i => i.status === 'pending');
    setActionItems(prev => prev.map(item => ({
      ...item,
      status: 'executed'
    })));

    const batchId = `exec_gate_${Math.random().toString(36).substring(2, 7)}`;
    addLog(`[${batchId}] Confirmation Gate Passed: Dispatched all ${unapproved.length || actionItems.length} items to Jira, Slack & Calendar!`, 'slack');
    showToast(`Successfully confirmed and posted all items!`);
  };

  // Resolve Cross-Meeting Conflict
  const handleResolveConflict = (conflictId, action) => {
    setConflicts(prev => prev.map(c => {
      if (c.id === conflictId) {
        const nextStatus = action === 'OVERRIDE' ? 'RESOLVED_OVERRIDDEN' : 'RESOLVED_ENFORCED';
        addLog(`Cross-Meeting Conflict [${conflictId}] resolved via ${action}: Gate updated.`, 'system');
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast(`Conflict resolved (${action})`);
  };

  // Send Weekly Digest DM
  const handleSendDigestDM = (memberName) => {
    addLog(`Weekly executive digest dispatched to Slack DM for @${memberName}`, 'slack');
    showToast(`Weekly digest sent to @${memberName}`);
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
    const resetItems = target.extractedData.actionItems.map(item => ({
      ...item,
      status: 'pending'
    }));
    setActionItems(resetItems);
    setDecisions(target.extractedData.decisions);
    setBlockers(target.extractedData.blockers);
    setSlackDigest(target.extractedData.slackDigest);
    setCalendarFollowUp(target.extractedData.calendarFollowUp);
    setConflicts(PRESET_CONFLICTS[selectedPresetId] || []);
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
  const activeConflictsCount = conflicts.filter(c => c.status === 'UNRESOLVED').length;

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header
        engineMode={engineMode}
        setEngineMode={setEngineMode}
        onReset={handleReset}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        onOpenMemoryModal={() => setShowMemoryModal(true)}
        onOpenWeeklyDigestModal={() => setShowWeeklyDigestModal(true)}
        onOpenRemindersModal={() => setShowRemindersModal(true)}
        onOpenConfirmationGate={() => setShowConfirmationGate(true)}
        conflictsCount={activeConflictsCount}
        apiKey={apiKey}
        hasEnvApiKey={Boolean(envApiKey)}
        executedCount={executedCount}
        totalCount={actionItems.length}
        isProcessing={isProcessing}
      />

      {/* Cross-Meeting Memory Warning Banner if unresolved conflicts exist */}
      {activeConflictsCount > 0 && (
        <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-amber-950/80 border-b border-red-500/40 px-4 py-2.5 text-xs">
          <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-red-200">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-bold text-white">Cross-Meeting Memory Warning:</span>
              <span>
                {activeConflictsCount} decision(s) in this transcript contradict binding historical policies stored in memory!
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowMemoryModal(true)}
              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Review Conflicts & Resolve</span>
            </button>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-2.5 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'error'
              ? 'bg-red-950 text-red-200 border-red-500/70'
              : 'bg-neutral-900 text-amber-300 border-amber-500/50'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
            )}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Main 3-Column Clean & Spacious Grid */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
          {/* Section 1: Transcript Ingestion (35% -> 4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[520px]">
            <TranscriptIngestion
              selectedPresetId={selectedPresetId}
              onSelectPreset={handleSelectPreset}
              transcript={transcript}
              setTranscript={setTranscript}
              onRunAgent={handleRunAgent}
              isProcessing={isProcessing}
              pipelineStage={pipelineStage}
              engineMode={engineMode}
              conflictsCount={activeConflictsCount}
            />
          </div>

          {/* Section 2: Action Items & Approval Queue (35% -> 4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[520px]">
            <ActionItemsQueue
              actionItems={actionItems}
              onToggleStatus={handleToggleStatus}
              onApproveAll={() => setShowConfirmationGate(true)}
              onUpdateOwner={handleUpdateOwner}
              onAddItem={handleAddItem}
              onOpenConfirmationGate={() => setShowConfirmationGate(true)}
              isProcessing={isProcessing}
            />
          </div>

          {/* Section 3: Live Execution Integrations (30% -> 4 cols) */}
          <div className="lg:col-span-4 flex flex-col min-h-[520px]">
            <ExecutionSimulator
              actionItems={actionItems}
              decisions={decisions}
              blockers={blockers}
              slackDigest={slackDigest}
              calendarFollowUp={calendarFollowUp}
              conflicts={conflicts}
              executionLogs={executionLogs}
              onOpenMemoryModal={() => setShowMemoryModal(true)}
              onOpenConfirmationGate={() => setShowConfirmationGate(true)}
            />
          </div>
        </div>
      </main>

      {/* Modals for Cross-Meeting Memory, Weekly Digests, Reminders & Confirmation */}
      <CrossMeetingMemoryModal
        isOpen={showMemoryModal}
        onClose={() => setShowMemoryModal(false)}
        conflicts={conflicts}
        onResolveConflict={handleResolveConflict}
      />

      <WeeklyDigestModal
        isOpen={showWeeklyDigestModal}
        onClose={() => setShowWeeklyDigestModal(false)}
        weeklyDigests={weeklyDigests}
        onSendDigestDM={handleSendDigestDM}
      />

      <ConfirmationGateModal
        isOpen={showConfirmationGate}
        onClose={() => setShowConfirmationGate(false)}
        actionItems={actionItems}
        conflicts={conflicts}
        onFinalBroadcast={handleFinalBroadcast}
      />

      <RemindersScheduleModal
        isOpen={showRemindersModal}
        onClose={() => setShowRemindersModal(false)}
        actionItems={actionItems}
      />

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
