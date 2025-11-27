import humburgur from "../../assets/images/SaleHistory/humburgur.png";
import faluda from "../../assets/images/SaleHistory/faluda.png";
import friedChicken from "../../assets/images/SaleHistory/friedchicken.png";
import coconutJuice from "../../assets/images/SaleHistory/coconutjuice.png";
import coffeeBeans from "../../assets/images/SaleHistory/coffeebeans.png";
import fruitsalad from "../../assets/images/SaleHistory/fruitsalad.png";
import normalburgur from "../../assets/images/SaleHistory/normalburgur.png";
import applejuice from "../../assets/images/SaleHistory/applejuice.png";
import { HiArrowDown, HiArrowUp, HiSearch } from "react-icons/hi";

const ProductSalesTable = () => {
  const products = [
    {
      id: 1,
      name: "Coconut Juice",
      category: "Drink",
      unitsSold: 212,
      revenue: "318,000 MMK",
      priceUnit: "3,500 MMK",
      lastSold: "1/8/2025",
      trend: "up",
      image: coconutJuice,
      stock: "low",
    },
    {
      id: 2,
      name: "Double Meat Burger",
      category: "Food",
      unitsSold: 200,
      revenue: "318,000 MMK",
      priceUnit: "5,500 MMK",
      lastSold: "1/8/2025",
      trend: "up",
      image: humburgur,
      stock: "high",
    },
    {
      id: 3,
      name: "Fried Chicken",
      category: "Food",
      unitsSold: 125,
      revenue: "318,000 MMK",
      priceUnit: "3,500 MMK",
      lastSold: "1/8/2025",
      trend: "up",
      image: friedChicken,
      stock: "low",
    },
    {
      id: 4,
      name: "Coffee Beans",
      category: "Raw",
      unitsSold: 54,
      revenue: "318,000 MMK",
      priceUnit: "5,500 MMK",
      lastSold: "1/8/2025",
      trend: "neutral",
      image: coffeeBeans,
      stock: "high",
    },
    {
      id: 5,
      name: "Faluda",
      category: "Drink",
      unitsSold: 56,
      revenue: "318,000 MMK",
      priceUnit: "3,000 MMK",
      lastSold: "1/8/2025",
      trend: "down",
      image: faluda,
      stock: "high",
    },
    {
      id: 6,
      name: "Normal Burger",
      category: "Food",
      unitsSold: 55,
      revenue: "318,000 MMK",
      priceUnit: "4,500 MMK",
      lastSold: "1/8/2025",
      trend: "down",
      image: normalburgur,
      stock: "high",
    },
    {
      id: 7,
      name: "Apple Juice",
      category: "Drink",
      unitsSold: 35,
      revenue: "318,000 MMK",
      priceUnit: "2,000 MMK",
      lastSold: "1/8/2025",
      trend: "down",
      image: applejuice,
      stock: "high",
    },
    {
      id: 8,
      name: "Fruit Salad",
      category: "Food",
      unitsSold: 22,
      revenue: "318,000 MMK",
      priceUnit: "3,500 MMK",
      lastSold: "1/8/2025",
      trend: "down",
      image: fruitsalad,
      stock: "high",
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-4">
        <h1 className="text-[22px] font-medium">Product Sales</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative ">
            <input
            type="text"
            placeholder=""
            className="border rounded-[50px] px-4 py-2 w-72 h-8 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <HiSearch className="absolute top-2 left-2 text-lg text-purple-700" />
          <p className="absolute top-2 left-8 text-xs text-purple-700">Search</p>
          </div>
          <select className="text-xs border rounded-[50px] px-4 w-50 h-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Food</option>
            <option>Drink</option>
            <option>Raw</option>
          </select>
          <select className="border rounded-[50px] px-4 w-50 h-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Time</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white rounded-t-[25px] shadow-[0px_4px_4px_0px_rgba(128,128,128,0.5)] ">
              <th className="px-4 py-3 text-base font-medium">Product</th>
              <th className="px-4 py-3 text-base font-medium">Name</th>
              <th className="px-4 py-3 text-base font-medium">Category</th>
              <th className="px-4 py-3 text-base font-medium">Units Sold</th>
              <th className="px-4 py-3 text-base font-medium">Revenue</th>
              <th className="px-4 py-3 text-base font-medium">Price/Unit</th>
              <th className="px-4 py-3 text-base font-medium">Last Sold</th>
              <th className="px-4 py-3 text-base font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg"
                  />
                </td>
                <td className="px-4 py-3 ">
                  <div className="text-base font-medium flex items-center  gap-2">
                    {product.name}
                  {product.stock === "low" && (
                    <span className="bg-[#f49696] text-red-600 text-xs px-1 py-0.5 rounded-[5px]">
                      !Low Stock
                    </span>
                  )}
                  </div>
                </td>
                <td className="px-4 py-3 text-base">
                  <span className="bg-[#dfc2fe] text-black rounded-[10px] text-base w-12 h-7 flex items-center justify-center">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-base">{product.unitsSold}</td>
                <td className="px-4 py-3 text-base">{product.revenue}</td>
                <td className="px-4 py-3 text-base">{product.priceUnit}</td>
                <td className="px-4 py-3 text-base">{product.lastSold}</td>
                <td className="px-4 py-3 text-base ">
                  <div className="flex  justify-center">
                    {product.trend === "up" && (
                    <HiArrowUp className="float text-green-600 font-bold "/>
                  )}
                  {product.trend === "down" && (
                    <HiArrowDown className="text-red-600 font-bold"/>
                  )}
                  {product.trend === "neutral" && (
                    <span className="text-black font-bold ">–</span>
                  )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default ProductSalesTable
