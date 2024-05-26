import "@/pages/Performance/Performance.css";
// import { useEffect, useState } from "react";
import { Badge, Box, Button, Flex, Image, Table, Title } from "@mantine/core";
// import { getToken } from "../../util/security";
import { Link, useNavigate } from "react-router-dom";
// import mv from "@/assets/mv.png";
import badge from "@/assets/badge.png";
import trophy from "@/assets/trophy.png";
import buttonstyles from "@/components/Parts/Button/Button.module.scss";
import styles from "@/components/Profile/Profile.module.scss";
import { useHover } from "@mantine/hooks";

function Profile() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [scoreId, setScoreId] = useState(null);
  // const { user } = useOutletContext();
  const navigate = useNavigate();
  const { hovered, ref } = useHover();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //     return;
  //   }
  //   const getData = async () => {
  //     const options = {
  //       method: "GET",
  //     };
  //     const token = getToken();
  //     if (token) {
  //       options.headers = options.headers || {};
  //       options.headers.Authorization = `Bearer ${token}`;
  //     }

  //     const res = await fetch(
  //       `${import.meta.env.VITE_API_BASEURL}/score/`,
  //       options
  //     );
  //     const json = await res.json();
  //     const firstOne = json[0];
  //     setScoreId(firstOne._id);
  //     setData([
  //       {
  //         skill: "Communication Skill",
  //         points: firstOne.communication,
  //       },
  //       {
  //         skill: "Creativity",
  //         points: firstOne.creativity,
  //       },
  //       {
  //         skill: "Empathy",
  //         points: firstOne.empathy,
  //       },
  //       {
  //         skill: "Problem-Solving Skill",
  //         points: firstOne.problemsolving,
  //       },
  //     ]);
  //     setLoading(false);
  //   };
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const elements = [
    {
      id: "6651de69d74249005171ee99",
      date: "25/05/2024",
      score1: 5,
      score2: 6,
      score3: 7,
      score4: 8,
      score5: 5,
    },
    {
      id: "6651de69d74249005171ee99",
      date: "25/05/2024",
      score1: 5,
      score2: 6,
      score3: 7,
      score4: 8,
      score5: 5,
    },
    {
      id: 3,
      date: "25/05/2024",
      score1: 5,
      score2: 6,
      score3: 7,
      score4: 8,
      score5: 5,
    },
    {
      id: "6651de69d74249005171ee99",
      date: "25/05/2024",
      score1: 5,
      score2: 6,
      score3: 7,
      score4: 8,
      score5: 5,
    },
  ];

  const rows = elements.map((element) => (
    <Table.Tr
      onClick={() => navigate(`/performance/${element.id}`)}
      key={element.id}
    >
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.score1}</Table.Td>
      <Table.Td>{element.score2}</Table.Td>
      <Table.Td>{element.score3}</Table.Td>
      <Table.Td>{element.score4}</Table.Td>
      <Table.Td>{element.score5}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Flex
        style={{
          flexGrow: 1,
        }}
        justify={"space-between"}
        align={"start"}
        direction={"column"}
      >
        <Box>
          <Title order={1}>ACHIVEMENT</Title>
          <Flex align={"center"} justify={"center"} gap="xl" mt="xl">
            <Box className={styles.badge}>
              <Image src={badge} w={"100px"} h={"100px"} />
              <Badge color="yellow" className={styles.icon}>
                X3
              </Badge>
            </Box>
            <Box className={styles.badge}>
              <Image src={badge} w={"100px"} h={"100px"} />
              <Badge color="yellow" className={styles.icon}>
                X5
              </Badge>
            </Box>
            <Box className={styles.badge}>
              <Image src={trophy} w={"100px"} h={"100px"} />
              <Badge color="yellow" className={styles.icon}>
                X1
              </Badge>
            </Box>
          </Flex>
        </Box>
        <Box mt="xl" w="100%">
          <Title order={1}>HISTORY</Title>
          <Table mt="xl" verticalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Communication</Table.Th>
                <Table.Th>Creativity</Table.Th>
                <Table.Th>Empathy</Table.Th>
                <Table.Th>Active Listening</Table.Th>
                <Table.Th>Problem Solving</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody ref={ref} style={hovered ? { cursor: "pointer" } : {}}>
              {rows}
            </Table.Tbody>
          </Table>
        </Box>

        <Box ta={"center"} mx={"auto"} mt="xl">
          <Button
            size="lg"
            className={buttonstyles.button}
            component={Link}
            to="/scenarios"
          >
            Take New Roleplay
          </Button>
        </Box>

        {/* <div className="chartContainer">
            <p className="chartTitle">Performance Chart</p>
            <RadarChart
              className="chart"
              h={300}
              data={data}
              dataKey="skill"
              // withPolarGrid
              // withPolarAngleAxis
              // withPolarRadiusAxis
              series={[{ name: "points", color: "blue.4", opacity: 0.2 }]}
            />
            <div className="summary">
              <div>Summary Feedback</div>
              <div>Areas of Improvement</div>
              <ul>
                <li>More sympathy</li>
                <li>More empathy</li>
              </ul>
              <div>What Went Well</div>
              <ul>
                <li>Good reaction</li>
                <li>Active listening</li>
              </ul>
            </div>
          </div> */}

        {/* <ShareScore score={scoreId} /> */}
      </Flex>
    </>
  );
}

export default Profile;
