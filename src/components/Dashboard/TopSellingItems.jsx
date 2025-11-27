import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// 🔁 Dummy datasets for each filter
const topSellingData = {
  day: [
    { code: "P001", name: "Burger", quantity: 35, amount: "$210" },
    { code: "P002", name: "Pizza", quantity: 20, amount: "$300" },
    { code: "P003", name: "Fries", quantity: 50, amount: "$100" },
    { code: "P002", name: "Pizza", quantity: 20, amount: "$300" },
    { code: "P001", name: "Burger", quantity: 35, amount: "$210" },


  ],
  week: [
    { code: "P004", name: "Fried Chicken", quantity: 120, amount: "$600" },
    { code: "P005", name: "Hotdog", quantity: 95, amount: "$380" },
    { code: "P006", name: "Sandwich", quantity: 70, amount: "$280" },
    { code: "P005", name: "Hotdog", quantity: 95, amount: "$380" },
    { code: "P006", name: "Sandwich", quantity: 70, amount: "$280" },


  ],
  month: [
    { code: "P007", name: "Noodles", quantity: 400, amount: "$1600" },
    { code: "P008", name: "BBQ Set", quantity: 300, amount: "$2100" },
    { code: "P009", name: "Ice Cream", quantity: 250, amount: "$500" },
    { code: "P008", name: "BBQ Set", quantity: 300, amount: "$2100" },
    { code: "P009", name: "Ice Cream", quantity: 250, amount: "$500" },


  ],
  year: [
    { code: "P010", name: "Steak", quantity: 1500, amount: "$15,000" },
    { code: "P011", name: "Sushi", quantity: 1200, amount: "$18,000" },
    { code: "P012", name: "Curry", quantity: 1000, amount: "$12,000" },
    { code: "P011", name: "Sushi", quantity: 1200, amount: "$18,000" },
    { code: "P011", name: "Sushi", quantity: 1200, amount: "$18,000" },


  ],
};

export default function TopSellingItems() {
  const [filter, setFilter] = useState("day");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold text-gray-800">
          Top Selling Items
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

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-[#a855f7] border-b-2 border-[#a855f7]">
          <tr>
            <th className="py-2 px-2">Code</th>
            <th className="py-2 px-2">Name</th>
            <th className="py-2 px-2">Quantity</th>
            <th className="py-2 px-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {topSellingData[filter].map((item, idx) => (
            <tr
              key={idx}
              className="border-b last:border-none hover:bg-gray-50 transition"
            >
              <td className="py-2 px-2">{item.code}</td>
              <td className="py-2 px-2">{item.name}</td>
              <td className="py-2 px-2">{item.quantity}</td>
              <td className="py-2 px-2">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
