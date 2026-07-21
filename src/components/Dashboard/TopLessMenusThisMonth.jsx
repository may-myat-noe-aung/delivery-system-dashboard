import React, { useEffect, useState } from "react";
import {
  Utensils,
  Store,
  ShoppingBag,
  Users,
  Download,
  TrendingDown,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function TopLessMenusThisMonth() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/top5Lessmenu-this-month",
          {
            method: "GET",
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          }
        );

        const json = await res.json();

        if (json.success) {
          setMenus(json.data || []);
          setError("");
        } else {
          setError("Failed to load menus");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load menus");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();

    const interval = setInterval(fetchMenus, 1000);

    return () => clearInterval(interval);
  }, []);

const handleExport = () => {
  try {
    const exportData = menus.map((menu, index) => ({
      Rank: index + 1,
      MenuID: menu.id,
      MenuName: menu.menu_name,
      ShopName: menu.shop_name,
      TotalOrders: menu.total_orders,
      TotalCustomers: menu.total_customer,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = [
      { wch: 10 }, // Rank
      { wch: 15 }, // Menu ID
      { wch: 35 }, // Menu Name
      { wch: 30 }, // Shop Name
      { wch: 20 }, // Total Orders
      { wch: 20 }, // Total Customers
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Less 5 Menus"
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
      `less5menus_${new Date().toISOString().slice(0, 10)}.xlsx`
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
            <TrendingDown className="w-5 h-5 text-red-400" />
           Less 5 Selling Menus
          </h2>

          <p className="text-sm text-neutral-400 mt-1">
            Lowest selling menus this month
          </p>
        </div>

        <button
          onClick={handleExport}
          className="
            px-4 py-2
            rounded-2xl
            bg-red-500/10
            border border-red-500/20
            text-red-400
            text-sm
            font-medium
            hover:bg-red-500/20
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
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-700 text-neutral-400 text-sm">
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Menu</th>
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
                  colSpan={5}
                  className="text-center py-16 text-neutral-400"
                >
                  Loading menus...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-16 text-red-400"
                >
                  {error}
                </td>
              </tr>
            ) : menus.length > 0 ? (
              menus.map((menu, index) => (
                <tr
                  key={menu.id}
                  className="
                    border-b border-slate-800
                    hover:bg-white/[0.03]
                    transition-all
                  "
                >
                  {/* Rank */}
                  <td className="p-4">
                    <div
                      className="
                        h-10 w-10
                        rounded-2xl
                        flex items-center justify-center
                        font-semibold text-sm
                        bg-red-500/10
                        text-red-400
                        border border-red-500/20
                      "
                    >
                      #{index + 1}
                    </div>
                  </td>

                  {/* Menu */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-11 h-11
                          rounded-2xl
                          bg-red-500/10
                          border border-red-500/20
                          flex items-center justify-center
                        "
                      >
                        <Utensils className="w-5 h-5 text-red-400" />
                      </div>

                      <div>
                        <h4 className="font-medium text-white">
                          {menu.menu_name}
                        </h4>

                        <p className="text-xs text-neutral-500 mt-1">
                          ID: {menu.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Shop */}
                  <td className="p-4">
                    <div className="inline-flex items-center gap-2 text-slate-300">
                      <Store className="w-4 h-4 text-red-400" />
                      {menu.shop_name}
                    </div>
                  </td>

                  {/* Orders */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 text-red-400 font-semibold">
                      <ShoppingBag className="w-4 h-4" />
                      {menu.total_orders}
                    </div>
                  </td>

                  {/* Customers */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 text-orange-400 font-semibold">
                      <Users className="w-4 h-4" />
                      {menu.total_customer}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-16 text-neutral-500"
                >
                  No menus found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}