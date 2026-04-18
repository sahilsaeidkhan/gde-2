const express = require('express');
const { processTranscript, formatSummary } = require('../services/summarizationService');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// In-memory store for MVP (replace with database in production)
let meetings = [];

/**
 * Get all meetings for user
 */
router.get('/', verifyToken, (req, res) => {
  try {
    // Filter by user ID from token
    const userMeetings = meetings.filter(m => m.userId === req.user.sub);
    res.json({
      success: true,
      count: userMeetings.length,
      meetings: userMeetings
    });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});

/**
 * Get specific meeting
 */
router.get('/:id', verifyToken, (req, res) => {
  try {
    const meeting = meetings.find(m => m.id === req.params.id && m.userId === req.user.sub);

    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    res.json(meeting);
  } catch (error) {
    console.error('Error fetching meeting:', error);
    res.status(500).json({ error: 'Failed to fetch meeting' });
  }
});

/**
 * Save new meeting with transcript
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { transcript, meetingTitle, meetingUrl } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    const meetingId = 'meeting-' + Date.now();
    const meeting = {
      id: meetingId,
      userId: req.user.sub,
      transcript,
      meetingTitle: meetingTitle || 'Untitled Meeting',
      meetingUrl: meetingUrl || '',
      summary: null,
      createdAt: new Date().toISOString(),
      summarizedAt: null
    };

    // Try to auto-summarize
    try {
      const summaryResult = await processTranscript(transcript);
      meeting.summary = formatSummary(summaryResult.summary);
      meeting.summarizedAt = new Date().toISOString();
    } catch (summaryError) {
      console.warn('Auto-summarization failed, transcript saved without summary:', summaryError.message);
    }

    meetings.push(meeting);

    res.status(201).json({
      success: true,
      meeting,
      message: meeting.summary ? 'Meeting saved and summarized' : 'Meeting saved (summarization pending)'
    });
  } catch (error) {
    console.error('Error saving meeting:', error);
    res.status(500).json({ error: 'Failed to save meeting' });
  }
});

/**
 * Summarize meeting transcript
 */
router.post('/summarize', verifyToken, async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    console.log('Summarizing transcript...');
    const result = await processTranscript(transcript);

    if (!result.success) {
      return res.status(500).json({ error: 'Failed to summarize transcript' });
    }

    const formattedSummary = formatSummary(result.summary);

    res.json({
      success: true,
      summary: formattedSummary,
      transcriptLength: result.transcriptLength,
      processedAt: result.processedAt
    });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({
      error: 'Failed to summarize meeting',
      details: error.message
    });
  }
});

/**
 * Update meeting summary (after manual edit)
 */
router.put('/:id/summary', verifyToken, async (req, res) => {
  try {
    const { transcript } = req.body;
    const meeting = meetings.find(m => m.id === req.params.id && m.userId === req.user.sub);

    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    const result = await processTranscript(transcript);
    meeting.transcript = transcript;
    meeting.summary = formatSummary(result.summary);
    meeting.summarizedAt = new Date().toISOString();

    res.json({
      success: true,
      meeting,
      message: 'Meeting summary updated'
    });
  } catch (error) {
    console.error('Error updating summary:', error);
    res.status(500).json({ error: 'Failed to update summary' });
  }
});

/**
 * Delete meeting
 */
router.delete('/:id', verifyToken, (req, res) => {
  try {
    const index = meetings.findIndex(m => m.id === req.params.id && m.userId === req.user.sub);

    if (index === -1) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    const deletedMeeting = meetings.splice(index, 1);

    res.json({
      success: true,
      message: 'Meeting deleted',
      deletedId: deletedMeeting[0].id
    });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'Failed to delete meeting' });
  }
});

module.exports = router;
