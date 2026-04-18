// Background Service Worker for GDE Chrome Extension

console.log('[GDE] Background service worker initialized');

// Track meeting detection state
let meetingState = {
  isActive: false,
  meetingUrl: null,
  tabId: null,
  transcript: ''
};

/**
 * Listen for tab updates to detect Google Meet
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('meet.google.com')) {
    console.log('[GDE] Google Meet detected:', tab.url);

    meetingState.isActive = true;
    meetingState.meetingUrl = tab.url;
    meetingState.tabId = tabId;

    // Inject content script to extract captions
    chrome.tabs.sendMessage(tabId, {
      action: 'startCapture'
    }).catch(err => {
      console.warn('[GDE] Content script not yet ready:', err.message);
    });

    // Notify popup if open
    chrome.runtime.sendMessage({
      type: 'meetingDetected',
      meetingUrl: tab.url
    }).catch(() => {
      // Popup might not be open
    });
  }
});

/**
 * Listen for tab close to clear state
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  if (meetingState.tabId === tabId) {
    console.log('[GDE] Meeting tab closed');
    meetingState = {
      isActive: false,
      meetingUrl: null,
      tabId: null,
      transcript: ''
    };
  }
});

/**
 * Handle messages from content script and popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[GDE] Message received:', request.action);

  switch (request.action) {
    case 'captionUpdate':
      // Received caption data from content script
      meetingState.transcript += ' ' + request.caption;
      console.log('[GDE] Transcript updated, length:', meetingState.transcript.length);
      sendResponse({ success: true });
      break;

    case 'getMeetingState':
      // Popup requesting current meeting state
      sendResponse(meetingState);
      break;

    case 'submitTranscript':
      // Popup submitting transcript to send to dashboard
      const transcript = request.transcript || meetingState.transcript;
      sendResponse({
        success: true,
        message: 'Transcript submitted'
      });

      // Notify dashboard via content script
      if (meetingState.tabId) {
        chrome.tabs.sendMessage(meetingState.tabId, {
          action: 'sendToDashboard',
          transcript: transcript,
          meetingUrl: meetingState.meetingUrl
        }).catch(err => console.error('[GDE] Failed to send to dashboard:', err));
      }

      // Clear state after submission
      meetingState.transcript = '';
      break;

    case 'clearTranscript':
      meetingState.transcript = '';
      sendResponse({ success: true });
      break;

    case 'getTranscript':
      sendResponse({ transcript: meetingState.transcript });
      break;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

/**
 * Extension icon click handler
 */
chrome.action.onClicked.addListener((tab) => {
  if (tab.url?.includes('meet.google.com')) {
    console.log('[GDE] Extension icon clicked on Google Meet');
    // Open popup or perform action
  }
});
