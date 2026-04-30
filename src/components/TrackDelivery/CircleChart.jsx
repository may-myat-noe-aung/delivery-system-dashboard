
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// 🔹 Hook for animating numbers
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

// 🔹 Hook for animating circle offset
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

const CircleChart = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ finish: "", ongoing: "", pending: "" });
  const [data, setData] = useState({ finish: 0, ongoing: 0, pending: 0 });
  const [history, setHistory] = useState([]);

  // 🔹 Animated values
  const finishVal = useAnimatedNumber(data.finish);
  const finishOffset = useAnimatedOffset(data.finish);

  const ongoingVal = useAnimatedNumber(data.ongoing);
  const ongoingOffset = useAnimatedOffset(data.ongoing);

  const pendingVal = useAnimatedNumber(data.pending);
  const pendingOffset = useAnimatedOffset(data.pending);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      finish: Number(form.finish) || 0,
      ongoing: Number(form.ongoing) || 0,
      pending: Number(form.pending) || 0,
    };
    setData(newData);
    setHistory((prev) => [...prev, newData]);
    setForm({ finish: "", ongoing: "", pending: "" });
  };

  return (
    <div>
      {/* Delivery Performance */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-md font-semibold mb-4">Delivery Statistic (Dynamic)</h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <input
            type="number"
            placeholder="Finish"
            value={form.finish}
            onChange={(e) => setForm({ ...form, finish: e.target.value })}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Ongoing"
            value={form.ongoing}
            onChange={(e) => setForm({ ...form, ongoing: e.target.value })}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Pending"
            value={form.pending}
            onChange={(e) => setForm({ ...form, pending: e.target.value })}
            className="border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded px-4 py-2  hover:bg-purple-700 text-2xl"
          >
          +
          </button>
        </form>

        {/* Grid of charts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Finish */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={finishOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {finishVal}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Finish</p>
          </div>

          {/* Ongoing */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#22c55e"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={ongoingOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {ongoingVal}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Ongoing</p>
          </div>

          {/* Pending */}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl">
            <div className="relative w-20 h-20 mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#ca8a04"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  strokeDashoffset={pendingOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-semibold text-sm">
                {pendingVal}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Pending</p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-md font-semibold mb-4">History</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Finish</th>
              <th className="border px-3 py-2">Ongoing</th>
              <th className="border px-3 py-2">Pending</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2 text-center">{row.finish}</td>
                <td className="border px-3 py-2 text-center">{row.ongoing}</td>
                <td className="border px-3 py-2 text-center">{row.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CircleChart;



