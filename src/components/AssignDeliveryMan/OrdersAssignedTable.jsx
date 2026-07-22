import React, { useEffect, useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AssignedOrdersPopup from "./AssignedOrdersPopup";

export default function OrdersAssignedTable() {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.pwezayshops.com/connected-orders",
          {
            method: "GET",
            headers: {
              Authorization: `MSHteam ${token}`,
            },
          },
        );
        const data = await res.json();

        if (data.success) {
          setDeliveryMen(data.data || []);
          setError("");
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // FILTER (same style as OrdersTable)
  // =========================
  const filtered = useMemo(() => {
    return deliveryMen.filter((dm) => {
      const matchesSearch =
        dm.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(dm.total_order).includes(searchTerm) ||
        String(dm.assign_order).includes(searchTerm);

      let matchesDate = true;

      if (fromDate || toDate) {
        matchesDate = dm.orders?.some((order) => {
          const d = new Date(order.created_at);
          const orderDate = new Date(d);
          orderDate.setHours(0, 0, 0, 0);

          const from = fromDate ? new Date(fromDate) : null;
          const to = toDate ? new Date(toDate) : null;

          if (from) from.setHours(0, 0, 0, 0);
          if (to) to.setHours(0, 0, 0, 0);

          if (from && to) return orderDate >= from && orderDate <= to;
          if (from || to) {
            const target = from || to;
            return orderDate.getTime() === target.getTime();
          }
          return true;
        });
      }

      return matchesSearch && matchesDate;
    });
  }, [deliveryMen, searchTerm, fromDate, toDate]);

  // =========================
  // PAGINATION (same style)
  // =========================
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filtered]);

  // =========================
  // EXPORT (same XLSX style)
  // =========================
  const handleExport = () => {
    const exportData = filtered.map((dm, i) => ({
      No: i + 1,
      ID: dm.id,
      Name: dm.name,
      Email: dm.email,
      Phone: dm.phone,
      WorkType: dm.work_type,
      Status: dm.status,
      Rating: dm.rating,
      FinishedOrders: dm.finished_order_count,
      AssignedOrders: dm.assign_order,
      CurrentOrders: dm.current_orders?.length || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assigned");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "assigned-orders.xlsx");
  };

  const getTotalIncome = (dm) => {
    return (
      dm.orders?.reduce((sum, order) => {
        return sum + (order.grand_total || 0);
      }, 0) || 0
    );
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "inactive":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };
  const getRowColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 hover:bg-green-500/20";
      case "warning":
        return "bg-yellow-500/10 hover:bg-yellow-500/20";
      default:
        return "hover:bg-slate-800/40";
    }
  };
  // =========================
  // UI (MATCHED WITH OrdersTable)
  // =========================
  return (
    <div className="text-white">
      {/* HEADER (same layout) */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
        <h2 className="text-2xl font-semibold text-purple-400">
          Orders Assigned
        </h2>

        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          {/* SEARCH (same style) */}
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-2xl text-sm bg-slate-900/60 border border-slate-700 text-white outline-none focus:border-purple-500 w-[250px]"
            />
          </div>

          {/* EXPORT (same style) */}
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/20 transition flex items-center gap-1"
          >
            <Download size={14} /> Export
          </button>

          {/* DATE INPUT (same style) */}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-2xl bg-purple-400 text-neutral-900 px-3 py-1.5 text-sm"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-2xl bg-purple-400 text-neutral-900 px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* TABLE CONTAINER (same style) */}
      <div className="bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No data found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-4 text-left">ID</th>
                  <th className="py-4 text-left">Name</th>
                  <th className="py-4 text-left">Email</th>
                  <th className="py-4 text-left">Phone</th>
                  {/* <th className="py-4 text-left">Status</th> */}
                  <th className="py-4 text-left">Work Type</th>
                  {/* UPDATED */}
                  <th className="py-4 text-left">Assigned Order</th>
                  <th className="py-4 text-left">Current Order</th>
                  <th className="py-4 text-left">Finished Order</th>
                  <th className="py-4 text-left">Online</th>
                  <th className="py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((dm) => (
                  <tr
                    key={dm.id}
                    className="border-b border-slate-700 hover:bg-slate-800/40"
                  >
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      {dm.id}
                    </td>
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      {dm.name}
                    </td>
              <td
  className={`w-[130px] py-4 break-words ${
    dm.status === "active"
      ? "bg-green-500/20"
      : "bg-red-500/20"
  }`}
>
  {dm.email}
</td>
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      {dm.phone}
                    </td>
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      {dm.work_type || "System"}
                    </td>
                    {/* ASSIGNED ORDERS */}
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4 text-blue-400 font-semibold`}
                    >
                      {dm.assign_order}
                    </td>
                    {/* CURRENT ORDERS */}
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4 text-purple-400 font-semibold`}
                    >
                      {dm.current_orders?.length || 0}
                    </td>
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4 text-pink-400 font-semibold`}
                    >
                      {dm.finished_order_count}
                    </td>
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          dm.is_online === 1
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {dm.is_online === 1 ? "Online" : "Offline"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td
                      className={`${
                        dm.status === "active"
                          ? "bg-green-500/20"
                          : "bg-red-500/20"
                      } py-4`}
                    >
                      <button
                        onClick={() => setSelected(dm)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between px-4 pt-4 text-sm text-neutral-400 gap-2 md:gap-0">
          <p>
            Page {totalPages === 0 ? 0 : page} of {totalPages}
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage(Math.max(1, page - 1))}
              className={`px-3 py-1 rounded-md border border-neutral-700 ${
                page === 1
                  ? "text-neutral-500 cursor-not-allowed"
                  : "text-purple-400 hover:bg-neutral-900"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`px-3 py-1 rounded-md border border-neutral-700 ${
                  page === n
                    ? "bg-purple-300 text-black font-semibold"
                    : "text-purple-300 hover:bg-neutral-900"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              className={`px-3 py-1 rounded-md border border-neutral-700 ${
                page === totalPages
                  ? "text-neutral-500 cursor-not-allowed"
                  : "text-purple-500 hover:bg-neutral-900"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selected && (
        <AssignedOrdersPopup
          delivery={selected}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
}
