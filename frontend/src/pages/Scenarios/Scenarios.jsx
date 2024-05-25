import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  Text,
  Title,
  Card,
} from "@mantine/core";
import { useState } from "react";
import { personaData } from "../../data/personas";
import { useDisclosure } from "@mantine/hooks";
import styles from "@/components/Parts/Button/Button.module.scss";
import { Link } from "react-router-dom";

const Scenarios = () => {
  const [selectedElderly, setSelectedElderly] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex
      direction={"column"}
      style={{
        flexGrow: 1,
        marginBottom: "50px",
      }}
    >
      <Box ta={"center"}>
        <Title c={"2"}>Who would you like to engage today?</Title>
      </Box>
      <Flex mt="xl" align={"center"} justify={"space-between"}>
        {personaData.map((elderly) => (
          <Box
            key={elderly.id}
            w={"15%"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              open();
              setSelectedElderly(elderly);
            }}
          >
            <Card shadow="md" padding="xs" w={150} h={300}>
              <Card.Section>
                <Image src={elderly.image} h={160} alt={elderly.name} />
              </Card.Section>

              <Text fw={500} size="xs" mt="md">
                {elderly.name}
              </Text>

              <Text mt="xs" c="dimmed" size="xs">
                {elderly.issues}
              </Text>
            </Card>
          </Box>
        ))}
      </Flex>

      {/* Modal */}
      {selectedElderly && (
        <Modal
          opened={opened}
          onClose={() => {
            close();
            setSelectedElderly(null);
          }}
          size={"lg"}
        >
          <Box pb={"lg"}>
            <Image src={selectedElderly.image} w="30%" m={"auto"} />
            <Box mt="lg">
              <Title c={"2"} fz={"xl"} ta={"center"}>
                {selectedElderly?.name}, {selectedElderly?.age} Years Old
              </Title>
              <Box mt="md">
                <Text>
                  <strong>Background:</strong>
                  <br></br> {selectedElderly?.background}
                </Text>
                <Text mt="sm">
                  <strong>Personality:</strong>
                  <br></br> {selectedElderly?.personality}
                </Text>
                <Text mt="sm">
                  <strong>Current Issues:</strong>
                  <br></br> {selectedElderly?.issues}
                </Text>
                {/* <Text mt="sm">
                  <strong>Training Focus:</strong>
                  <br></br>
                  {selectedElderly?.trainingFocus}
                </Text> */}
              </Box>
            </Box>

            <Flex align={"center"} justify={"center"} gap="md" mt="lg">
              <Button
                className={styles.button}
                size="lg"
                onClick={() => {
                  close();
                  setSelectedElderly(null);
                }}
              >
                CANCEL
              </Button>
              <Button
                className={styles.button}
                size="lg"
                component={Link}
                to={`/roleplay/${selectedElderly.id}`}
              >
                START
              </Button>
            </Flex>
          </Box>
        </Modal>
      )}
    </Flex>
  );
};

export default Scenarios;
