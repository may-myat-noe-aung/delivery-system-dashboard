import React, { useEffect, useState } from "react";
import {
  Store,
  ShoppingBag,
  Users,
  Download,
  TrendingUp,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TopShopsThisMonth() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/top5shops-this-month"
        );

        const json = await res.json();

        if (json.success) {
          setShops(json.data || []);
          setError("");
        } else {
          setError("Failed to load shops");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load shops");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();

    const interval = setInterval(fetchShops, 1000);

    return () => clearInterval(interval);
  }, []);

 const handleExport = () => {
  try {
    const exportData = shops.map((shop, index) => ({
      Rank: index + 1,
      ShopID: shop.id,
      ShopName: shop.shop_name,
      TotalOrders: shop.total_orders,
      TotalCustomers: shop.total_customer,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = [
      { wch: 10 },
      { wch: 15 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Top 5 Shops"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      blob,
      `top5shops_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  } catch (error) {
    console.error("Export Error:", error);
    alert("Export failed");
  }
};

  return (
    <div className="bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">
      {/* Header */}
     <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Top 5 Shops
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            Best performing shops this month
          </p>
        </div>

        <button
          onClick={handleExport}
   className="
            px-4 py-2
            rounded-2xl
            bg-indigo-500/10
            border border-indigo-500/20
            text-indigo-400
            text-sm
            font-medium
            hover:bg-indigo-500/20
            transition
            flex items-center gap-2
          "
        >
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-slate-700 text-neutral-400 text-sm">
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Shop</th>
              <th className="p-4 text-center">
                Total Orders
              </th>
              <th className="p-4 text-center">
                Customers
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-16 text-neutral-400"
                >
                  Loading shops...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-16 text-red-400"
                >
                  {error}
                </td>
              </tr>
            ) : shops.length > 0 ? (
              shops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className="
                    border-b border-slate-800
                    hover:bg-white/[0.03]
                    transition
                  "
                >
                  {/* Rank */}
                  <td className="p-4">
                    <div
                      className={`h-10 w-10 rounded-2xl flex items-center justify-center font-semibold text-sm ${
                        index === 0
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : index === 1
                          ? "bg-slate-400/10 text-slate-300 border border-slate-500/20"
                          : index === 2
                          ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </td>

                  {/* Shop */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-11 h-11
                          rounded-2xl
                          bg-indigo-500/10
                          border border-indigo-500/20
                          flex items-center justify-center
                        "
                      >
                        <Store className="w-5 h-5 text-indigo-400" />
                      </div>

                      <div>
                        <h4 className="font-medium text-white break-words whitespace-normal 2xl:max-w-[150px]">
                          {shop.shop_name}
                        </h4>

                        <p className="text-xs text-neutral-500 mt-1">
                          ID: {shop.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Orders */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold">
                      <ShoppingBag className="w-4 h-4" />
                      {shop.total_orders}
                    </div>
                  </td>

                  {/* Customers */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
                      <Users className="w-4 h-4" />
                      {shop.total_customer}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-16 text-neutral-500"
                >
                  No shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}