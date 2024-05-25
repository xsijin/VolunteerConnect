import "@/pages/Performance/Performance.css";
// import { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Table, Title } from "@mantine/core";
// import { getToken } from "../../util/security";
import { Link, useNavigate } from "react-router-dom";
import mv from "@/assets/mv.png";
import styles from "@/components/Parts/Button/Button.module.scss";

function Profile() {
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [scoreId, setScoreId] = useState(null);
  // const { user } = useOutletContext();
  const navigate = useNavigate();

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
    { date: "25/05/2024", score1: 5, score2: 6, score3: 7, score4: 8 },
    { date: "25/05/2024", score1: 5, score2: 6, score3: 7, score4: 8 },
    { date: "25/05/2024", score1: 5, score2: 6, score3: 7, score4: 8 },
    { date: "25/05/2024", score1: 5, score2: 6, score3: 7, score4: 8 },
    { date: "25/05/2024", score1: 5, score2: 6, score3: 7, score4: 8 },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.name} onClick={() => navigate("/")}>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.score1}</Table.Td>
      <Table.Td>{element.score2}</Table.Td>
      <Table.Td>{element.score3}</Table.Td>
      <Table.Td>{element.score4}</Table.Td>
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
            <Box>
              <Image src={mv} w={"100px"} h={"100px"} />
            </Box>
            <Box>
              <Image src={mv} w={"100px"} h={"100px"} />
            </Box>
            <Box>
              <Image src={mv} w={"100px"} h={"100px"} />
            </Box>
          </Flex>
        </Box>
        <Box mt="xl" w="100%">
          <Title order={1}>HISTORY</Title>
          <Table mt="xl" highlightOnHover={true}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date taken</Table.Th>
                <Table.Th>Communication</Table.Th>
                <Table.Th>Creativity</Table.Th>
                <Table.Th>Empathy</Table.Th>
                <Table.Th>Problem Solving</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Box>

        <Box ta={"center"} mx={"auto"} mt="xl">
          <Button
            size="lg"
            className={styles.button}
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
