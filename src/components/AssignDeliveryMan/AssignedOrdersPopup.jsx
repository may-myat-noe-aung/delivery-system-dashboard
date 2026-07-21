import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AssignedOrdersPopup({ delivery, close }) {
  const [openOrders, setOpenOrders] = useState({});
  const [preview, setPreview] = useState(null);

  if (!delivery) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] border border-slate-700 rounded-3xl p-6 w-full max-w-5xl text-white shadow-2xl max-h-[90vh] overflow-y-auto relative">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-5 w-9 h-9 flex items-center justify-center
          bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white
          rounded-full transition"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-indigo-400 mb-6">
          Delivery #{delivery.id} - {delivery.name}
        </h2>

        {/* ================= DELIVERY INFO ================= */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <h3 className="text-cyan-400 font-semibold mb-3">Delivery Info</h3>

          <div className="grid md:grid-cols-3 gap-3 text-sm">
            {/* <p>ID: {delivery.id}</p> */}
            <p>Name: {delivery.name}</p>
            <p>Email: {delivery.email || "-"}</p>
            <p>Phone: {delivery.phone}</p>
            <p>Work Type: {delivery.work_type || "-"}</p>
            <p>Status: {delivery.status}</p>
            <p>Rating: {delivery.rating}</p>
            <p>Finished: {delivery.finished_order_count}</p>
            <p>Assign Orders: {delivery.assign_order}</p>
            <p>
              Current Orders: {delivery.current_orders?.join(", ") || "None"}
            </p>
          </div>
        </div>

        {/* ================= ORDERS ================= */}
        {delivery.orders?.map((order, idx) => {
          const isOpen = openOrders[order.id];

          return (
            <div
              key={idx}
              className="bg-slate-800 rounded-2xl mb-4 overflow-hidden border border-slate-700"
            >
              {/* ORDER HEADER */}
              <div
                onClick={() =>
                  setOpenOrders((prev) => ({
                    ...prev,
                    [order.id]: !prev[order.id],
                  }))
                }
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-700 transition"
              >
                <div>
                  <h3 className="text-cyan-400 font-semibold">
                    Order #{order.id}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {order.name} • {order.type}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 font-semibold">
                    {order.grand_total?.toLocaleString()} Ks
                  </span>
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* ORDER BODY */}
              {isOpen && (
                <>
                  <div className="text-sm text-slate-300 space-y-5">
                    {/* ================= ROW 1 ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* CUSTOMER INFO */}
                      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                        <h4 className="text-indigo-400 mb-3 font-semibold text-lg">
                          Customer Info
                        </h4>

                        <div className="space-y-2">
                          <p>
                            <span className="text-slate-400">Name:</span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-slate-400">Phone:</span>{" "}
                            {order.phone}
                          </p>
                          <p>
                            <span className="text-slate-400">Address:</span>{" "}
                            {order.address}
                          </p>
                          <p>
                            <span className="text-slate-400">Remark:</span>{" "}
                            {order.remark || "-"}
                          </p>
                        </div>
                      </div>

                      {/* PAYMENT INFO */}
                      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                        <h4 className="text-indigo-400 mb-3 font-semibold text-lg">
                          Payment Info
                        </h4>

                        <div className="space-y-2">
                          <p>
                            <span className="text-slate-400">Method:</span>{" "}
                            {order.payment_method}
                          </p>
                          <p>
                            <span className="text-slate-400">Name:</span>{" "}
                            {order.payment_name}
                          </p>
                          <p>
                            <span className="text-slate-400">Phone:</span>{" "}
                            {order.payment_phone}
                          </p>
                          <p className="text-indigo-400 font-semibold">
                            Total: {order.grand_total?.toLocaleString()} Ks
                          </p>
                        </div>

                        {order.payment_photo && (
                          <img
                            src={`https://api.pwezayshops.com/${order.payment_photo}`}
                            className="w-40 mt-3 rounded-lg border border-slate-700 cursor-pointer hover:scale-105 transition"
                            onClick={() =>
                              setPreview(
                                `https://api.pwezayshops.com/${order.payment_photo}`,
                              )
                            }
                          />
                        )}
                      </div>
                    </div>

                    {/* ================= ROW 2 ================= */}
                    <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                      <h4 className="text-indigo-400 mb-4 font-semibold text-lg">
                        Order Items ({order.orders?.length || 0})
                      </h4>

                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                        {order.orders?.map((item, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-slate-700"
                          >
                            <p className="text-white font-medium">
                              {item.menu_name}
                            </p>

                            <p className="text-xs text-slate-400">
                              Size: {item.size} × {item.quantity}
                            </p>

                            <p className="text-xs text-indigo-400 font-semibold">
                              Total: {item.total?.toLocaleString()} Ks
                            </p>

                            {item.product_description && (
                              <p className="text-xs text-slate-500 mt-1">
                                Note: {item.product_description}
                              </p>
                            )}

                            {/* ingredients */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {item.ingredients?.length > 0 ? (
                                item.ingredients.map((ing, j) => (
                                  <span
                                    key={j}
                                    className="text-xs bg-slate-700 px-2 py-1 rounded"
                                  >
                                    {ing.ingredients_name} (+
                                    {ing.ingredients_price})
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500">
                                  No Ingredients
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* IMAGE PREVIEW */}
        {preview && (
          <div
            onClick={() => setPreview(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
          >
            <img src={preview} className="max-h-[85vh] rounded-xl shadow-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}
