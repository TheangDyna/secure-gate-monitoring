"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Generate mock data for the chart
const generateData = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    hours.push({
      hour,
      "Oil Trucks In": Math.floor(Math.random() * 5) + 1,
      "Oil Trucks Out": Math.floor(Math.random() * 4) + 1,
    });
  }
  return hours;
};

type VehicleCountData = {
  hour: string;
  "Oil Trucks In": number;
  "Oil Trucks Out": number;
};

export function VehicleCountChart() {
  const [data, setData] = useState<VehicleCountData[]>([]);

  useEffect(() => {
    setData(generateData());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;

        newData[lastIndex] = {
          ...newData[lastIndex],
          "Oil Trucks In":
            newData[lastIndex]["Oil Trucks In"] +
            (Math.random() > 0.85 ? 1 : 0),
          "Oil Trucks Out":
            newData[lastIndex]["Oil Trucks Out"] +
            (Math.random() > 0.9 ? 1 : 0),
        };

        return newData;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Oil Trucks In"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Oil Trucks Out" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
