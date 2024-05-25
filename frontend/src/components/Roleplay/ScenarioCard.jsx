import { Box, Flex, Image, Text, Title, Accordion, List } from "@mantine/core";
/* eslint-disable react/prop-types */
import styles from "@/components/Roleplay/ScenarioCard.module.scss";

export const ScenarioCard = ({ persona }) => {

  // eslint-disable-next-line react/prop-types
  const { name, age, image, background, personality, issues, trainingFocus, language, checkList } =
    persona;

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
      <Image src={image} w="35%" m={"auto"} />
      <Box mt="lg">
        <Title c={"2"} fz={"md"} ta={"center"}>
          {name}
          <br></br>
          {age} Years Old
        </Title>
        <Box mt="md">
          <Accordion variant="filled" defaultValue="currentScenario">
            <Accordion.Item value="currentScenario">
              <Accordion.Control>Information</Accordion.Control>
              <Accordion.Panel>
                <Text size="sm">
                  <strong>Background:</strong>
                  <br></br> {background}
                </Text>
                <Text mt="sm" size="sm">
                  <strong>Personality:</strong>
                  <br></br> {personality}
                </Text>
                <Text mt="sm" size="sm">
                  <strong>Current Issues:</strong>
                  <br></br> {issues}
                </Text>
                <Text mt="sm" size="sm">
                  <strong>Languages spoken:</strong>
                  <br></br> {language.join(", ")}
                </Text>
                <Text mt="sm" size="sm">
                  <strong>Training Focus:</strong>
                  <br></br>
                  {trainingFocus}
                </Text>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="checkList">
              <Accordion.Control>Topics</Accordion.Control>
              <Accordion.Panel>
                <List size="sm">
                  {checkList.map((item, index) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
    </Flex>
  );
};
