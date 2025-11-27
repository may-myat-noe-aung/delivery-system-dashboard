// import React from "react";
// import { Star } from "lucide-react";

// const PerformanceAndSatisfaction = () => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Delivery Performance */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Delivery Performance</h2>
//           <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
//             This month
//           </span>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
//             <div className="relative w-20 h-20 mb-2">
//               <svg className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#e5e7eb"
//                   strokeWidth="6"
//                   fill="transparent"
//                 />
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#3b82f6"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray="226"
//                   strokeDashoffset="80"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
//                 2.4h
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm">Avg Delivery Time</p>
//           </div>

//           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
//             <div className="relative w-20 h-20 mb-2">
//               <svg className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#e5e7eb"
//                   strokeWidth="6"
//                   fill="transparent"
//                 />
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#22c55e"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray="226"
//                   strokeDashoffset="22"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
//                 90%
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm">On-Time Rate</p>
//           </div>

//           <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
//             <div className="relative w-20 h-20 mb-2">
//               <svg className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#e5e7eb"
//                   strokeWidth="6"
//                   fill="transparent"
//                 />
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="#ca8a04"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray="226"
//                   strokeDashoffset="150"
//                   strokeLinecap="round"
//                 />
//               </svg>
//               <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
//                 1,247
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm">Total Deliveries</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-6">
//         {/* Customer Satisfaction */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-lg font-semibold mb-2">Customer Satisfaction</h2>
//           <p className="text-xs text-gray-500 mb-3">Based on 342 reviews</p>
//           <div className="flex items-center space-x-2">
//             <span className="text-3xl font-bold text-purple-600">4.6</span>
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className="w-5 h-5 fill-current" />
//               ))}
//             </div>
//           </div>
//           <p className="text-sm text-gray-600 mt-2">Excellent rating</p>
//         </div>

//         {/* Issue Resolution Time */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-lg font-semibold mb-2">Issue Resolution Time</h2>
//           <p className="text-xs text-gray-500 mb-3">Average response</p>
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-2xl font-bold">2.3</span>
//               <span className="ml-1 text-sm text-gray-600">hours</span>
//               <p className="text-xs text-purple-600 font-medium">
//                 Fast response
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-600">95% Resolved in 24h</p>
//               <p className="text-sm text-gray-600">142 Issues this month</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceAndSatisfaction;


import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

// Hook to animate numbers
function useAnimatedNumber(target, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let step = 0;
    const totalSteps = Math.round(duration / 20);
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      setValue(Math.floor(progress * target));
      if (progress === 1) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
}

// Hook to animate circle offset
function useAnimatedOffset(targetValue, duration = 1000) {
  const [offset, setOffset] = useState(226);

  useEffect(() => {
    let step = 0;
    const totalSteps = Math.round(duration / 20);
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const targetOffset = 226 - (targetValue / 100) * 226;
      setOffset(226 - (226 - targetOffset) * progress);
      if (progress === 1) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return offset;
}

const PerformanceAndSatisfaction = () => {
  const [form, setForm] = useState({
    avgTime: "",
    onTime: "",
    totalDeliveries: "",
  });

  const [data, setData] = useState({
    avgTime: 0,
    onTime: 0,
    totalDeliveries: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({
      avgTime: Number(form.avgTime) || 0,
      onTime: Number(form.onTime) || 0,
      totalDeliveries: Number(form.totalDeliveries) || 0,
    });
    setForm({ avgTime: "", onTime: "", totalDeliveries: "" });
  };

  const avgTimeVal = useAnimatedNumber(data.avgTime);
  const avgTimeOffset = useAnimatedOffset(data.avgTime);

  const onTimeVal = useAnimatedNumber(data.onTime);
  const onTimeOffset = useAnimatedOffset(data.onTime);

  const totalDeliveriesVal = useAnimatedNumber(data.totalDeliveries);
  const totalDeliveriesOffset = useAnimatedOffset(data.totalDeliveries);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Delivery Performance */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Delivery Performance</h2>
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            This month
          </span>
        </div>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4"
        >
          <input
            type="number"
            placeholder="Avg Delivery Time"
            value={form.avgTime}
            onChange={(e) =>
              setForm({ ...form, avgTime: e.target.value })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="On-Time Rate %"
            value={form.onTime}
            onChange={(e) =>
              setForm({ ...form, onTime: e.target.value })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="Total Deliveries"
            value={form.totalDeliveries}
            onChange={(e) =>
              setForm({ ...form, totalDeliveries: e.target.value })
            }
            className="border rounded px-2 py-1 text-sm"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded px-4 py-1 text-sm hover:bg-purple-700"
          >
            Update
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Avg Delivery Time */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={avgTimeOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {avgTimeVal}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Avg Delivery Time</p>
          </div>

          {/* On-Time Rate */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#22c55e"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={onTimeOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {onTimeVal}%
              </span>
            </div>
            <p className="text-gray-600 text-sm">On-Time Rate</p>
          </div>

          {/* Total Deliveries */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#ca8a04"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={totalDeliveriesOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {totalDeliveriesVal}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Total Deliveries</p>
          </div>
        </div>
      </div>

      {/* Customer Satisfaction & Issue Resolution (static) */}
      <div className="flex flex-col gap-6">
        {/* Customer Satisfaction */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Customer Satisfaction</h2>
          <p className="text-xs text-gray-500 mb-3">Based on 342 reviews</p>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-purple-600">4.6</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Excellent rating</p>
        </div>

        {/* Issue Resolution Time */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Issue Resolution Time</h2>
          <p className="text-xs text-gray-500 mb-3">Average response</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold">2.3</span>
              <span className="ml-1 text-sm text-gray-600">hours</span>
              <p className="text-xs text-purple-600 font-medium">
                Fast response
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">95% Resolved in 24h</p>
              <p className="text-sm text-gray-600">142 Issues this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAndSatisfaction;
