# GDE Chrome Extension - Google Meet Summarizer

## Installation (Development)

1. Go to `chrome://extensions/` in your browser
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `extension/` folder from the GDE project
5. The extension should now appear in your Chrome toolbar

## Features

- **Automatic Meeting Detection**: Detects when you join a Google Meet
- **Live Caption Capture**: Extracts captions from the meeting in real-time
- **Transcript Logging**: Accumulates captions into a transcript
- **Dashboard Integration**: Sends transcripts to your GDE dashboard for AI summarization
- **Clipboard Support**: Copy captured transcripts with one click

## How to Use

### 1. Install the Extension
Follow the installation steps above.

### 2. Join a Google Meet
Go to any Google Meet URL (meet.google.com).

### 3. Open Extension Popup
Click the GDE extension icon in your Chrome toolbar.

### 4. Monitor Capture
- The status will show **🟢 Google Meet Detected** when in a meeting
- Captions will appear in the transcript area
- The **Send to Dashboard** button will enable once captions are captured

### 5. Submit Transcript
- Click **Send to Dashboard** to submit the transcript
- Alternatively, **Open Dashboard** to view all summarized meetings

## Development Notes

### Files Structure

```
extension/
├── manifest.json          # Chrome Extension configuration
├── background.js          # Service worker (meeting detection)
├── content.js             # Content script (caption extraction)
├── popup.html             # Popup UI
├── popup.js               # Popup logic
├── styles.css             # Popup styles
└── icons/                 # Extension icons (16x16, 48x48, 128x128)
```

### Key Components

#### background.js
- Listens for tabs opening meet.google.com
- Manages meeting state (active/inactive)
- Routes messages between content script and popup

#### content.js
- Runs on meet.google.com pages
- Extracts captions from DOM every 5 seconds
- Sends caption updates to background script
- Handles communication with dashboard

#### popup.js
- Displays current meeting status
- Shows captured transcript
- Provides UI for submitting transcripts
- Displays status messages

## Limitations & Known Issues

1. **Caption Accuracy**: Google Meet's caption quality depends on audio clarity
2. **Privacy**: Always inform meeting participants that captions are being captured
3. **Transcript Loss**: If you close the tab before submitting, the transcript is lost
4. **DOM Changes**: If Google Meet updates their DOM structure, caption extraction may break

## Future Enhancements

- [ ] Store transcript history locally
- [ ] Support for multiple simultaneous meetings
- [ ] Background transcript auto-submission
- [ ] Advanced caption filtering and cleaning
- [ ] Integration with Slack/Teams for instant notifications

## Debugging

Open DevTools to see extension logs:
1. Go to `chrome://extensions/`
2. Find "GDE - Google Meet Summarizer"
3. Click "Details"
4. Scroll to "Inspect views"
5. Check console for logs starting with `[GDE]`

## Publishing to Chrome Web Store

To publish this extension:
1. Register as Chrome Web Store Developer ($5)
2. Create privacy policy
3. Prepare 128x128 and 440x440 icons
4. Upload extension package
5. Wait for review (usually 1-3 days)

## Support

For issues or questions, open an issue in the GDE repository.
