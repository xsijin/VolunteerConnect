import { RadarChart } from "@mantine/charts";
import "./Performance.css";

const data = [
  {
    skill: "Communication Skills",
    points: 120,
  },
  {
    skill: "Empathy and Compassion",
    points: 98,
  },
  {
    skill: "Active Listening",
    points: 86,
  },
  {
    skill: "Reliability and Consistency",
    points: 99,
  },
  {
    skill: "Problem-Solving and Adaptability",
    points: 85,
  },
  {
    skill: "Respect and Sensitivity",
    points: 65,
  },
];

function Performance() {
  return (
    <div className="chartContainer">
      <p>Performance Chart</p>
      <RadarChart
        h={300}
        data={data}
        dataKey="skill"
        withPolarGrid
        withPolarAngleAxis
        withPolarRadiusAxis
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
