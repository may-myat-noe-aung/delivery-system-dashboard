import React, { useEffect, useState, useMemo } from "react";
import { Download, Search } from "lucide-react";
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
  const [csvMessage, setCsvMessage] = useState("");

useEffect(() => {
  let intervalId;

  const fetchData = async () => {
    try {
      const res = await fetch("http://38.60.244.137:3000/connected-orders");
      const data = await res.json();
      if (data.success) {
        setDeliveryMen(data.data || []);
        setError("");
      } else {
        setError("Failed to fetch connected orders.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch immediately once
  fetchData();

  // Then fetch every 500ms
  intervalId = setInterval(fetchData, 500);

  // Cleanup on unmount
  return () => clearInterval(intervalId);
}, []);

  // 🔍 Filtering
  const filtered = useMemo(() => {
    return deliveryMen.filter((dm) => {
      const matchesSearch =
        dm.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dm.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      const hasMatchingDate = dm.orders?.some((order) => {
        const orderDate = new Date(order.created_at);
        const fromMatch = fromDate ? orderDate >= new Date(fromDate) : true;
        const toMatch = toDate ? orderDate <= new Date(toDate) : true;
        return fromMatch && toMatch;
      });

      return matchesSearch && (fromDate || toDate ? hasMatchingDate : true);
    });
  }, [deliveryMen, searchTerm, fromDate, toDate]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filtered]);

  // 📤 Export
  const handleExport = () => {
    const rows = [];

    filtered.forEach((dm) => {
      dm.orders.forEach((order) => {
        rows.push([
          dm.id,
          dm.name,
          dm.email || "-",
          dm.phone || "-",
          dm.work_type || "-",
          dm.location || "N/A",
          dm.status || "Unknown",
          dm.rating ?? 0,
          dm.total_order ?? 0,
          dm.assign_order ?? 0,
          dm.current_orders ?? 0,
          order.id,
          order.name,
          order.type,
          order.grand_total,
          order.created_at,
        ]);
      });
    });

    const csvContent = [
      [
        [
          "Delivery ID",
          "Delivery Name",
          "Email",
          "Phone",
          "Work Type",
          "Location",
          "Status",
          "Rating",
          "Total Orders",
          "Assigned Orders",
          "Current Orders",
          "Order ID",
          "Customer",
          "Type",
          "Total",
          "Date",
        ],
      ],
      ...rows,
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "assigned-orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCsvMessage("CSV exported successfully!");
    setTimeout(() => setCsvMessage(""), 2000);
  };

  return (
    <div className=" text-white mt-8 mb-8">
      {csvMessage && (
        <div className="mb-2 text-center py-2 px-3 bg-green-600 text-white rounded-md animate-pulse">
          {csvMessage}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#B476FF]">
          Orders Assigned Table
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search delivery..."
              className="rounded-2xl bg-neutral-900 border border-neutral-700 pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl border border-neutral-700 text-sm text-neutral-300 hover:text-white"
          >
            <Download size={14} /> Export
          </button>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="rounded-2xl bg-purple-500 focus:ring-purple-400 text-white px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-2xl bg-purple-500 focus:ring-purple-400 text-white px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">
        {loading ? (
          <div className="text-center text-slate-400 py-10">
            Loading assigned orders...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            No assigned orders found.
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-4 text-left">Order ID</th>
                  {/* <th className="py-4 text-left">User ID</th> */}
                  <th className="py-4 text-left">Delivery Men</th>
                  <th className="py-4 text-left">Email</th>
                  <th className="py-4 text-left">Phone</th>
                  <th className="py-4 text-left">Work Type</th>
                  <th className="py-4 text-left">Location</th>
                  <th className="py-4 text-left">Status</th>
                  <th className="py-4 text-left">Rating</th>
                  <th className="py-4 text-left">Total Orders</th>
                  <th className="py-4 text-left">Assigned Orders</th>
                  <th className="py-4 text-left">Current Orders</th>
                  {/* <th className="py-4 text-left">Items</th> */}
                  {/* <th className="py-4 text-left">Total</th> */}
                  <th className="py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((dm) => (
                  <tr
                    key={dm.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="py-4 font-semibold text-cyan-400">
                      {dm.id}
                    </td>
                    <td className="py-4 font-semibold text-cyan-400">
                      {dm.name}
                    </td>

                    <td className="py-4 text-slate-300">{dm.email || "-"}</td>
                    <td className="py-4 font-semibold">{dm.phone}</td>
                    <td className="py-4 text-indigo-400">
                      {dm.work_type || "-"}
                    </td>
                    <td className="py-4 text-slate-300">
                      {dm.location || "N/A"}
                    </td>
                    <td className="py-4 font-semibold text-yellow-400">
                      {dm.status || "Unknown"}
                    </td>
                    <td className="py-4 text-yellow-400">
                      ⭐ {dm.rating ?? 0}
                    </td>
                    <td className="py-4 text-blue-400">
                      {dm.total_order ?? 0}
                    </td>
                    <td className="py-4 text-purple-400">
                      {dm.assign_order ?? 0}
                    </td>
                    <td className="py-4 text-pink-400">
                      {dm.current_orders?.length ?? 0}
                    </td>
                 
                    <td className="flex gap-2 items-center justify-center py-4">
                      <button
                        onClick={() => setSelected(dm)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-sm"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between px-4 pt-4 text-sm text-neutral-400">
              <p>
                Page {totalPages === 0 ? 0 : page} of {totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1 rounded-md border border-neutral-700"
                >
                  Prev
                </button>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1 rounded-md border border-neutral-700"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
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
