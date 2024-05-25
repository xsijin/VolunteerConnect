export const getScorePrompt = (messages) => {
  return `Based on the following conversation history, score the user's volunteer skills using the given criteria. Each criterion should be scored from 1 to 10. If all the answers are the same, give a low score like 1 for all the criteria.

  Criteria:
  1. Communication Skills
  2. Problem-Solving Skills
  3. Empathy
  4. Creativity
  5. Active Listening
  
  Return the scores in JSON format.
  
  Conversation history: ${messages}
  `;
};
