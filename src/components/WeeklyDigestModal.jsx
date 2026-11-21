import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Send, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  X, 
  Mail,
  UserCheck
} from 'lucide-react';

export default function WeeklyDigestModal({
  isOpen,
  onClose,
  weeklyDigests,
  onSendDigestDM
}) {
  const memberKeys = Object.keys(weeklyDigests || {});
  const [selectedMember, setSelectedMember] = useState(memberKeys[0] || '');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const currentDigest = weeklyDigests?.[selectedMember] || (memberKeys.length > 0 ? weeklyDigests[memberKeys[0]] : null);

  const handleSendDM = () => {
    onSendDigestDM(selectedMember);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-neutral-950 border border-yellow-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-600 p-[1px] flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Weekly Personalized Digest Per Person
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-yellow-950 text-yellow-300 border border-yellow-500/40">
                  Automated Team Sync
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Tailored executive digest of individual commitments, deadlines & cross-meeting conflict warnings
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

        {/* Member Selector Tabs */}
        <div className="flex items-center gap-1.5 p-3 border-b border-neutral-800 bg-neutral-950/80 overflow-x-auto text-xs">
          {memberKeys.map((member) => (
            <button
              key={member}
              type="button"
              onClick={() => {
                setSelectedMember(member);
                setSentSuccess(false);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedMember === member
                  ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {member.split(' ')[0]} ({member.match(/\((.*?)\)/)?.[1] || 'Eng'})
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {currentDigest ? (
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-black text-sm">
                    {currentDigest.member.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{currentDigest.member}</h4>
                    <p className="text-xs text-neutral-400">{currentDigest.role} • <span className="text-amber-400">{currentDigest.focusArea}</span></p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendDM}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                >
                  {sentSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Sent to Slack DM!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Weekly DM</span>
                    </>
                  )}
                </button>
              </div>

              {/* Summary Callout */}
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">Weekly Executive Brief:</strong> {currentDigest.summary}
              </div>

              {/* Conflict Warning if any */}
              {currentDigest.conflictsWarning && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-300">Personalized Conflict Alert: </span>
                    <span>{currentDigest.conflictsWarning}</span>
                  </div>
                </div>
              )}

              {/* Assigned Commitments */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-yellow-400" />
                  Active Commitments This Week ({currentDigest.assignedTasks?.length || 0})
                </div>

                <div className="space-y-2">
                  {currentDigest.assignedTasks?.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                            {task.key}
                          </span>
                          <span className="font-semibold text-white">{task.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-500" />
                            Due: <strong className="text-neutral-200">{task.due}</strong>
                          </span>
                          <span>•</span>
                          <span className="text-amber-300 font-semibold">{task.priority}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-800 text-neutral-300">
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-neutral-500">Select a team member to review their personalized digest.</div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
          <span>Weekly Digest Generator • Automatic Monday 9:00 AM Dispatch</span>
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
