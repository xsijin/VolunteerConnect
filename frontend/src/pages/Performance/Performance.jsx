import { RadarChart } from "@mantine/charts";
import "./Performance.css";

const data = [
  {
    skill: "Communication Skill",
    points: 70,
  },
  {
    skill: "Creativity",
    points: 60,
  },
  {
    skill: "Creativity",
    points: 60,
  },
  {
    skill: "Problem-Solving Skill",
    points: 90,
  },
];

function Performance() {
  return (
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
  );
}

export default Performance;
