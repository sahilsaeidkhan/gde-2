const { summarizeMeeting } = require('../config/openrouter');

/**
 * Process and summarize a meeting transcript
 */
async function processTranscript(transcript) {
  try {
    // Validate transcript
    if (!transcript || typeof transcript !== 'string') {
      throw new Error('Invalid transcript provided');
    }

    const trimmedTranscript = transcript.trim();
    if (trimmedTranscript.length < 10) {
      throw new Error('Transcript is too short to summarize');
    }

    console.log(`Processing transcript of length: ${trimmedTranscript.length} characters`);

    // Call LLM to summarize
    const summary = await summarizeMeeting(trimmedTranscript);

    return {
      success: true,
      summary: summary,
      transcriptLength: trimmedTranscript.length,
      processedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error processing transcript:', error);
    throw error;
  }
}

/**
 * Extract action items from summary
 */
function extractActionItems(summary) {
  const actionItems = [];

  if (summary.nextSteps && Array.isArray(summary.nextSteps)) {
    actionItems.push(...summary.nextSteps.map(step => ({
      type: 'action',
      content: step,
      priority: 'normal'
    })));
  }

  if (summary.blockers && Array.isArray(summary.blockers)) {
    actionItems.push(...summary.blockers.map(blocker => ({
      type: 'blocker',
      content: blocker,
      priority: 'high'
    })));
  }

  return actionItems;
}

/**
 * Format summary for display
 */
function formatSummary(summary) {
  return {
    summary: summary.summary || 'No summary available',
    achievements: Array.isArray(summary.achievements) ? summary.achievements : [],
    blockers: Array.isArray(summary.blockers) ? summary.blockers : [],
    nextSteps: Array.isArray(summary.nextSteps) ? summary.nextSteps : [],
    hrUpdates: Array.isArray(summary.hrUpdates) ? summary.hrUpdates : [],
    actionItems: extractActionItems(summary)
  };
}

module.exports = {
  processTranscript,
  extractActionItems,
  formatSummary
};
