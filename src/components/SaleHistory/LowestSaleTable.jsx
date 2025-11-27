import { useState } from "react";
import { MdShowChart } from "react-icons/md";
import { HiArrowDown } from "react-icons/hi";
import { IoMdTrendingDown } from "react-icons/io";

const salesData = {
  daily: [
    { name: "Faluda", sold: 56, price: "3,000 MMK", change: -23.5 },
    { name: "Normal Burger", sold: 55, price: "4,500 MMK", change: -18.2 },
    { name: "Noodle", sold: 40, price: "2,500 MMK", change: -31.7 },
    { name: "Apple Juice", sold: 35, price: "2,000 MMK", change: -12.8 },
    { name: "Fruit Salad", sold: 22, price: "3,500 MMK", change: -45.2 },
  ],
  weekly: [
    { name: "Faluda", sold: 200, price: "8,000 MMK", change: -20.1 },
    { name: "Normal Burger", sold: 190, price: "10,000 MMK", change: -15.5 },
    { name: "Noodle", sold: 170, price: "7,500 MMK", change: -28.0 },
    { name: "Apple Juice", sold: 150, price: "6,500 MMK", change: -10.3 },
    { name: "Fruit Salad", sold: 100, price: "9,000 MMK", change: -40.0 },
  ],
  monthly: [
    { name: "Faluda", sold: 800, price: "15,000 MMK", change: -25.0 },
    { name: "Normal Burger", sold: 760, price: "18,000 MMK", change: -17.8 },
    { name: "Noodle", sold: 700, price: "12,500 MMK", change: -30.0 },
    { name: "Apple Juice", sold: 600, price: "10,000 MMK", change: -13.9 },
    { name: "Fruit Salad", sold: 450, price: "14,500 MMK", change: -42.0 },
  ],
};

const LowestSalesTable = () => {
  const [period, setPeriod] = useState("daily");
  const items = salesData[period];

  return (
    <div className="bg-white rounded-2xl shadow  ">
      <div className="p-4 flex justify-between items-center border-b-[1px] rounded-t-2xl mb-4 shadow-[0px_2px_10px_0px_rgba(128,128,128,0.5)]">
        <div className="flex items-center gap-2">
        <IoMdTrendingDown className="text-xl border-2 rounded border-black   "/>
        <h3 className="text-lg font-semibold">Lowest Sales</h3>
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
                    <MdShowChart className="size-6 transform -scale-y-100 text-red-500" />
                    <HiArrowDown className="w-3 h-3 text-red-500" />
                    <span className="text-red-600 text-xs font-semibold">
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

export default LowestSalesTable;
