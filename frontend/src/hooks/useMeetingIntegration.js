import { useEffect, useState } from 'react';

/**
 * Hook to handle messages from Chrome Extension
 * Listens for meeting detection and transcript data
 */
export const useMeetingIntegration = () => {
  const [meetingDetected, setMeetingDetected] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Listen for messages from the extension via content script
    const handleMessage = (event) => {
      // Only accept messages from same origin
      if (event.source !== window) return;

      // Listen for meeting transcripts
      if (event.data.type === 'meetingTranscript') {
        console.log('[GDE Dashboard] Received transcript from extension');
        setTranscript(event.data.transcript);
        setMeetingUrl(event.data.meetingUrl);
        setMeetingDetected(true);
      }
    };

    window.addEventListener('message', handleMessage);
    setIsListening(true);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const clearTranscript = () => {
    setTranscript('');
    setMeetingUrl('');
    setMeetingDetected(false);
  };

  return {
    meetingDetected,
    transcript,
    meetingUrl,
    isListening,
    clearTranscript,
    setTranscript
  };
};
