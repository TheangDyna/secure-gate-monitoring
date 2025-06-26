"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export function StaffVsGuestChart() {
  const [data, setData] = useState([
    { name: "Staff", value: 83 },
    { name: "Registered Guests", value: 42 },
    { name: "Unregistered Visitors", value: 12 }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData((prevData) => {
        return prevData.map((item) => ({
          ...item,
          value:
            item.value +
            (Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0)
        }));
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
