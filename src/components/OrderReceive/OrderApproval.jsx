import React, { useState } from "react";
import { Check, X, User, Utensils } from "lucide-react";

const OrderApproval = () => {
  // Mock orders
  const [orders, setOrders] = useState([
    { id: 1, customer: "Aung Aung", items: ["Burger", "Fries"], status: "pending" },
    { id: 2, customer: "Su Su", items: ["Pizza"], status: "pending" },
    { id: 3, customer: "Ko Ko", items: ["Milk Tea", "Cake"], status: "confirmed" },
  ]);

  // Confirm & Reject
  const handleUpdate = (id, action) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: action } : order
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🍔 Order Management</h1>
        <p className="text-gray-500">Review, confirm, or reject incoming orders</p>
      </div>

      {/* Pending Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🕒 Pending Orders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {orders.filter((o) => o.status === "pending").length === 0 && (
            <p className="text-gray-500">No pending orders 🎉</p>
          )}

          {orders
            .filter((o) => o.status === "pending")
            .map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 shadow-md rounded-2xl p-5 bg-white hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <User className="text-gray-500" />
                  <h3 className="text-lg font-medium">
                    #{order.id} - {order.customer}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Utensils size={16} />
                  <span>Items: {order.items.join(", ")}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleUpdate(order.id, "confirmed")}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    <Check size={18} /> Confirm
                  </button>
                  <button
                    onClick={() => handleUpdate(order.id, "rejected")}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                  >
                    <X size={18} /> Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Confirmed Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">✅ Confirmed Orders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {orders.filter((o) => o.status === "confirmed").length === 0 && (
            <p className="text-gray-500">No confirmed orders yet</p>
          )}

          {orders
            .filter((o) => o.status === "confirmed")
            .map((order) => (
              <div
                key={order.id}
                className="border border-green-200 bg-green-50 shadow-sm rounded-2xl p-5"
              >
                <h3 className="text-lg font-medium">
                  #{order.id} - {order.customer}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Items: {order.items.join(", ")}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* Rejected Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">❌ Rejected Orders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {orders.filter((o) => o.status === "rejected").length === 0 && (
            <p className="text-gray-500">No rejected orders</p>
          )}

          {orders
            .filter((o) => o.status === "rejected")
            .map((order) => (
              <div
                key={order.id}
                className="border border-red-200 bg-red-50 shadow-sm rounded-2xl p-5"
              >
                <h3 className="text-lg font-medium">
                  #{order.id} - {order.customer}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Items: {order.items.join(", ")}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default OrderApproval;
