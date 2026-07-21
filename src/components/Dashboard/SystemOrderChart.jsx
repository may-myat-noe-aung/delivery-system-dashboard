
import React, { useEffect, useState } from "react";
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

export default function SystemOrderChart() {
  const [filter, setFilter] = useState("month");
  const [dropdownOpen, setDropdownOpen] = useState(false);
   const token = localStorage.getItem("token");

  const [chartData, setChartData] = useState({
    day: [],
    week: [],
    month: [],
    year: [],
  });

  const [loading, setLoading] = useState(true);

  const filterLabel =
    filter === "day"
      ? "This Day"
      : filter === "week"
      ? "This Week"
      : filter === "month"
      ? "This Month"
      : "This Year";

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/system-order-chart",
          {
            method: "GET",
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          }
        );

        const json = await res.json();

        if (json.success) {
          setChartData(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();

    const interval = setInterval(fetchChart, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        rounded-3xl
        border border-slate-700
        bg-[#1a2030]/80
        backdrop-blur-xl
        p-6
        shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-semibold text-white">
            System Orders
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            Order statistics overview
          </p>
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() =>
              setDropdownOpen(!dropdownOpen)
            }
            className="
              px-4 py-2
              rounded-2xl
              bg-[#B476FF]/10
              border border-[#B476FF]/20
              text-[#B476FF]
              flex items-center gap-2
              text-sm font-medium
            "
          >
            {filterLabel}

            <ChevronDown
              className={`w-4 h-4 transition ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div
              className="
                absolute right-0 mt-2 w-40
                rounded-2xl
                bg-slate-900
                border border-slate-700
                overflow-hidden
                z-20
              "
            >
              {[
                "day",
                "week",
                "month",
                "year",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setDropdownOpen(false);
                  }}
                  className="
                    w-full
                    px-4 py-3
                    text-left
                    text-sm
                    text-slate-300
                    hover:bg-slate-800
                    transition
                  "
                >
                  {item === "day"
                    ? "This Day"
                    : item === "week"
                    ? "This Week"
                    : item === "month"
                    ? "This Month"
                    : "This Year"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[360px]">
        {loading ? (
          <div className="h-full flex items-center justify-center text-neutral-400">
            Loading chart...
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData[filter] || []}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(180,118,255,0.08)",
                }}
                contentStyle={{
                  background: "#111827",
                  border:
                    "1px solid rgba(180,118,255,0.2)",
                  borderRadius: "16px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="value"
                fill="#B476FF"
                radius={[8, 8, 0, 0]}
                maxBarSize={45}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}