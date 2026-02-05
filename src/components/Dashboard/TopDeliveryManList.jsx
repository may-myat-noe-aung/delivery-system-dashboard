// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";

// // 🔁 Dummy data for delivery men
// const deliveryMenData = {
//   day: [
//     {
//       rank: 1,
//       name: "Kyaw Kyaw",
//       orders: 12,
//       onTime: "95%",
//       rating: 4.8,
//       complaints: 0,
//     },
//     {
//       rank: 2,
//       name: "Aung Aung",
//       orders: 10,
//       onTime: "90%",
//       rating: 4.6,
//       complaints: 1,
//     },
//     {
//       rank: 3,
//       name: "Min Min",
//       orders: 8,
//       onTime: "88%",
//       rating: 4.5,
//       complaints: 2,
//     },
//       {
//       rank: 4,
//       name: "Min Min",
//       orders: 8,
//       onTime: "88%",
//       rating: 4.5,
//       complaints: 2,
//     },
//       {
//       rank: 5,
//       name: "Min Min",
//       orders: 8,
//       onTime: "88%",
//       rating: 4.5,
//       complaints: 2,
//     },
//   ],
//   week: [
//     {
//       rank: 1,
//       name: "Kyaw Kyaw",
//       orders: 60,
//       onTime: "96%",
//       rating: 4.9,
//       complaints: 1,
//     },
//     {
//       rank: 2,
//       name: "Aung Aung",
//       orders: 55,
//       onTime: "92%",
//       rating: 4.7,
//       complaints: 2,
//     },
//     {
//       rank: 3,
//       name: "Min Min",
//       orders: 48,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 3,
//     },
//      {
//       rank: 4,
//       name: "Min Min",
//       orders: 48,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 3,
//     },
//      {
//       rank: 5,
//       name: "Min Min",
//       orders: 48,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 3,
//     },
//   ],
//   month: [
//     {
//       rank: 1,
//       name: "Kyaw Kyaw",
//       orders: 220,
//       onTime: "94%",
//       rating: 4.8,
//       complaints: 3,
//     },
//     {
//       rank: 2,
//       name: "Aung Aung",
//       orders: 200,
//       onTime: "90%",
//       rating: 4.6,
//       complaints: 5,
//     },
//     {
//       rank: 3,
//       name: "Min Min",
//       orders: 180,
//       onTime: "87%",
//       rating: 4.4,
//       complaints: 4,
//     },
//         {
//       rank: 4,
//       name: "Min Min",
//       orders: 180,
//       onTime: "87%",
//       rating: 4.4,
//       complaints: 4,
//     },
//         {
//       rank: 5,
//       name: "Min Min",
//       orders: 180,
//       onTime: "87%",
//       rating: 4.4,
//       complaints: 4,
//     },
//   ],
//   year: [
//     {
//       rank: 1,
//       name: "Kyaw Kyaw",
//       orders: 2400,
//       onTime: "95%",
//       rating: 4.9,
//       complaints: 12,
//     },
//     {
//       rank: 2,
//       name: "Aung Aung",
//       orders: 2200,
//       onTime: "91%",
//       rating: 4.7,
//       complaints: 18,
//     },
//     {
//       rank: 3,
//       name: "Min Min",
//       orders: 2000,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 20,
//     },
//         {
//       rank: 4,
//       name: "Min Min",
//       orders: 2000,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 20,
//     },
//         {
//       rank: 5,
//       name: "Min Min",
//       orders: 2000,
//       onTime: "89%",
//       rating: 4.5,
//       complaints: 20,
//     },
//   ],
// };

// export default function TopDeliveryManList() {
//   const [filter, setFilter] = useState("day");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className="col-span-2 bg-white p-4 rounded-2xl shadow">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4 relative">
//         <h2 className="text-lg font-semibold text-gray-800">
//           Top Delivery Man List
//         </h2>

