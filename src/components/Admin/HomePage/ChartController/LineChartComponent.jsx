import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
import styled from "styled-components";

// Styled component for the chart wrapper
const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function LineChartComponent() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("total-sales");

  useEffect(() => {
    fetchData(year);
    fetchData(year - 1);
  }, [year, viewMode]);

  const fetchData = async (fetchYear) => {
    try {
      const response = await axios.get(
        `https://zodiacjewerlyswd.azurewebsites.net/api/orders/sales-overview?year=${fetchYear}`
      );
      const apiData = response.data.data;

      // Convert API data to the desired format
      const formattedData = apiData.map((item) => ({
        month: months[item.month - 1],
        [fetchYear === year ? "currentYear" : "previousYear"]: item[viewMode],
      }));

      setData((prevData) => {
        // Merge the fetched data with the existing data
        const mergedData = [...prevData];
        formattedData.forEach((newItem) => {
          const existingItem = mergedData.find(
            (item) => item.month === newItem.month
          );
          if (existingItem) {
            existingItem[fetchYear === year ? "currentYear" : "previousYear"] =
              newItem[fetchYear === year ? "currentYear" : "previousYear"];
          } else {
            mergedData.push(newItem);
          }
        });
        return mergedData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
    setData([]); // Clear the data to refetch it
  };

  const handleViewModeChange = (event) => {
    setViewMode(event.target.value);
    setData([]); // Clear the data to refetch it
  };

  return (
    <ChartWrapper>
      <div className="flex flex-row justify-between w-full">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis
              tickFormatter={(value) =>
                viewMode === "total-sales" ? `${value}$` : value
              }
            />
            <Tooltip
              formatter={(value) =>
                viewMode === "total-sales" ? `${value}$` : value
              }
            />
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
        <div className="flex flex-col">
          <FormControl variant="outlined" style={{ marginBottom: 20 }}>
            <InputLabel>Year</InputLabel>
            <Select value={year} onChange={handleYearChange} label="Year">
              {[...Array(10).keys()].map((i) => (
                <MenuItem key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginBottom: 20 }}>
            <InputLabel>View Mode</InputLabel>
            <Select
              value={viewMode}
              onChange={handleViewModeChange}
              label="View Mode"
            >
              <MenuItem value="total-sales">Total Sales</MenuItem>
              <MenuItem value="total-orders">Total Orders</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </ChartWrapper>
  );
}

export default LineChartComponent;
