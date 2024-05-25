import { Box, Button, Flex, Image, Text, Title } from "@mantine/core";
import mv from "@/assets/mv.png";
import { Link } from "react-router-dom";
import styles from "@/components/Parts/Button/Button.module.scss";

const Home = () => {
  return (
    <Flex
      align={"center"}
      gap={"xl"}
      justify={"space-between"}
      style={{ flexGrow: 1 }}
    >
      <Box w={"40%"}>
        <Image src={mv} />
      </Box>
      <Box>
        <Title
          order={1}
          style={{
            fontSize: "70px",
          }}
        >
          VOLUNTEER<br></br>CONNECT
        </Title>
        <Text fz="xl" fs={"italic"}>
          A roleplay experience for volunteers<br></br>seeking to learn from
          experience
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

export default Home;
