// Content Script for Google Meet - runs on meet.google.com

console.log('[GDE] Content script loaded on Google Meet');

let captureActive = false;
let captionBuffer = '';

/**
 * Extract captions from Google Meet DOM
 * Google Meet stores captions in various DOM elements depending on the UI version
 */
function extractCaptions() {
  try {
    // Method 1: Look for caption container (most common)
    const captionElements = document.querySelectorAll('[data-is-caption-on="true"] span, .caption-text, [role="textbox"][aria-label*="caption"]');

    if (captionElements.length > 0) {
      const captions = Array.from(captionElements)
        .map(el => el.textContent)
        .filter(text => text && text.trim().length > 0)
        .join(' ');

      return captions;
    }

    // Method 2: Look for participant names and messages
    const messages = document.querySelectorAll('[data-message-id], [role="log"] div');
    if (messages.length > 0) {
      const text = Array.from(messages)
        .map(el => el.textContent)
        .filter(text => text && text.trim().length > 0)
        .slice(0, 50) // Get recent messages
        .join(' ');

      return text;
    }

    return '';
  } catch (error) {
    console.error('[GDE] Error extracting captions:', error);
    return '';
  }
}

/**
 * Start capturing captions at regular intervals
 */
function startCapture() {
  if (captureActive) return;

  captureActive = true;
  console.log('[GDE] Starting caption capture');

  // Capture captions every 5 seconds
  const captureInterval = setInterval(() => {
    try {
      const newCaptions = extractCaptions();

      if (newCaptions && newCaptions !== captionBuffer) {
        captionBuffer = newCaptions;

        // Send to background script
        chrome.runtime.sendMessage({
          action: 'captionUpdate',
          caption: newCaptions
        }).catch(err => {
          console.warn('[GDE] Failed to send caption update:', err.message);
        });
      }
    } catch (error) {
      console.error('[GDE] Capture error:', error);
      clearInterval(captureInterval);
      captureActive = false;
    }
  }, 5000);

  // Store interval ID for cleanup
  window.gdeCaptureInterval = captureInterval;
}

/**
 * Stop capturing captions
 */
function stopCapture() {
  if (window.gdeCaptureInterval) {
    clearInterval(window.gdeCaptureInterval);
    captureActive = false;
    console.log('[GDE] Stopped caption capture');
  }
}

/**
 * Send transcript to dashboard (via injected script)
 */
function sendToDashboard(transcript, meetingUrl) {
  console.log('[GDE] Sending transcript to dashboard');

  // Create message to send to dashboard
  window.postMessage({
    type: 'meetingTranscript',
    transcript: transcript,
    meetingUrl: meetingUrl,
    timestamp: new Date().toISOString()
  }, '*');
}

/**
 * Handle messages from background script
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[GDE] Content script message:', request.action);

  switch (request.action) {
    case 'startCapture':
      startCapture();
      sendResponse({ success: true });
      break;

    case 'stopCapture':
      stopCapture();
      sendResponse({ success: true });
      break;

    case 'getTranscript':
      sendResponse({ transcript: captionBuffer });
      break;

    case 'sendToDashboard':
      sendToDashboard(request.transcript, request.meetingUrl);
      sendResponse({ success: true });
      break;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// Auto-start capture when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startCapture);
} else {
  startCapture();
}

// Clean up on page unload
window.addEventListener('beforeunload', stopCapture);

console.log('[GDE] Content script ready');
