"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Generate mock data for the chart
const generateData = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    hours.push({
      hour,
      Staff: Math.floor(Math.random() * 20) + 10,
      Guests: Math.floor(Math.random() * 15) + 5,
      Unregistered: Math.floor(Math.random() * 10) + 2
    });
  }
  return hours;
};

type ChartData = {
  hour: string;
  Staff: number;
  Guests: number;
  Unregistered: number;
};

export function OverviewChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(generateData());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        const lastIndex = newData.length - 1;

        newData[lastIndex] = {
          ...newData[lastIndex],
          Staff:
            newData[lastIndex]["Staff"] +
            (Math.random() > 0.7 ? Math.floor(Math.random() * 2) : 0),
          Guests:
            newData[lastIndex]["Guests"] +
            (Math.random() > 0.8 ? Math.floor(Math.random() * 2) : 0),
          Unregistered:
            newData[lastIndex]["Unregistered"] + (Math.random() > 0.9 ? 1 : 0)
        };

        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
        <XAxis dataKey="hour" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #4b5563",
            color: "#ffffff"
          }}
        />
        <Legend wrapperStyle={{ color: "#ffffff" }} />
        <Bar dataKey="Staff" fill="#3b82f6" />
        <Bar dataKey="Guests" fill="#10b981" />
        <Bar dataKey="Unregistered" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
