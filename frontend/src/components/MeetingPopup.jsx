import { useState, useEffect } from 'react';
import styles from '../styles/popup.module.css';

/**
 * Meeting popup component displayed when a meeting is detected
 */
export function MeetingPopup({
  transcript,
  meetingUrl,
  onClose,
  onSubmit,
  isLoading = false
}) {
  const [editedTranscript, setEditedTranscript] = useState(transcript);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditedTranscript(transcript);
  }, [transcript]);

  const handleSummarize = async () => {
    if (!editedTranscript.trim()) {
      setError('Transcript is empty. Captions may not have been captured yet.');
      return;
    }

    setIsSummarizing(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/meetings/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ transcript: editedTranscript })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error('Summarization error:', err);
      setError(`Failed to summarize: ${err.message}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSubmit = async () => {
    if (!summary) {
      setError('Please summarize the meeting first');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          transcript: editedTranscript,
          meetingTitle: `Meeting at ${new Date().toLocaleTimeString()}`,
          meetingUrl: meetingUrl
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save meeting');
      }

      const data = await response.json();
      console.log('Meeting saved:', data);

      // Clear popup
      onClose();
      onSubmit?.(data.meeting);
    } catch (err) {
      console.error('Submit error:', err);
      setError(`Failed to save: ${err.message}`);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2>📹 Google Meet Detected</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {meetingUrl && (
          <div className={styles.meetingInfo}>
            <strong>Meeting URL:</strong>
            <p>{meetingUrl}</p>
          </div>
        )}

        <div className={styles.transcriptSection}>
          <label htmlFor="transcript">
            <strong>Meeting Transcript:</strong>
          </label>
          <textarea
            id="transcript"
            className={styles.textarea}
            value={editedTranscript}
            onChange={(e) => {
              setEditedTranscript(e.target.value);
              setError('');
            }}
            placeholder="Edit the transcript if needed..."
            rows={8}
          />
          <small className={styles.hint}>
            {editedTranscript.length} characters captured
          </small>
        </div>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        {summary && (
          <div className={styles.summarySection}>
            <h3>✨ Summary</h3>
            <p>{summary.summary}</p>

            {summary.achievements && summary.achievements.length > 0 && (
              <>
                <h4>🎯 Key Achievements</h4>
                <ul>
                  {summary.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {summary.blockers && summary.blockers.length > 0 && (
              <>
                <h4>⚠️ Blockers</h4>
                <ul>
                  {summary.blockers.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {summary.nextSteps && summary.nextSteps.length > 0 && (
              <>
                <h4>📝 Next Steps</h4>
                <ul>
                  {summary.nextSteps.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={styles.btnSecondary}
            onClick={handleSummarize}
            disabled={isSummarizing || !editedTranscript.trim()}
          >
            {isSummarizing ? '⏳ Summarizing...' : '✨ Summarize & Extract Actions'}
          </button>

          {summary && (
            <button
              className={styles.btnPrimary}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? '⏳ Saving...' : '💾 Save Meeting'}
            </button>
          )}

          <button
            className={styles.btnSecondary}
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingPopup;
