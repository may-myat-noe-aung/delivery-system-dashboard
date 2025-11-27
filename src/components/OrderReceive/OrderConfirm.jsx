import React, { useState, useMemo } from "react";
import { Eye, CheckCircle, XCircle, Clock, Search, Filter } from "lucide-react";
import OrderDetail from "./OrderDetail";

const OrderConfirm = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Aung Aung", items: ["Burger", "Fries"], status: "pending", date: "2025-09-28 14:30" },
    { id: 2, customer: "Su Su", items: ["Pizza"], status: "pending", date: "2025-09-28 15:10" },
    { id: 3, customer: "Ko Ko", items: ["Milk Tea", "Cake"], status: "confirmed", date: "2025-09-28 16:00" },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  // Toast helper
const showToast = (msg, type = "success") => {
  setToast({ msg, type, disappearing: false });

  // 2s နောက်မှာ slide-out animation သုံးပြီး ဖျောက်
  setTimeout(() => {
    setToast((prev) => ({ ...prev, disappearing: true }));
  }, 2000);

  // 2.3s နောက်မှာ state clear
  setTimeout(() => setToast(null), 2300);
};


  // Update order status
  const updateOrder = (id, action) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: action.type,
              confirmedItems: action.confirmedItems || [],
              rejectedItems: action.rejectedItems || [],
            }
          : o
      )
    );
    setSelectedOrder(null);

    if (action.type === "confirmed") {
      showToast(`Order #${id} confirmed with ${action.confirmedItems.length} items ✅`);
    } else if (action.type === "rejected") {
      showToast(`Order #${id} rejected ❌`, "error");
    }
  };

  // Filter + search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch = order.customer.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" ? true : order.status === filter;
      return matchSearch && matchFilter;
    });
  }, [orders, search, filter]);

  const counts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 relative">
{/* Toast */}
{toast && (
  <div
    className={`fixed z-50 top-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white backdrop-blur-md transition-all
      ${toast.type === "success" ? "bg-purple-500/90" : "bg-red-500/90"}
      ${toast.disappearing ? "animate-slideOutRight" : "animate-fadeIn"}
    `}
  >
    {toast.msg}
  </div>
)}



      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 ">
        <div className="flex items-center gap-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-sm">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Clock />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold">{counts.pending}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-purple-50 border border-purple-200 rounded-2xl p-5 shadow-sm">
          <div className="p-3 bg-purple-100 text-[#B476FF]  rounded-full">
            <CheckCircle />
          </div>
          <div>
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold">{counts.confirmed}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <XCircle />
          </div>
          <div>
            <p className="text-sm text-gray-500">Rejected</p>
            <p className="text-2xl font-bold">{counts.rejected}</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div className="relative w-full md:w-1/4">
          <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-left min-w-[700px] border-collapse">
          <thead className="bg-[#B476FF] ">
            <tr>
              {["ID", "Customer", "Items", "Date", "Status", "Action"].map((h) => (
                <th key={h} className="p-4 text-sm font-semibold text-white">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr key={order.id} className={`transition ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-purple-50`}>
                <td className="p-4 font-medium">#{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4 text-gray-700">{order.items.join(", ")}</td>
                <td className="p-4 text-sm text-gray-500">{order.date}</td>
                <td className="p-4">
                  {order.status === "pending" && <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">Pending</span>}
                  {order.status === "confirmed" && <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-[#B476FF]  font-medium">Confirmed</span>}
                  {order.status === "rejected" && <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">Rejected</span>}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#B476FF]  hover:bg-[#B476FF]  text-white text-sm font-medium transition"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <XCircle className="text-gray-400 w-10 h-10" />
                    <p>No orders found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onConfirm={(id, confirmedItems, rejectedItems) => {
            if (confirmedItems.length === 0) {
              showToast("⚠️ You must select at least 1 item to confirm", "error");
              return;
            }
            updateOrder(id, { type: "confirmed", confirmedItems, rejectedItems });
          }}
          onReject={(id) => updateOrder(id, { type: "rejected" })}
        />
      )}
    </div>
  );
};

export default OrderConfirm;
