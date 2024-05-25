import {
  Avatar,
  Box,
  Button,
  Flex,
  Paper,
  Text,
  Textarea,
} from "@mantine/core";
import { useRef, useEffect, useState } from "react";
import { useChat } from "ai/react";
import mv from "@/assets/mv.png";
import { ScenarioCard } from "../../components/Roleplay/ScenarioCard";
import styles from "@/components/Parts/Button/Button.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { personaData } from "../../data/personas";
import useHandleEnd from "../../hooks/useHandleEnd";

export const Roleplay = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const persona = personaData.find((p) => p.id == pathId);
  const { getScore } = useHandleEnd();
  const url = import.meta.env.VITE_AISDK_BASEURL;
  // const url = "https://langchain-api-sage.vercel.app/api/langchain";
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: url,
    body: {
      persona: persona,
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const chatParent = useRef(null);
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEnd = async (e) => {
    e.preventDefault();
    const score = await getScore(messages);
    setScore(score);
    console.log("SCORE: ", score);

    const url = import.meta.env.VITE_API_BASEURL;
    const res = await fetch(`${url}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        communication: score.communication,
        creativity: score.creativity,
        empathy: score.empathy,
        activelistening: score.activelistening,
        problemsolving: score.problemsolving,
        debrief: score.debrief,
        persona: persona.id,
      }),
    });

    const data = await res.json();
    localStorage.setItem("score", data._id);
    navigate(`/performance/${data._id}`);
  };

  return (
    <Flex
      style={{
        flexGrow: 1,
      }}
      justify={"space-between"}
      // w="800px"
      align={"start"}
    >
      <ScenarioCard persona={persona} />
      <Box w="55%">
        {messages.length === 0 && (
          <Text ta={"center"} fw={"bold"} fz={"xl"}>
            Start your conversation with<br></br> {persona.name}!
          </Text>
        )}
        <Flex direction={"column"}>
          {messages.map((m, index) => (
            <Box key={index}>
              {m.role !== "user" ? (
                <Box key={m.id} mt={"md"}>
                  <Flex align={"flex-end"}>
                    <Flex align={"center"}>
                      <Avatar
                        target="_blank"
                        alt="it's me"
                        mr={"sm"}
                        src={mv}
                      />
                      <Paper
                        bg={"white"}
                        p={"lg"}
                        radius={"md"}
                        variant="light"
                      >
                        {m.content}
                      </Paper>
                    </Flex>
                  </Flex>
                </Box>
              ) : (
                <Box key={m.id} mt={"md"}>
                  <Flex align={"flex-end"} justify={"end"}>
                    <Paper bg={"yellow.6"} p={"lg"} radius={"md"} c="white">
                      {m.content}
                    </Paper>
                  </Flex>
                </Box>
              )}
            </Box>
          ))}
        </Flex>

        <Box mt="lg">
          <form onSubmit={handleSubmit}>
            <Flex direction={"column"}>
              <Textarea
                type="text"
                size="md"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                resize="vertical"
                minRows={2}
                placeholder={
                  messages.length === 0
                    ? `Hi ${persona.name}, how are you doing today?`
                    : ""
                }
              />
            </Flex>
          </form>
        </Box>

        {messages.length > 5 && (
          <Box mt="lg">
            <form onSubmit={handleEnd}>
              <Button
                type="submit"
                mt="md"
                fullWidth
                className={styles.button}
                size={"lg"}
              >
                END CONVERSATION
              </Button>
            </form>
          </Box>
        )}

        {score && (
          <Box mt="lg">
            <Text ta={"center"}>
              Communication Skill:{score.CommunicationSkills}
            </Text>
            <Text ta={"center"}>Creativity:{score.Creativity}</Text>
            <Text ta={"center"}>Empathy:{score.Empathy}</Text>
            <Text ta={"center"}>
              Problem solving Skill:{score.CommunicationSkills}
            </Text>
            <Text ta={"center"}>Active Listening:{score.ActiveListening}</Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
