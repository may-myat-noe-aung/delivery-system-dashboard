// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function AssignedOrdersPopup({ delivery, close }) {
//   const totalRevenue = delivery.orders.reduce(
//     (sum, o) => sum + (o.grand_total || 0),
//     0,
//   );

//   // Track open/closed state for each order (default closed)
//   const [openOrders, setOpenOrders] = useState(
//     delivery.orders.reduce((acc, order) => {
//       acc[order.id] = false; // default all closed
//       return acc;
//     }, {}),
//   );

//   const toggleOrder = (orderId) => {
//     setOpenOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-[#1a2030] w-[90%] max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl text-indigo-400 font-semibold">
//             {delivery.name} - Assigned Orders
//           </h2>
//           <button
//             onClick={close}
//             className="px-4 py-2 rounded-xl text-gray-400 hover:text-white text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Orders */}
//         {delivery.orders.map((order) => (
//           <div
//             key={order.id}
//             className="mt-6 bg-[#20223a] rounded-2xl overflow-hidden"
//           >
//             {/* Order Header */}
//             <div
//               className="flex justify-between items-center p-4 cursor-pointer"
//               onClick={() => toggleOrder(order.id)}
//             >
//               <h3 className="text-indigo-400 font-semibold">
//                 Order #{order.id} Items
//               </h3>

//               <div className="flex items-center gap-3">
//                 {/* Grand Total */}
//                 <span className="text-indigo-400 font-semibold">
//                   {order.grand_total?.toLocaleString()} Ks
//                 </span>

//                 {/* Arrow */}
//                 {openOrders[order.id] ? (
//                   <ChevronUp className="w-5 h-5 text-indigo-400" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-indigo-400" />
//                 )}
//               </div>
//             </div>

