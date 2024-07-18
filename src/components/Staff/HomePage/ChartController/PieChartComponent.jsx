import axios from "axios";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

const COLORS = [
  "#82ca9d",
  "#8884d8",
  "#ffc658",
  "#ff7f50",
  "#a6dcef",
  "#b4aee8",
  "#ffbb78",
  "#8dd1e1",
  "#ff9896",
  "#98df8a",
];

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function PieChartComponent() {
  const [, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://zodiacjewerlyswd.azurewebsites.net/api/orders/sales-by-item"
        );
        const apiData = response.data.data;

        // Convert API data into Recharts-compatible format
        const formattedData = Object.keys(apiData).map((key) => ({
          name: key,
          value: apiData[key],
        }));

        setData(formattedData);

        // Sort data and select top N items, group the rest into "Others"
        const sortedData = formattedData.sort((a, b) => b.value - a.value);
        const topItems = sortedData.slice(0, 10); // top 10 items
        const otherItems = sortedData
          .slice(10)
          .reduce((acc, item) => acc + item.value, 0);

        if (otherItems > 0) {
          topItems.push({ name: "Others", value: otherItems });
        }

        setDisplayData(topItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
            label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
          >
            {displayData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              marginTop: "20px",
            }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default PieChartComponent;
