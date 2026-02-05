

// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { ChevronDown, Search, Truck } from "lucide-react";

// // --- Sales Data ---
// const salesData = [
//   { name: "MON", value: 900000 },
//   { name: "TUE", value: 600000 },
//   { name: "WED", value: 200000 },
//   { name: "THU", value: 300000 },
//   { name: "FRI", value: 150000 },
//   { name: "SAT", value: 700000 },
//   { name: "SUN", value: 500000 },
// ];

// // --- Reported Cases ---
// const reportedCases = [
//   { name: "Positive", value: 46 },
//   { name: "Negative", value: 74 },
//   { name: "Not sent", value: 14 },
// ];
// const COLORS_CASES = ["#8b5cf6", "#f87171", "#60a5fa"]; // Tailwind colors

// // --- Order Progress ---
// const orderProgress = [
//   { name: "Pizza", value: 20 },
//   { name: "Burgar", value: 30 },
//   { name: "Pizza", value: 40 },
//   { name: "Burgar", value: 10 },
//   { name: "Pizza", value: 50 },
//   { name: "Burgar", value: 10 },
// ];
// const COLORS_PROGRESS = ["#8b5cf6", "#60a5fa", "#34d399", "#f87171"];

// export default function ReportDeliveryOrder() {
//   //   const [filter, setFilter] = useState("week");
//   // const [dropdownOpen, setDropdownOpen] = useState(false);
//   return (
//     <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
//       {/* Reported Cases */}
//       <div className="col-span-1 bg-white p-4 rounded-2xl shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Reported Cases
//           </h2>
//           <div className="text-sm text-gray-50 flex items-center justify-center gap-2 bg-[#a855f7] px-3 py-1 rounded-lg">
//             This Weekly
//             <ChevronDown className="w-4 h-4" />
//           </div>
//         </div>
//         <div className="w-full h-64">
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie
//                 data={reportedCases}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 dataKey="value"
//                 label
//               >
//                 {reportedCases.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS_CASES[index % COLORS_CASES.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Kyaw Kyaw Delivery Card */}
//       <div className="col-span-1 bg-white rounded-2xl shadow-md p-4 border border-gray-200">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-2">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//               alt="Delivery Man"
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div className="flex flex-col">
//               <span className="font-base text-gray-800">Kyaw Kyaw</span>
//               <span className="font-base text-gray-800">Order Id: 3456565</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-3">
//           <div className="relative flex items-center w-64">
//             <Search className="absolute left-3 w-4 h-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="pl-9 pr-3 py-2 text-sm rounded-full bg-white border border-gray-200 focus:ring-0 focus:outline-none w-full shadow-sm"
//             />
//           </div>
//           <button className="flex items-center gap-1 bg-[#B476FF] text-white px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-[#9b5ce0] transition">
//             All
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="relative mt-6">
//           <div className="flex justify-between items-center text-sm text-gray-500 mb-2 px-1">
//             <span className="text-center">Starting point</span>
//             <span className="text-center">Customer</span>
//           </div>
//           <div className="relative h-2 bg-purple-100 rounded-full">
//             <div
//               className="absolute h-2 bg-purple-500 rounded-full"
//               style={{ width: "45%" }}
//             ></div>
//             <div className="absolute left-[45%] -translate-x-1/2 -top-5 w-8 h-8 bg-white border-4 border-purple-300 rounded-full flex items-center justify-center">
//               <Truck size={16} className="text-purple-600" />
//             </div>
//           </div>
//           <div className="flex justify-between mt-2 mb-4 px-1">
//             <span className="text-sm text-gray-500">45% completed</span>
//           </div>
//         </div>

//         <div className="flex flex-col justify-between gap-2 mt-4 text-sm">
//           <div>
//             <span className="text-gray-500">Start time: </span>
//             <span className="text-purple-600 font-semibold">1:30 mins</span>
//           </div>
//           <div>
//             <span className="text-gray-500">Estimated Arrival: </span>
//             <span className="text-purple-600 font-semibold">2:30 mins</span>
//           </div>
//         </div>
//         {/* <hr className="my-4" /> */}
//       </div>

//       {/* Order Progress Card */}
//       <div className="col-span-2 bg-white p-5 rounded-2xl shadow">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Order Progress
//         </h2>

//         <div className="grid grid-cols-2 gap-6">
//           {/* Left: Pie Chart */}
//           <div className="h-56">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={orderProgress}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   dataKey="value"
//                   label={({ name, value }) => `${name} (${value})`}
//                 >
//                   {orderProgress.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS_PROGRESS[index % COLORS_PROGRESS.length]}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Right: Text/Description */}
//           <div className="grid grid-cols-2 gap-3">
//             {orderProgress.map((item, index) => (
//               <div key={index} className="mb-4 flex items-center gap-3">
//                 {/* Color badge matching Pie */}
//                 <span
//                   className="w-4 h-4 rounded-full"
//                   style={{
//                     backgroundColor:
//                       COLORS_PROGRESS[index % COLORS_PROGRESS.length],
//                   }}
//                 ></span>
//                 <div>
//                   <span className="block font-medium text-gray-700">
//                     {item.name}
//                   </span>
//                   <span className="text-sm text-gray-500">
//                     {item.value} Orders
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useTheme } from "../ThemeProvider"; // adjust path if needed
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ChevronDown, Search, Truck } from "lucide-react";

