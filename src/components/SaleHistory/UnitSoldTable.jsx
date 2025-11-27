import { useState } from "react";
import { MdShowChart } from "react-icons/md";
import { HiArrowUp } from "react-icons/hi";
import { HiMiniTrophy } from "react-icons/hi2";

const salesData = {
  daily: [
    { name: "Coconut Juice", sold: 212, price: "3,500 MMK", change: 15.2 },
    { name: "Double Meat Burger", sold: 200, price: "5,500 MMK", change: 12.3 },
    { name: "French Fries", sold: 189, price: "3,000 MMK", change: 8.7 },
    { name: "Fried Chicken", sold: 125, price: "4,000 MMK", change: 5.2 },
    { name: "Coffee Beans", sold: 54, price: "5,500 MMK", change: 0.8 },
  ],
  weekly: [
    { name: "Coconut Juice", sold: 1020, price: "16,000 MMK", change: 18.5 },
    { name: "Double Meat Burger", sold: 900, price: "21,000 MMK", change: 14.2 },
    { name: "French Fries", sold: 850, price: "12,000 MMK", change: 9.3 },
    { name: "Fried Chicken", sold: 600, price: "8,500 MMK", change: 6.1 },
    { name: "Coffee Beans", sold: 300, price: "12,000 MMK", change: 1.5 },
  ],
  monthly: [
    { name: "Coconut Juice", sold: 4200, price: "60,000 MMK", change: 22.1 },
    { name: "Double Meat Burger", sold: 3800, price: "85,000 MMK", change: 19.3 },
    { name: "French Fries", sold: 3600, price: "55,000 MMK", change: 12.5 },
    { name: "Fried Chicken", sold: 2800, price: "45,000 MMK", change: 7.2 },
    { name: "Coffee Beans", sold: 1500, price: "25,000 MMK", change: 3.1 },
  ],
};

const UnitsSoldTable = () => {
  const [period, setPeriod] = useState("daily");
  const items = salesData[period];

  return (
    <div className="bg-white rounded-2xl shadow ">
      <div className="p-4 flex justify-between items-center border-b-[1px] rounded-t-2xl mb-4 shadow-[0px_2px_10px_0px_rgba(128,128,128,0.5)]">
        <div className="flex items-center gap-2">
             <HiMiniTrophy className="text-xl" />
            <h3 className="text-base font-medium">Units Sold</h3>
        </div>
        <div className="flex bg-[#dfc2fe] rounded-full">
          {["daily", "weekly", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 text-xs font-medium rounded-full transition ${
                period === p ? "bg-white text-black shadow" : "text-black"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mx-4 px-4 border">
        <table className="w-full text-base text-left">
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2">{i + 1}</td>
                <td className="py-2">
                  <p className="text-black font-medium">{item.name}</p>
                  <div className="py-1 flex items-center gap-5">
                    <p className="text-xs">{item.sold} sold</p>
                    <p className="text-xs">{item.price}</p>
                  </div>
                </td>
                <td className="py-2">
                  <div className="text-right flex items-center justify-end gap-2">
                    <MdShowChart className="size-6 text-green-500" />
                    <HiArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-green-600 text-xs font-semibold">
                      {item.change}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsSoldTable;
