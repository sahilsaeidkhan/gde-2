// Popup script for GDE Chrome Extension

const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const meetingInfo = document.getElementById('meetingInfo');
const meetingUrl = document.getElementById('meetingUrl');
const transcriptArea = document.getElementById('transcriptArea');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const openDashboardBtn = document.getElementById('openDashboardBtn');
const statusMessage = document.getElementById('statusMessage');

/**
 * Update UI based on meeting state
 */
function updateMeetingStatus() {
  chrome.runtime.sendMessage({ action: 'getMeetingState' }, (response) => {
    if (!response) return;

    const { isActive, meetingUrl: url, transcript } = response;

    if (isActive && url) {
      // Meeting is active
      statusIndicator.className = 'status-indicator status-active';
      statusText.textContent = '🟢 Google Meet Detected';
      meetingInfo.style.display = 'block';
      document.getElementById('meetingUrl').textContent = url;
      submitBtn.disabled = transcript.length === 0;
      transcriptArea.value = transcript;
    } else {
      // No active meeting
      statusIndicator.className = 'status-indicator status-idle';
      statusText.textContent = '⚫ Waiting for Google Meet...';
      meetingInfo.style.display = 'none';
      submitBtn.disabled = true;
      transcriptArea.value = '';
    }
  });
}

/**
 * Copy transcript to clipboard
 */
copyBtn.addEventListener('click', () => {
  const text = transcriptArea.value;
  if (!text) {
    showMessage('No transcript to copy', 'error');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showMessage('✅ Transcript copied to clipboard', 'success');
  }).catch(err => {
    showMessage('❌ Failed to copy', 'error');
  });
});

/**
 * Clear transcript
 */
clearBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'clearTranscript' }, () => {
    transcriptArea.value = '';
    submitBtn.disabled = true;
    showMessage('Transcript cleared', 'info');
  });
});

/**
 * Submit transcript to dashboard
 */
submitBtn.addEventListener('click', async () => {
  const transcript = transcriptArea.value;

  if (!transcript || transcript.length === 0) {
    showMessage('No transcript to submit', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '⏳ Sending...';

  try {
    // Send to background script
    chrome.runtime.sendMessage(
      {
        action: 'submitTranscript',
        transcript: transcript
      },
      (response) => {
        if (response.success) {
          showMessage('✅ Transcript sent to dashboard!', 'success');
          transcriptArea.value = '';
          submitBtn.disabled = true;
          submitBtn.textContent = '📤 Send to Dashboard';
        }
      }
    );
  } catch (error) {
    console.error('Error submitting transcript:', error);
    showMessage('❌ Failed to send transcript', 'error');
    submitBtn.textContent = '📤 Send to Dashboard';
    submitBtn.disabled = false;
  }
});

/**
 * Open dashboard in new tab
 */
openDashboardBtn.addEventListener('click', () => {
  const dashboardUrl = 'http://localhost:3000/meetings';
  chrome.tabs.create({ url: dashboardUrl });
});

/**
 * Show status message
 */
function showMessage(message, type = 'info') {
  statusMessage.textContent = message;
  statusMessage.className = `status-message status-${type}`;

  // Auto-clear after 4 seconds
  setTimeout(() => {
    statusMessage.textContent = '';
  }, 4000);
}

/**
 * Periodically update meeting status
 */
setInterval(updateMeetingStatus, 1000);

// Initial status update
updateMeetingStatus();

console.log('[GDE] Popup script loaded');
