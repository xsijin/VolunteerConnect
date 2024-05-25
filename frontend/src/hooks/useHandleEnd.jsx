import { getScorePrompt } from "../data/getScorePrompt";

function useHandleEnd() {
  const getScore = async (messages) => {
    const content = getScorePrompt(messages);
    const token = import.meta.env.VITE_OPENAPI_TOKEN;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: content }],
      }),
    });

    const data = await res.json();
    const score = data.choices[0].message.content;

    const skillsObject = JSON.parse(score);

    return skillsObject;
  };

  return {
    getScore,
  };
}

export default useHandleEnd;
