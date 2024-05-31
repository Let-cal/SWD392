import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Ring", value: 400 },
  { name: "Bracelet", value: 300 },
  { name: "Necklace", value: 300 },
  { name: "Earrings", value: 200 },
  { name: "Others", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA22AA"];
const SPECIAL_COLORS = ["#FF0000", "#FF4500", "#32CD32", "#FFD700", "#808080"]; // Colors for the top 4 items

function PieChartComponent() {
  // Sort the data to find the top 4 items
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => {
            const specialIndex = sortedData.findIndex(
              (item) => item.name === entry.name
            );
            const fillColor =
              specialIndex >= 0 && specialIndex < 4
                ? SPECIAL_COLORS[specialIndex]
                : COLORS[index % COLORS.length];
            return <Cell key={`cell-${index}`} fill={fillColor} />;
          })}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="bottom"
          wrapperStyle={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // Create 2 columns
            gap: "10px", // Gap between grid items
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComponent;
