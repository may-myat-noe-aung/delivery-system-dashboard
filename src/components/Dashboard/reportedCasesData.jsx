import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { ChevronDown } from "lucide-react";

// --- Reported Cases (multi period data) ---
const reportedCasesData = {
  day: [
    { name: "Positive", value: 5 },
    { name: "Negative", value: 8 },
    { name: "Not sent", value: 2 },
  ],
  week: [
    { name: "Positive", value: 46 },
    { name: "Negative", value: 74 },
    { name: "Not sent", value: 14 },
  ],
  month: [
    { name: "Positive", value: 120 },
    { name: "Negative", value: 200 },
    { name: "Not sent", value: 40 },
  ],
  year: [
    { name: "Positive", value: 800 },
    { name: "Negative", value: 1500 },
    { name: "Not sent", value: 300 },
  ],
};
const COLORS_CASES = ["#8b5cf6", "#f87171", "#60a5fa"];

export default function ReportedCasesCard() {
  const [filter, setFilter] = useState("day"); // current filter
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔁 Label for current filter
  const filterLabel =
    filter === "day"
      ? "This Day"
      : filter === "week"
      ? "This Weekly"
      : filter === "month"
      ? "This Month"
      : "This Year";

  return (
    <div className="col-span-1 bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold text-gray-800">Reported Cases</h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-sm text-white font-medium bg-[#a855f7] px-3 py-1 rounded-lg flex items-center justify-center gap-2"
          >
            {filterLabel}
            <ChevronDown className="w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {["day", "week", "month", "year"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item); // ✅ change chart data
                    setDropdownOpen(false); // close dropdown
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
      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={reportedCasesData[filter]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {reportedCasesData[filter].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS_CASES[index % COLORS_CASES.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
