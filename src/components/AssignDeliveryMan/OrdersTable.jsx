
import React, { useEffect, useState, useMemo } from "react";
import { Eye, Download, Search } from "lucide-react";
import OrderPopup from "./OrderPopup";
import OnlineDeliveryMenModal from "./OnlineDeliveryMenModal";
import DeliveryMenTable from "./DeliveryMenTable";
import OrdersAssignedTable from "./OrdersAssignedTable";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [assignOrder, setAssignOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination & Search
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [csvMessage, setCsvMessage] = useState("");

  const typeColors = {
    Fast: "text-red-400",
    Normal: "text-green-400",
    Timer: "text-yellow-400",
    Special: "text-purple-400",
  };

  // 🔴 LIVE FETCH EVERY 500ms
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://38.60.244.137:3000/orders");
        const data = await res.json();
        if (data.success) {
          setOrders(data.data || []);
        } else {
          setError("Failed to fetch orders.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // first load
    const interval = setInterval(fetchOrders, 500); // live refresh
    return () => clearInterval(interval);
  }, []);

  // --- Helpers ---
  const getOrderStatus = (order) => {
    const statuses = order.orders?.map((item) => item.status) || [];
    if (statuses.includes(2))
      return { label: "Rejected", color: "text-red-400" };
    if (statuses.includes(0))
      return { label: "Pending", color: "text-yellow-400" };
    if (statuses.length && statuses.every((s) => s === 1))
      return { label: "Approved", color: "text-green-400" };
    return { label: "Unknown", color: "text-slate-400" };
  };

  // 🔍 Filtering (search including new fields)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const orderDate = order.created_at ? new Date(order.created_at) : null;
      const matchesFrom = fromDate
        ? orderDate && orderDate >= new Date(fromDate)
        : true;
      const matchesTo = toDate
        ? orderDate && orderDate <= new Date(toDate)
        : true;

      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [orders, searchTerm, fromDate, toDate]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filteredOrders]);

  // CSV Export (including new fields)
  const handleExport = () => {
    const csvContent = [
      [
        "Order ID",
        "User ID",
        "Customer",
        "Phone",
        "Type",
        "Items",
        "Total",
        "Location",
        "Address",
        "Status",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.userId,
        order.name,
        order.phone,
        order.type,
        order.orders?.length || 0,
        order.grand_total,
        order.location || "-",
        order.address || "-",
        getOrderStatus(order).label,
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCsvMessage("CSV exported successfully!");
    setTimeout(() => setCsvMessage(""), 2000);
  };

  return (
    <div className="min-h-screen text-white mt-8">
      {csvMessage && (
        <div className="mb-2 text-center py-2 px-3 bg-green-600 text-white rounded-md animate-pulse">
          {csvMessage}
        </div>
      )}

      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#B476FF]">
          Order Confirm Table
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders..."
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
            className="rounded-2xl bg-purple-500 text-white px-3 py-2 text-sm focus:ring-purple-400"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="rounded-2xl bg-purple-500 text-white px-3 py-2 text-sm focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">
        {loading ? (
          <div className="text-center text-slate-400 py-10">
            Loading orders...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-4 text-center">Order ID</th>
                  <th className="py-4 text-center">User ID</th>
                  <th className="py-4 text-center">Customer</th>
                  <th className="py-4 text-center">Phone</th>
                  <th className="py-4 text-center">Type</th>
                  <th className="py-4 text-center">Items</th>
                  <th className="py-4 text-center">Location</th>
                  <th className="py-4 text-center">Address</th>
                  <th className="py-4 text-center">Total</th>
                  <th className="py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order) => {
                  const status = getOrderStatus(order);
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                    >
                      <td className="py-4 text-center font-semibold text-cyan-400">
                        {order.id}
                      </td>
                      <td className="py-4 text-center font-semibold text-green-400">
                        {order.userId}
                      </td>
                      <td className="py-4 text-center font-semibold">
                        {order.name}
                      </td>
                      <td className="py-4 text-center font-semibold">
                        {order.phone}
                      </td>
                      <td
                        className={`py-4 text-center font-semibold ${
                          typeColors[order.type] || "text-white"
                        }`}
                      >
                        {order.type}
                      </td>
                      <td className="py-4 text-center">
                        {order.orders?.length || 0} items
                      </td>

                      <td className="py-4 text-center font-semibold">
                        {order.location || "-"}
                      </td>
                      <td className="py-4 text-center font-semibold">
                        {order.address || "-"}
                      </td>
                      <td className="py-4 text-center font-semibold text-[#B476FF]">
                        {order.grand_total?.toLocaleString()} Ks
                      </td>

                      <td className="flex gap-2 items-center justify-center py-4">
                        <button
                          onClick={() => setSelected(order)}
                          className="flex items-center gap-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-sm"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => setAssignOrder(order)}
                          className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-sm"
                        >
                          Assign Delivery
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

      {/* Modals */}
      {selected && (
        <OrderPopup order={selected} close={() => setSelected(null)} />
      )}
      {assignOrder && (
        <OnlineDeliveryMenModal
          order={assignOrder}
          close={() => setAssignOrder(null)}
        />
      )}

      <OrdersAssignedTable />
      <DeliveryMenTable />
    </div>
  );
}


