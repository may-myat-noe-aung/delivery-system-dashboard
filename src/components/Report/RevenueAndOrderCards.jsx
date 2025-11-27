// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// const RevenueAndOrderCards = () => {
//   // Revenue Report Data
//   const revenueData = [
//     { name: "Mon", revenue: 2000 },
//     { name: "Tue", revenue: 3000 },
//     { name: "Wed", revenue: 2500 },
//     { name: "Thu", revenue: 3500 },
//     { name: "Fri", revenue: 4000 },
//     { name: "Sat", revenue: 4500 },
//     { name: "Sun", revenue: 5000 },
//   ];

//   // Order Volume Data
//   const orderData = [
//     { day: 1, orders: 100 },
//     { day: 5, orders: 400 },
//     { day: 10, orders: 700 },
//     { day: 15, orders: 1200 },
//     { day: 20, orders: 1500 },
//     { day: 25, orders: 1700 },
//     { day: 30, orders: 1847 },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       {/* Revenue Report Card */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Revenue Report</h2>
//           <span className="text-sm text-gray-500">Weekly overview</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-2xl font-bold">12,450</h3>
//             <p className="text-sm text-gray-500">This week</p>
//           </div>
//           <span className="text-green-600 text-sm font-medium">+8.5%</span>
//         </div>
//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={revenueData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#a78bfa" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Order Volume Trends Card */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Order Volume Trends</h2>
//           <span className="text-sm text-gray-500">Last 30 days</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-2xl font-bold">1,847</h3>
//             <p className="text-sm text-gray-500">Total orders</p>
//           </div>
//           <span className="text-green-600 text-sm font-medium">+12.3%</span>
//         </div>
//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={orderData}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="orders"
//                 stroke="#a78bfa"
//                 fill="#a78bfa"
//                 fillOpacity={0.3}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueAndOrderCards;


// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
// } from "recharts";

// const RevenueAndOrderCards = () => {
//   // Revenue Report Data
//   const revenueData = [
//     { name: "Mon", revenue: 2000 },
//     { name: "Tue", revenue: 3000 },
//     { name: "Wed", revenue: 2500 },
//     { name: "Thu", revenue: 3500 },
//     { name: "Fri", revenue: 4000 },
//     { name: "Sat", revenue: 4500 },
//     { name: "Sun", revenue: 5000 },
//   ];

//   // Order Volume Data
//   const orderData = [
//     { day: 1, orders: 100 },
//     { day: 5, orders: 400 },
//     { day: 10, orders: 700 },
//     { day: 15, orders: 1200 },
//     { day: 20, orders: 1500 },
//     { day: 25, orders: 1700 },
//     { day: 30, orders: 1847 },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       {/* Revenue Report Card */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Revenue Report</h2>
//           <span className="text-sm text-gray-500">Weekly overview</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-2xl font-bold">12,450</h3>
//             <p className="text-sm text-gray-500">This week</p>
//           </div>
//           <span className="text-green-600 text-sm font-medium">+8.5%</span>
//         </div>
//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={revenueData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#a78bfa" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Order Volume Trends Card */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Order Volume Trends</h2>
//           <span className="text-sm text-gray-500">Last 30 days</span>
//         </div>
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-2xl font-bold">1,847</h3>
//             <p className="text-sm text-gray-500">Total orders</p>
//           </div>
//           <span className="text-green-600 text-sm font-medium">+12.3%</span>
//         </div>
//         <div className="h-48">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={orderData}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="orders"
//                 stroke="#a78bfa"
//                 fill="#a78bfa"
//                 fillOpacity={0.3}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueAndOrderCards;

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const RevenueAndOrderCards = () => {
  const [revenueInput, setRevenueInput] = useState(
    Array(7).fill("") // 7 days
  );
  const [orderInput, setOrderInput] = useState(
    Array(7).fill("") // 7 sample points
  );

  const [revenueData, setRevenueData] = useState([
    { name: "Mon", revenue: 2000 },
    { name: "Tue", revenue: 3000 },
    { name: "Wed", revenue: 2500 },
    { name: "Thu", revenue: 3500 },
    { name: "Fri", revenue: 4000 },
    { name: "Sat", revenue: 4500 },
    { name: "Sun", revenue: 5000 },
  ]);

  const [orderData, setOrderData] = useState([
    { day: 1, orders: 100 },
    { day: 5, orders: 400 },
    { day: 10, orders: 700 },
    { day: 15, orders: 1200 },
    { day: 20, orders: 1500 },
    { day: 25, orders: 1700 },
    { day: 30, orders: 1847 },
  ]);

  const handleRevenueSubmit = (e) => {
    e.preventDefault();
    const updated = revenueInput.map((val, idx) => ({
      name: revenueData[idx].name,
      revenue: Number(val) || 0,
    }));
    setRevenueData(updated);
    setRevenueInput(Array(7).fill(""));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const updated = orderInput.map((val, idx) => ({
      day: orderData[idx].day,
      orders: Number(val) || 0,
    }));
    setOrderData(updated);
    setOrderInput(Array(7).fill(""));
  };

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = orderData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Revenue Report Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Revenue Report</h2>
          <span className="text-sm text-gray-500">Weekly overview</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{totalRevenue}</h3>
            <p className="text-sm text-gray-500">This week</p>
          </div>
        </div>

        {/* Revenue input */}
        <form onSubmit={handleRevenueSubmit} className="flex gap-2 mb-4 flex-wrap">
          {revenueInput.map((val, idx) => (
            <input
              key={idx}
              type="number"
              placeholder={revenueData[idx].name}
              value={val}
              onChange={(e) =>
                setRevenueInput(revenueInput.map((v, i) => (i === idx ? e.target.value : v)))
              }
              className="border rounded px-2 py-1 text-sm w-20"
            />
          ))}
          <button
            type="submit"
            className="bg-purple-600 text-white rounded px-4 py-1 text-sm hover:bg-purple-700"
          >
            Update
          </button>
        </form>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#a78bfa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Volume Trends Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Order Volume Trends</h2>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">{totalOrders}</h3>
            <p className="text-sm text-gray-500">Total orders</p>
          </div>
        </div>

        {/* Order input */}
        <form onSubmit={handleOrderSubmit} className="flex gap-2 mb-4 flex-wrap">
          {orderInput.map((val, idx) => (
            <input
              key={idx}
              type="number"
              placeholder={`Day ${orderData[idx].day}`}
              value={val}
              onChange={(e) =>
                setOrderInput(orderInput.map((v, i) => (i === idx ? e.target.value : v)))
              }
              className="border rounded px-2 py-1 text-sm w-20"
            />
          ))}
          <button
            type="submit"
            className="bg-purple-600 text-white rounded px-4 py-1 text-sm hover:bg-purple-700"
          >
            Update
          </button>
        </form>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={orderData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#a78bfa"
                fill="#a78bfa"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueAndOrderCards;


