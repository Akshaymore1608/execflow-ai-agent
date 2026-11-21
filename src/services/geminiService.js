// ExecFlow Gemini 2.5 Flash Service

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function extractWithGemini(transcript, apiKey) {
  if (!apiKey) {
    throw new Error('Gemini API Key is not configured. Please enter your API key or switch to Instant Demo Mode.');
  }

  const prompt = `You are ExecFlow, an elite Autonomous Meeting-to-Execution Agent for high-velocity software engineering and product teams.
Analyze this raw meeting transcript with extreme precision. Extract:
1. Structured actionable items with context quotes, assigned owners (or flag as "Unassigned — Needs Owner" if ambiguous, unowned, or pending volunteer), urgency priority (P0 Urgent, P1 High, P2 Normal), deadline, and target tool (Jira Ticket, Slack Update, Calendar Invite, Notion Spec).
2. Key binding decisions made during the sync.
3. Unresolved risks or blockers (especially unassigned critical tasks).
4. A concise, formatted Slack executive digest.
5. An auto-scheduled calendar follow-up sync if a follow-up meeting or milestone was mentioned.

Return ONLY a valid JSON object matching this exact schema:
{
  "actionItems": [
    {
      "id": "act-1",
      "title": "Clear, imperative action item title",
      "contextQuote": "Speaker: Exact verbatim quote from transcript",
      "owner": "Owner Name or 'Unassigned — Needs Owner'",
      "isUnassigned": true or false,
      "priority": "P0 Urgent" | "P1 High" | "P2 Normal",
      "dueDate": "Extracted deadline or 'Next Sprint'",
      "targetTool": "Jira Ticket" | "Slack Update" | "Calendar Invite" | "Notion Spec",
      "toolKey": "PROJ-101",
      "toolDetails": "Short context on project or component",
      "jiraTicket": {
        "key": "PROJ-101",
        "summary": "Short ticket summary",
        "assignee": "Owner or Unassigned",
        "priority": "Highest (P0)" | "High (P1)" | "Medium (P2)",
        "issueType": "Bug Fix" | "Task" | "Story",
        "status": "BACKLOG" | "IN PROGRESS" | "READY FOR DEV",
        "description": "2-3 sentence technical description"
      }
    }
  ],
  "decisions": [
    {
      "id": "dec-1",
      "decision": "Clear binding decision",
      "rationale": "Why this was decided",
      "binding": true
    }
  ],
  "blockers": [
    {
      "id": "blk-1",
      "blocker": "Specific blocker or unassigned risk",
      "severity": "Critical (Blocker)" | "High" | "Medium",
      "impact": "Direct operational or legal impact",
      "suggestedOwner": "Recommended person or team"
    }
  ],
  "slackDigest": {
    "channel": "#general-execution",
    "channelId": "C01A99X",
    "title": "Executive Meeting Digest",
    "summary": "1-2 sentence executive overview",
    "urgentBlockerAlert": "Alert text or empty if none",
    "sections": [
      {
        "title": "Decisions & Highlights",
        "items": ["• item 1", "• item 2"]
      },
      {
        "title": "Commitments & Deadlines",
        "items": ["• @Name: task by deadline"]
      }
    ]
  },
  "calendarFollowUp": {
    "title": "Meeting Title",
    "suggestedTime": "Day, Time EST",
    "duration": "30 mins",
    "room": "https://meet.google.com/exf-sync-room",
    "attendees": [
      { "name": "Name", "email": "email@company.com", "status": "Required" }
    ],
    "agenda": [
      "1. First agenda topic",
      "2. Second agenda topic"
    ]
  }
}

Transcript:
${transcript}`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let parsedMsg = `Gemini API Error (${response.status})`;
    try {
      const errJson = JSON.parse(errorBody);
      if (errJson.error && errJson.error.message) {
        parsedMsg = errJson.error.message;
      }
    } catch {
      parsedMsg = errorBody || parsedMsg;
    }
    throw new Error(parsedMsg);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('No content returned from Gemini 2.5 Flash.');
  }

  try {
    const parsed = JSON.parse(textOutput);
    // Ensure IDs and fields exist
    if (parsed.actionItems) {
      parsed.actionItems = parsed.actionItems.map((item, index) => ({
        ...item,
        id: item.id || `act-custom-${index + 1}`,
        status: item.status || 'pending',
        isUnassigned: item.owner?.toLowerCase().includes('unassigned') || item.isUnassigned || false,
        jiraTicket: item.jiraTicket || {
          key: item.toolKey || `EXEC-${100 + index}`,
          summary: item.title,
          assignee: item.owner,
          priority: item.priority === 'P0 Urgent' ? 'Highest (P0)' : item.priority === 'P1 High' ? 'High (P1)' : 'Medium (P2)',
          issueType: 'Task',
          status: 'BACKLOG',
          description: `Extracted from meeting sync: "${item.contextQuote || ''}"`
        }
      }));
    }
    return parsed;
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', textOutput, err);
    throw new Error('Gemini response could not be parsed into valid JSON. Please try again.');
  }
}

