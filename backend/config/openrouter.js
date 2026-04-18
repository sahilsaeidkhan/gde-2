const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4-turbo';
const OPENROUTER_BASE_URL = 'https://openrouter.io/api/v1/chat/completions';

/**
 * System prompt for meeting summarization
 */
const MEETING_SUMMARY_SYSTEM_PROMPT = `You are a technical project manager assisting with meeting summarization.
Your task is to analyze meeting transcripts and extract:
1. A concise summary (2-3 sentences)
2. Key Achievements (bullet points)
3. Blockers/Issues (bullet points)
4. Next Steps/Action Items (bullet points)
5. Important Updates for HR (if any)

Format your response as valid JSON with this structure:
{
  "summary": "...",
  "achievements": ["...", "..."],
  "blockers": ["..."],
  "nextSteps": ["..."],
  "hrUpdates": ["..."]
}

Be concise and focus on technical and professional content. Ignore small talk and pleasantries.`;

/**
 * Call OpenRouter API to summarize meeting transcript
 */
async function summarizeMeeting(transcript) {
  try {
    if (!transcript || transcript.trim().length === 0) {
      throw new Error('Transcript is empty');
    }

    const response = await axios.post(
      OPENROUTER_BASE_URL,
      {
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content: MEETING_SUMMARY_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Please summarize this meeting transcript:\n\n${transcript}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
          'X-Title': 'GDE - Meeting Summarizer'
        }
      }
    );

    // Parse response
    const content = response.data.choices[0].message.content;

    try {
      const summary = JSON.parse(content);
      return summary;
    } catch (parseError) {
      console.error('Failed to parse LLM response as JSON:', content);
      // If JSON parsing fails, create a structured response from raw text
      return {
        summary: content,
        achievements: [],
        blockers: [],
        nextSteps: [],
        hrUpdates: [],
        rawResponse: true
      };
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response?.data || error.message);
    throw new Error(`Failed to summarize meeting: ${error.message}`);
  }
}

/**
 * Get available models from OpenRouter
 */
async function getAvailableModels() {
  try {
    const response = await axios.get('https://openrouter.io/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error.message);
    throw error;
  }
}

module.exports = {
  summarizeMeeting,
  getAvailableModels,
  OPENROUTER_MODEL,
  MEETING_SUMMARY_SYSTEM_PROMPT
};
