import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { ChevronDown } from "lucide-react";

// 🔁 Generate dummy sales data
const generateData = (type) => {
  if (type === "day") {
    return Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      value: Math.floor(Math.random() * 200 + 50),
    }));
  }
  if (type === "week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      name: day,
      value: Math.floor(Math.random() * 1000 + 200),
    }));
  }
  if (type === "month") {
    return Array.from({ length: 30 }, (_, i) => ({
      name: `Day ${i + 1}`,
      value: Math.floor(Math.random() * 1500 + 300),
    }));
  }
  if (type === "year") {
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
    return months.map((m) => ({
      name: m,
      value: Math.floor(Math.random() * 5000 + 1000),
    }));
  }
};

export default function TotalSummaryOfSales() {
  const [filter, setFilter] = useState("day");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold text-gray-800">
          Total Summary of Sales
        </h2>

        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm text-white font-medium bg-[#a855f7] px-3 py-1 rounded-lg flex items-center justify-center gap-2"
          >
            {filter === "day"
              ? "This Day"
              : filter === "week"
              ? "This Weekly"
              : filter === "month"
              ? "This Month"
              : "This Year"}
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {["day", "week", "month", "year"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {item === "day"
                    ? "This Day"
                    : item === "week"
                    ? "This Weekly"
                    : item === "month"
                    ? "This Month"
                    : "This Year"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={generateData(filter)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
