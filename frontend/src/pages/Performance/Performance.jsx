import { RadarChart } from "@mantine/charts";
import "./Performance.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";

import { ShareScore } from "../../components/Performance/ShareScore";

function Performance() {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useOutletContext();
  const localStorageScoreId = localStorage.getItem("score");

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/score/${pathId}`
      );
      const json = await res.json();
      setData([
        {
          skill: "Communication Skill",
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
          skill: "Problem-Solving Skill",
          points: json.problemsolving,
        },
        {
          skill: "Active Listening",
          points: json.activelistening,
        },
      ]);
      setLoading(false);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("data", data);

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
          <div className="chartContainer">
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

            {data.map((x, idx) => (
              <p key={idx}>{`${x.skill}: ${x.points}`}</p>
            ))}
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
          </div>

          {(localStorageScoreId == pathId || user) && (
            <ShareScore score={pathId} />
          )}
        </Flex>
      )}
    </>
  );
}

export default Performance;
