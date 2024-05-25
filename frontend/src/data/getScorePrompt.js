export const getScorePrompt = (messages) => {
  return `Based on the following conversation history, score the user's volunteer skills using the given criteria.
  Each criteria should be scored from 1 to 10.
  If all the answers are the same, give a low score like 1 for all the criteria.

  Criteria:
  1. Communication Skills
  2. Problem Solving Skills
  3. Empathy
  4. Creativity
  5. Active Listening

  Also give the debrief like below example:
  "In this roleplay scenario, you effectively demonstrated patience, empathy, and clear instructions while assisting Mrs. Smith with her new smartphone. You provided positive reinforcement, which helped build her confidence. However, you occasionally moved too quickly through the steps, and incorporating more visual aids could enhance understanding. Handling moments of frustration by offering breaks would also improve the experience. Reflecting on your successful guidance, addressing challenges with better pacing and visual aids, and developing strategies for managing frustration will help you improve future interactions. Overall, your performance was commendable, with key areas for further enhancement."

  Return the scores in JSON format with the following attributes and values in the specific type:
    {
       communication: number,
      creativity: number,
      empathy : number,
      activelistening: number,
      problemsolving: number,
      debrief : string
    }

  Conversation history: ${messages}
`;
};