// --- Sales Data ---
const salesData = [
  { name: "MON", value: 900000 },
  { name: "TUE", value: 600000 },
  { name: "WED", value: 200000 },
  { name: "THU", value: 300000 },
  { name: "FRI", value: 150000 },
  { name: "SAT", value: 700000 },
  { name: "SUN", value: 500000 },
];

// --- Reported Cases ---
const reportedCases = [
  { name: "Positive", value: 46 },
  { name: "Negative", value: 74 },
  { name: "Not sent", value: 14 },
];
const COLORS_CASES = ["#8b5cf6", "#f87171", "#60a5fa"]; // Tailwind colors

// --- Order Progress ---
const orderProgress = [
  { name: "Pizza", value: 20 },
  { name: "Burgar", value: 30 },
  { name: "Pizza", value: 40 },
  { name: "Burgar", value: 10 },
  { name: "Pizza", value: 50 },
  { name: "Burgar", value: 10 },
];
const COLORS_PROGRESS = ["#8b5cf6", "#60a5fa", "#34d399", "#f87171"];

export default function ReportDeliveryOrder() {
  const { dark } = useTheme();

  const cardBg = dark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-800 border-gray-200";
  const inputBg = dark ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-800 border-gray-200";
  const titleColor = dark ? "text-gray-100" : "text-gray-800";
  const subtitleColor = dark ? "text-gray-300" : "text-gray-500";

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Reported Cases */}
      <div className={`${cardBg} p-4 rounded-2xl shadow`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-semibold ${titleColor}`}>Reported Cases</h2>
          <div className="text-sm text-gray-50 flex items-center justify-center gap-2 bg-[#a855f7] px-3 py-1 rounded-lg">
            This Weekly
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={reportedCases} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {reportedCases.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_CASES[index % COLORS_CASES.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kyaw Kyaw Delivery Card */}
      <div className={`${cardBg} rounded-2xl shadow-md p-4 border`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Delivery Man"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className={`font-base ${titleColor}`}>Kyaw Kyaw</span>
              <span className={`font-base ${titleColor}`}>Order Id: 3456565</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className={`relative flex items-center w-64`}>
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className={`pl-9 pr-3 py-2 text-sm rounded-full shadow-sm w-full focus:outline-none ${inputBg}`}
            />
          </div>
          <button className="flex items-center gap-1 bg-[#B476FF] text-white px-3 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-[#9b5ce0] transition">
            All
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="relative mt-6">
          <div className={`flex justify-between items-center text-sm mb-2 px-1 ${subtitleColor}`}>
            <span className="text-center">Starting point</span>
            <span className="text-center">Customer</span>
          </div>
          <div className="relative h-2 bg-purple-100 rounded-full">
            <div className="absolute h-2 bg-purple-500 rounded-full" style={{ width: "45%" }}></div>
            <div className="absolute left-[45%] -translate-x-1/2 -top-5 w-8 h-8 bg-white border-4 border-purple-300 rounded-full flex items-center justify-center">
              <Truck size={16} className="text-purple-600" />
            </div>
          </div>
          <div className={`flex justify-between mt-2 mb-4 px-1 ${subtitleColor}`}>
            <span className="text-sm">45% completed</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 mt-4 text-sm">
          <div>
            <span className={subtitleColor}>Start time: </span>
            <span className="text-purple-600 font-semibold">1:30 mins</span>
          </div>
          <div>
            <span className={subtitleColor}>Estimated Arrival: </span>
            <span className="text-purple-600 font-semibold">2:30 mins</span>
          </div>
        </div>
      </div>

      {/* Order Progress Card */}
      <div className={`${cardBg} p-5 rounded-2xl shadow col-span-2`}>
        <h2 className={`text-lg font-semibold mb-4 ${titleColor}`}>Order Progress</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Pie Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderProgress}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {orderProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_PROGRESS[index % COLORS_PROGRESS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Text/Description */}
          <div className="grid grid-cols-2 gap-3">
            {orderProgress.map((item, index) => (
              <div key={index} className="mb-4 flex items-center gap-3">
                {/* Color badge matching Pie */}
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS_PROGRESS[index % COLORS_PROGRESS.length] }}
                ></span>
                <div>
                  <span className={`block font-medium ${titleColor}`}>{item.name}</span>
                  <span className={`text-sm ${subtitleColor}`}>{item.value} Orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
