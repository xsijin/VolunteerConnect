import { RadarChart } from "@mantine/charts";
import "./Performance.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import { ShareScore } from "../../components/Performance/ShareScore";
import trophy from "@/assets/trophy.png";

function Performance() {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();
  const localStorageScoreId = localStorage.getItem("score");
  const [debrief, setDebrief] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/score/${pathId}`
      );
      const json = await res.json();
      console.log("response: ", json);
      setData([
        {
          skill: "Communication",
          points: json.communication,
        },
        {
          skill: "Creativity",
          points: json.creativity,
        },
        {
          skill: "Empathy",
          points: json.empathy,
        },
        {
          skill: "Active Listening",
          points: json.activelistening,
        },
        {
          skill: "Problem Solving",
          points: json.problemsolving,
        },
      ]);
      setDebrief(json.debrief);
      setLoading(false);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Flex
          style={{
            flexGrow: 1,
          }}
          justify={"space-between"}
          align={"start"}
          direction={"column"}
        >
          {/* Chart */}
          <Box
          // className="chartContainer"
          >
            {/* Performance */}
            <Box mb="xl" ta={"center"} mx="auto">
              <Title ta={"center"}>PEFORMANCE</Title>
              <Box m="auto" w="150px">
                <Image src={trophy} />
              </Box>
              <Box
                bg={"white"}
                p={"xl"}
                style={{
                  borderRadius: "14px",
                  width: "600px",
                  margin: "auto",
                }}
                mt="lg"
              >
                <RadarChart
                  h={300}
                  data={data}
                  dataKey="skill"
                  // withPolarGrid
                  // withPolarAngleAxis
                  // withPolarRadiusAxis
                  series={[{ name: "points", color: "blue.4", opacity: 0.2 }]}
                />
              </Box>

              <Box
                mx="auto"
                mt="xl"
                ta="left"
                fz={"xl"}
                style={{ width: "200px" }}
              >
                {data.map((x, idx) => (
                  <Text fw={"bold"} key={idx} fz={"lg"}>
                    {`${x.skill}: ${x.points}`} / 10
                  </Text>
                ))}
              </Box>
            </Box>

            {/* Summary */}
            <Box style={{ marginTop: "100px" }}>
              <Title ta={"center"}>SUMMARY FEEDBACK</Title>
              <Box
                bg={"white"}
                mt="lg"
                p={"xl"}
                style={{
                  borderRadius: "14px",
                }}
              >
                <Text ta={"left"} fz={"xl"}>
                  {debrief}
                </Text>
              </Box>
            </Box>
          </Box>

          {(localStorageScoreId == pathId || user) && (
            <ShareScore score={pathId} />
          )}
        </Flex>
      )}
    </>
  );
}

export default Performance;
