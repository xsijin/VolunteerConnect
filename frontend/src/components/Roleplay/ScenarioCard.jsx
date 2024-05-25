/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import styles from "@/components/Roleplay/ScenarioCard.module.scss";

export const ScenarioCard = ({ persona }) => {
  const {
    name,
    age,
    image,
    background,
    personality,
    issues,
    trainingFocus,
    language,
  } = persona;
  return (
    <Flex
      w="40%"
      maw="40%"
      direction={"column"}
      gap="sm"
      className={styles.card}
      bg={"white"}
      style={{
        alignSelf: "start",
      }}
    >
      <Image src={image} w="30%" m={"auto"} />
      <Box mt="lg">
        <Title c={"2"} fz={"xl"} ta={"center"}>
          {name}
          <br></br>
          {age} Years Old
        </Title>
        <Box mt="md">
          <Text>
            <strong>Background:</strong>
            <br></br> {background}
          </Text>
          <Text mt="sm">
            <strong>Personality:</strong>
            <br></br> {personality}
          </Text>
          <Text mt="sm">
            <strong>Current Issues:</strong>
            <br></br> {issues}
          </Text>
          <Text mt="sm">
            <strong>Training Focus:</strong>
            <br></br>
            {trainingFocus}
          </Text>
          <Text mt="sm">
            <strong>Language:</strong>
            <br></br>
            {language.join(", ")}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