//         {/* Dropdown button */}
//         <div className="relative">
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-sm text-white font-medium bg-[#a855f7] px-3 py-1 rounded-lg flex items-center justify-center gap-2"
//           >
//             {filter === "day"
//               ? "This Day"
//               : filter === "week"
//               ? "This Weekly"
//               : filter === "month"
//               ? "This Month"
//               : "This Year"}
//             <ChevronDown className="w-4 h-4" />
//           </button>

//           {/* Dropdown menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//               {["day", "week", "month", "year"].map((item) => (
//                 <div
//                   key={item}
//                   onClick={() => {
//                     setFilter(item);
//                     setDropdownOpen(false);
//                   }}
//                   className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                 >
//                   {item === "day"
//                     ? "This Day"
//                     : item === "week"
//                     ? "This Weekly"
//                     : item === "month"
//                     ? "This Month"
//                     : "This Year"}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-600">
//           <thead className="border-b-2 border-[#a855f7] text-[#a855f7]">
//             <tr>
//               <th className="px-4 py-2">Rank</th>
//               <th className="px-4 py-2">Delivery Man</th>
//               <th className="px-4 py-2">Total Orders</th>
//               <th className="px-4 py-2">On-Time Rate (%)</th>
//               <th className="px-4 py-2">Rating</th>
//               <th className="px-4 py-2">Complaints</th>
//             </tr>
//           </thead>
//           <tbody>
//             {deliveryMenData[filter].map((man, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{man.rank}</td>
//                 <td className="px-4 py-2 font-medium text-gray-900">
//                   {man.name}
//                 </td>
//                 <td className="px-4 py-2">{man.orders}</td>
//                 <td className="px-4 py-2">{man.onTime}</td>
//                 <td className="px-4 py-2">{man.rating}</td>
//                 <td className="px-4 py-2">{man.complaints}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../ThemeProvider"; // adjust path to your theme provider

// 🔁 Dummy data for delivery men
const deliveryMenData = {
  day: [
    { rank: 1, name: "Kyaw Kyaw", orders: 12, onTime: "95%", rating: 4.8, complaints: 0 },
    { rank: 2, name: "Aung Aung", orders: 10, onTime: "90%", rating: 4.6, complaints: 1 },
    { rank: 3, name: "Min Min", orders: 8, onTime: "88%", rating: 4.5, complaints: 2 },
    { rank: 4, name: "Min Min", orders: 8, onTime: "88%", rating: 4.5, complaints: 2 },
    { rank: 5, name: "Min Min", orders: 8, onTime: "88%", rating: 4.5, complaints: 2 },
  ],
  week: [
    { rank: 1, name: "Kyaw Kyaw", orders: 60, onTime: "96%", rating: 4.9, complaints: 1 },
    { rank: 2, name: "Aung Aung", orders: 55, onTime: "92%", rating: 4.7, complaints: 2 },
    { rank: 3, name: "Min Min", orders: 48, onTime: "89%", rating: 4.5, complaints: 3 },
    { rank: 4, name: "Min Min", orders: 48, onTime: "89%", rating: 4.5, complaints: 3 },
    { rank: 5, name: "Min Min", orders: 48, onTime: "89%", rating: 4.5, complaints: 3 },
  ],
  month: [
    { rank: 1, name: "Kyaw Kyaw", orders: 220, onTime: "94%", rating: 4.8, complaints: 3 },
    { rank: 2, name: "Aung Aung", orders: 200, onTime: "90%", rating: 4.6, complaints: 5 },
    { rank: 3, name: "Min Min", orders: 180, onTime: "87%", rating: 4.4, complaints: 4 },
    { rank: 4, name: "Min Min", orders: 180, onTime: "87%", rating: 4.4, complaints: 4 },
    { rank: 5, name: "Min Min", orders: 180, onTime: "87%", rating: 4.4, complaints: 4 },
  ],
  year: [
    { rank: 1, name: "Kyaw Kyaw", orders: 2400, onTime: "95%", rating: 4.9, complaints: 12 },
    { rank: 2, name: "Aung Aung", orders: 2200, onTime: "91%", rating: 4.7, complaints: 18 },
    { rank: 3, name: "Min Min", orders: 2000, onTime: "89%", rating: 4.5, complaints: 20 },
    { rank: 4, name: "Min Min", orders: 2000, onTime: "89%", rating: 4.5, complaints: 20 },
    { rank: 5, name: "Min Min", orders: 2000, onTime: "89%", rating: 4.5, complaints: 20 },
  ],
};

export default function TopDeliveryManList() {
  const [filter, setFilter] = useState("day");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { dark } = useTheme();

  const cardBg = dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";
  const tableHeaderBg = dark ? "bg-gray-700 text-purple-400" : "bg-white text-[#a855f7]";
  const tableBorder = dark ? "border-gray-600" : "border-[#a855f7]";
  const rowHover = dark ? "hover:bg-gray-700" : "hover:bg-gray-50";

  return (
    <div className={`col-span-2 p-4 rounded-2xl shadow ${cardBg}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 relative">
        <h2 className="text-lg font-semibold">{`Top Delivery Man List`}</h2>

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
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
              {["day", "week", "month", "year"].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
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
      <div className="overflow-x-auto">
        <table className={`w-full text-sm text-left ${dark ? "text-gray-200" : "text-gray-600"}`}>
          <thead className={`border-b-2 ${tableBorder} ${tableHeaderBg}`}>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Delivery Man</th>
              <th className="px-4 py-2">Total Orders</th>
              <th className="px-4 py-2">On-Time Rate (%)</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Complaints</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMenData[filter].map((man, index) => (
              <tr key={index} className={`border-b ${tableBorder} ${rowHover}`}>
                <td className="px-4 py-2">{man.rank}</td>
                <td className="px-4 py-2 font-medium">{man.name}</td>
                <td className="px-4 py-2">{man.orders}</td>
                <td className="px-4 py-2">{man.onTime}</td>
                <td className="px-4 py-2">{man.rating}</td>
                <td className="px-4 py-2">{man.complaints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
