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

// Define the updated color palette
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

// Styled component for the chart wrapper
const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function PieChartComponent() {
  const [data, setData] = useState([]);

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
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
            label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
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
