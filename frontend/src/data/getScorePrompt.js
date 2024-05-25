export const getScorePrompt = (messages) => {
  return `Based on the conversation, Score user's volunteer skills with the following criteria:
    1. Communication Skills :[score]
    2. Problem solving skills
    3. Empathy
    6. Creativity
    7. Flexibility
    Return each score by json format like this :
    {
    "CommunicationSkills": 8,
    "Problem-solvingSkills": 7,
    "Empathy": 9,
    ...
    }
    Conversation history: ${messages}
    `;
};
