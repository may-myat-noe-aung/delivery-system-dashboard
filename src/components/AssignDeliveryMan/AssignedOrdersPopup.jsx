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
        <h2 className="text-2xl font-semibold text-purple-400 mb-2">
          Delivery #{delivery.id} - {delivery.name}
        </h2>

        {/* ================= DELIVERY INFO ================= */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <h3 className="text-cyan-400 font-semibold mb-3 text-lg">
            Delivery Info
          </h3>

          <div className="grid md:grid-cols-3 gap-3 ">
            {/* <p>ID: {delivery.id}</p> */}
            <p>Name: {delivery.name}</p>
            <p>Email: {delivery.email || "-"}</p>
            <p>Phone: {delivery.phone}</p>
            <p>Work Type: {delivery.work_type || "-"}</p>
            <p>Status: {delivery.status}</p>
            <p>Rating: {delivery.rating}</p>
            <p className="text-blue-400 font-semibold">
              Assign Orders: {delivery.assign_order}
            </p>
            <p className="text-purple-400 font-semibold">
              Current Orders: {delivery.current_orders?.length || "None"}
            </p>
            <p className="text-pink-400 font-semibold">
              Finished: {delivery.finished_order_count}
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
                  <p className="text-sm text-slate-400">
                    {order.name} • {order.type}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-purple-400 text-lg font-semibold">
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
                        <h4 className="text-purple-400 mb-3 font-semibold text-lg">
                          Customer Info
                        </h4>

                        <div className="space-y-2 text-md">
                          <p>
                            <span className="text-slate-400 py-4">
                              User Id:
                            </span>{" "}
                            {order.userId}
                          </p>
                          <p>
                            <span className="text-slate-400 py-4">
                              Shop Id:
                            </span>{" "}
                            {order.shopId}
                          </p>
                          <p>
                            <span className="text-slate-400 py-4">Name:</span>{" "}
                            {order.name}
                          </p>
                          <p>
                            <span className="text-slate-400 py-4">Phone:</span>{" "}
                            {order.phone}
                          </p>
                          <p>
                            <span className="text-slate-400 py-4">
                              Address:
                            </span>{" "}
                            {order.address}
                          </p>
                          <p>
                            <span className="text-slate-400 py-4">Remark:</span>{" "}
                            {order.remark || "-"}
                          </p>
                        </div>
                      </div>

                      {/* PAYMENT INFO */}
                      {/* <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                        <h4 className="text-purple-400 mb-3 font-semibold text-lg">
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
                        </div>

                        <div className="flex items-start justify-between">
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
                      </div> */}
                      {/* PAYMENT INFO */}
                      <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                          {/* LEFT */}
                          <div className="flex-1">
                            <h4 className="text-purple-400 font-semibold text-lg mb-4">
                              Payment Information
                            </h4>

                            <div className="space-y-2">
                              <p>
                                <span className="text-slate-400">Method :</span>{" "}
                                {order.payment_method || "-"}
                              </p>

                              <p>
                                <span className="text-slate-400">Name :</span>{" "}
                                {order.payment_name || "-"}
                              </p>

                              <p>
                                <span className="text-slate-400">Phone :</span>{" "}
                                {order.payment_phone || "-"}
                              </p>
                            </div>

                            <div className="mt-5 text-sm text-slate-400 space-y-1">
                              <p>
                                Created :{" "}
                                {order.created_at
                                  ? new Date(order.created_at).toLocaleString()
                                  : "-"}
                              </p>

                              <p>
                                Pickup :{" "}
                                <span
                                  className={
                                    order.orders_pickup
                                      ? "text-green-400"
                                      : "text-yellow-400"
                                  }
                                >
                                  {order.orders_pickup ? "Done" : "Pending"}
                                </span>
                              </p>

                              <p>
                                Done :{" "}
                                <span
                                  className={
                                    order.orders_done
                                      ? "text-green-400"
                                      : "text-yellow-400"
                                  }
                                >
                                  {order.orders_done ? "Done" : "Pending"}
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* RIGHT */}
                          <div className="flex flex-wrap gap-5">
                            {/* Payment Screenshot */}
                            {order.payment_photo && (
                              <div>
                                <p className="mb-2 text-sm text-slate-400">
                                  Payment Screenshot
                                </p>

                                <img
                                  src={`https://api.pwezayshops.com/${order.payment_photo}`}
                                  className="w-40 h-24 object-cover rounded-xl border border-slate-700 cursor-pointer hover:scale-105 transition"
                                  onClick={() =>
                                    setPreview(
                                      `https://api.pwezayshops.com/${order.payment_photo}`,
                                    )
                                  }
                                />
                              </div>
                            )}

                            {/* Customer Signature */}
                            {order.esign !== null && (
                              <div>
                                <p className="mb-2 text-sm text-slate-400">
                                  Customer Signature
                                </p>

                                <img
                                  src={`https://api.pwezayshops.com/${order.esign}`}
                                  className="w-40 h-24 object-cover rounded-xl border border-slate-700 bg-white cursor-pointer hover:scale-105 transition"
                                  onClick={() =>
                                    setPreview(
                                      `https://api.pwezayshops.com/${order.esign}`,
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= ROW 2 ================= */}
                    <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
                      <h4 className="text-purple-400 mb-4 font-semibold text-lg">
                        Order Items ({order.orders?.length || 0})
                      </h4>

                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                        {order.orders?.map((item, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl border border-slate-700"
                          >
                         <div className=" flex items-center justify-between">
                             <p className="text-white font-medium text-lg">
                              {item.menu_name}
                            </p>

                            <p className=" text-slate-200">
                              Size: {item.size} × {item.quantity}
                            </p>
                         </div>

                            {/* <p className="text-xs text-purple-400 font-semibold">
                              Total: {item.total?.toLocaleString()} Ks
                            </p> */}

                            {item.product_description && (
                              <p className="text-md text-slate-200 mt-1">
                                Note: {item.product_description}
                              </p>
                            )}

                            {/* ingredients */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {item.ingredients?.length > 0 ? (
                                item.ingredients.map((ing, j) => (
                                  <span
                                    key={j}
                                    className="text-md bg-slate-600 px-2 py-1 rounded"
                                  >
                                    {ing.ingredients_name} (+
                                    {ing.ingredients_price})
                                  </span>
                                ))
                              ) : (
                                <span className="text-md text-slate-600">
                                  No Ingredients
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div></div>
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
