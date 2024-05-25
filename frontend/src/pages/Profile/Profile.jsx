import { RadarChart } from "@mantine/charts";
import "@/pages/Performance/Performance.css";
import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { ShareScore } from "@/components/Performance/ShareScore";
import { getToken } from "../../util/security";
import { useNavigate, useOutletContext } from "react-router-dom";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scoreId, setScoreId] = useState(null);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    const getData = async () => {
      const options = {
        method: "GET",
      };
      const token = getToken();
      if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/score/`,
        options
      );
      const json = await res.json();
      const firstOne = json[0];
      setScoreId(firstOne._id);
      setData([
        {
          skill: "Communication Skill",
          points: firstOne.communication,
        },
        {
          skill: "Creativity",
          points: firstOne.creativity,
        },
        {
          skill: "Empathy",
          points: firstOne.empathy,
        },
        {
          skill: "Problem-Solving Skill",
          points: firstOne.problemsolving,
        },
      ]);
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

          <ShareScore score={scoreId} />
        </Flex>
      )}
    </>
  );
}

export default Profile;