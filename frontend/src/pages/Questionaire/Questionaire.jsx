import { Space, Box, Button, Flex, Image, Text, Title } from "@mantine/core";
import mv from "@/assets/mv.png";
import { Link } from "react-router-dom";
import styles from "@/components/Parts/Button/Button.module.scss";

const Questionaire = () => {
  return (
    <Flex
      align={"center"}
      gap={"xl"}
      justify={"space-between"}
      style={{ flexGrow: 1 }}
    >
      {/* <Box w={"40%"}>
        <Image src={mv} />
      </Box> */}
      <Box>
        <Title
          order={1}
          style={{
            fontSize: "70px",
          }}
        >
          INSTRUCTIONS
        </Title>

        <Space h={20} />

        <Text fz="xl" fs={"italic"}>
          Welcome to VolunteerConnect! In this expeience, you will get a taste
          of what volunteering with the elderly is like. Click “Start Roleplay”
          to begin engaging with our virtual elderly character, using the chat
          interface to communicate with empathy and patience. Work towards the
          scenarios objectives, then end the session and review the feedback to
          see your strengths and areas for improvement.<br></br>
          <br></br>At the end of the experience, please share any volunteering
          experiences you have had. These experiences will help us generate
          realistic scenarios that will assist other new volunteers!
        </Text>
        <Box ta={"center"} mt="xl">
          <Button
            component={Link}
            to="/scenarios"
            className={styles.button}
            size="lg"
          >
            START
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Questionaire;
