// LineChartComponent.jsx
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", currentYear: 4000, previousYear: 2400 },
  { month: "Feb", currentYear: 3000, previousYear: 1398 },
  { month: "Mar", currentYear: 5000, previousYear: 9800 },
  { month: "Apr", currentYear: 2780, previousYear: 3908 },
  { month: "May", currentYear: 1890, previousYear: 4800 },
  { month: "Jun", currentYear: 2390, previousYear: 3800 },
  { month: "Jul", currentYear: 3490, previousYear: 4300 },
  { month: "Aug", currentYear: 2000, previousYear: 2400 },
  { month: "Sep", currentYear: 3000, previousYear: 1398 },
  { month: "Oct", currentYear: 5000, previousYear: 9800 },
  { month: "Nov", currentYear: 2780, previousYear: 3908 },
  { month: "Dec", currentYear: 1890, previousYear: 4800 },
];

function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value}Đ`} />
        <Tooltip formatter={(value) => `${value}Đ`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="currentYear"
          stroke="#8884d8"
          name="Current Year"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="previousYear"
          stroke="#82ca9d"
          name="Previous Year"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;