//             {/* Order Items */}
//             {openOrders[order.id] && (
//               <div className="px-4 pb-4">
//                 {order.orders.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between border-b border-slate-700 py-2"
//                   >
//                     <div className="flex items-center justify-between gap-4">
//                       <p className="font-semibold">{item.menu_name}</p>
//                       <p className="text-sm text-gray-300">
//                         Size: {item.size} × {item.quantity}
//                       </p>
//                       <div className="mt-1">
//                         {item.ingredients.length > 0 ? (
//                           item.ingredients.map((ing) => (
//                             <span
//                               key={ing.ingredients_id}
//                               className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg mr-1 mb-1"
//                             >
//                               {ing.ingredients_name}
//                             </span>
//                           ))
//                         ) : (
//                           <span className="text-xs text-gray-500">
//                             No Ingredients
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-300">
//                         {item.product_description}
//                       </p>
//                     </div>
//                     <div className="text-indigo-400 font-semibold">
//                       {item.total.toLocaleString()} Ks
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AssignedOrdersPopup({ delivery, close }) {
  const [openOrders, setOpenOrders] = useState({}); // Track open/close per order item
  const [preview, setPreview] = useState(null);
  if (!delivery) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a2030] w-[90%] max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-indigo-400 font-semibold">
            Deliveryman {delivery.name} ({delivery.id})
          </h2>
          <button
            onClick={close}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* ================= DELIVERYMAN INFO ================= */}
        <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
          <h3 className="text-indigo-400 font-semibold mb-3">
            Deliveryman Information
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              Name: <span className="text-slate-300">{delivery.name}</span>
            </p>
            <p>
              Email:{" "}
              <span className="text-slate-300">{delivery.email || "-"}</span>
            </p>
            <p>
              Phone: <span className="text-slate-300">{delivery.phone}</span>
            </p>
            <p>
              Work Type:{" "}
              <span className="text-slate-300">{delivery.work_type}</span>
            </p>
            <p>
              Status: <span className="text-slate-300">{delivery.status}</span>
            </p>
            <p>
              Rating: <span className="text-yellow-400">{delivery.rating}</span>
            </p>
            <p>
              Finished Orders:{" "}
              <span className="text-slate-300">
                {delivery.finished_order_count}
              </span>
            </p>
            <p>
              Current Orders:{" "}
              <span className="text-slate-300">
                {delivery.current_orders?.join(", ") || "None"}
              </span>
            </p>
          </div>
        </div>

        {/* ================= ASSIGNED ORDERS ================= */}
        {delivery.orders?.map((order, idx) => (
          <div
            key={idx}
            className="bg-[#20223a] rounded-2xl mb-6 overflow-hidden"
          >
            {/* Order Header */}
            <div
              onClick={() =>
                setOpenOrders((prev) => ({
                  ...prev,
                  [order.id]: !prev[order.id],
                }))
              }
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <h3 className="text-indigo-400 font-semibold">
                Order {order.id} - {order.name}
              </h3>
              {openOrders[order.id] ? (
                <ChevronUp className="text-indigo-400" />
              ) : (
                <ChevronDown className="text-indigo-400" />
              )}
            </div>

            {/* Order Details */}
            {openOrders[order.id] && (
              <div className="px-4 pb-4 space-y-4 text-sm text-slate-300">
                <div className="px-4 pb-4 space-y-6 text-sm text-slate-300">
                  {/* Order Information */}
                  <div className="bg-[#1f2336] rounded-xl p-4 border border-slate-700">
                    <h4 className="text-indigo-400 font-semibold mb-3">
                      Order Information
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Address</p>
                        <p>{order.address}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p>{order.location || "N/A"}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p>{order.phone}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Order Type</p>
                        <p>{order.type}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Total Orders</p>
                        <p>{order.total_order}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Total Amount</p>
                        <p className="text-indigo-400 font-semibold">
                          {order.grand_total?.toLocaleString()} Ks
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Connected Deliveryman
                        </p>
                        <p>{order.connected_deliveryman}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Created At</p>
                        <p>{order.created_at}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-[#1f2336] rounded-xl p-4 border border-slate-700">
                    <h4 className="text-indigo-400 font-semibold mb-3">
                      Payment Information
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-gray-400">Payment Method</p>
                        <p>{order.payment_method}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Payment Phone</p>
                        <p>{order.payment_phone}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Payment Name</p>
                        <p>{order.payment_name}</p>
                      </div>
                    </div>

                    {/* Payment Photo */}
                    {order.payment_photo && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-400 mb-2">
                          Payment Screenshot
                        </p>

                        <img
                          src={`http://38.60.244.137:3000/${order.payment_photo}`}
                          alt="payment"
                          onClick={() =>
                            setPreview(
                              `http://38.60.244.137:3000/${order.payment_photo}`,
                            )
                          }
                          className="rounded-xl border border-slate-700 w-full max-h-60 object-cover hover:opacity-90 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Nested Order Items */}
                {order.orders?.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-t border-slate-700 pt-4">
                    <p className="font-semibold text-white">{item.menu_name}</p>
                    <p className="text-gray-300 text-sm">
                      Size {item.size} × {item.quantity}
                    </p>

                    {/* Ingredients */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.ingredients?.length > 0 ? (
                        item.ingredients.map((ing) => (
                          <span
                            key={ing.ingredients_id}
                            className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg"
                          >
                            {ing.ingredients_name} (+{ing.ingredients_price} Ks)
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">
                          No Ingredients
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {item.product_description && (
                      <p className="text-xs text-gray-400 mt-1">
                        Note: {item.product_description}
                      </p>
                    )}

                    <p className="text-indigo-400 font-semibold mt-1">
                      Total: {item.total?.toLocaleString()} Ks
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
     {preview && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
    onClick={() => setPreview(null)}
  >
    <img
      src={preview}
      alt="preview"
      className=" max-h-[80vh] rounded-2xl shadow-2xl"
    />
  </div>
)}
      </div>

    </div>
  );
}
