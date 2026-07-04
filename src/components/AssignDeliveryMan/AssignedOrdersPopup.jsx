// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function AssignedOrdersPopup({ delivery, close }) {
//   const [openOrders, setOpenOrders] = useState({}); // Track open/close per order item
//   const [preview, setPreview] = useState(null);
//   if (!delivery) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-[#1a2030] w-[90%] max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl text-indigo-400 font-semibold">
//             Deliveryman {delivery.name} ({delivery.id})
//           </h2>
//           <button
//             onClick={close}
//             className="text-gray-400 hover:text-white text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* ================= DELIVERYMAN INFO ================= */}
//         <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
//           <h3 className="text-indigo-400 font-semibold mb-3">
//             Deliveryman Information
//           </h3>
//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p>
//               Name: <span className="text-slate-300">{delivery.name}</span>
//             </p>
//             <p>
//               Email:{" "}
//               <span className="text-slate-300">{delivery.email || "-"}</span>
//             </p>
//             <p>
//               Phone: <span className="text-slate-300">{delivery.phone}</span>
//             </p>
//             <p>
//               Work Type:{" "}
//               <span className="text-slate-300">{delivery.work_type}</span>
//             </p>
//             <p>
//               Status: <span className="text-slate-300">{delivery.status}</span>
//             </p>
//             <p>
//               Rating: <span className="text-yellow-400">{delivery.rating}</span>
//             </p>
//             <p>
//               Finished Orders:{" "}
//               <span className="text-slate-300">
//                 {delivery.finished_order_count}
//               </span>
//             </p>
//             <p>
//               Current Orders:{" "}
//               <span className="text-slate-300">
//                 {delivery.current_orders?.join(", ") || "None"}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* ================= ASSIGNED ORDERS ================= */}
//         {delivery.orders?.map((order, idx) => (
//           <div
//             key={idx}
//             className="bg-[#20223a] rounded-2xl mb-6 overflow-hidden"
//           >
//             {/* Order Header */}
//             <div
//               onClick={() =>
//                 setOpenOrders((prev) => ({
//                   ...prev,
//                   [order.id]: !prev[order.id],
//                 }))
//               }
//               className="flex justify-between items-center p-4 cursor-pointer"
//             >
//               <h3 className="text-indigo-400 font-semibold">
//                 Order {order.id} - {order.name}
//               </h3>
//               {openOrders[order.id] ? (
//                 <ChevronUp className="text-indigo-400" />
//               ) : (
//                 <ChevronDown className="text-indigo-400" />
//               )}
//             </div>

//             {/* Order Details */}
//             {openOrders[order.id] && (
//               <div className="px-4 pb-4 space-y-4 text-sm text-slate-300">
//                 <div className="px-4 pb-4 space-y-6 text-sm text-slate-300">
//                   {/* Order Information */}
//                   <div className="bg-[#1f2336] rounded-xl p-4 border border-slate-700">
//                     <h4 className="text-indigo-400 font-semibold mb-3">
//                       Order Information
//                     </h4>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       <div>
//                         <p className="text-xs text-gray-400">Address</p>
//                         <p>{order.address}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Location</p>
//                         <p>{order.location || "N/A"}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Phone</p>
//                         <p>{order.phone}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Order Type</p>
//                         <p>{order.type}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Total Orders</p>
//                         <p>{order.total_order}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Total Amount</p>
//                         <p className="text-indigo-400 font-semibold">
//                           {order.grand_total?.toLocaleString()} Ks
//                         </p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">
//                           Connected Deliveryman
//                         </p>
//                         <p>{order.connected_deliveryman}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Created At</p>
//                         <p>{order.created_at}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Payment Information */}
//                   <div className="bg-[#1f2336] rounded-xl p-4 border border-slate-700">
//                     <h4 className="text-indigo-400 font-semibold mb-3">
//                       Payment Information
//                     </h4>

//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                       <div>
//                         <p className="text-xs text-gray-400">Payment Method</p>
//                         <p>{order.payment_method}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Payment Phone</p>
//                         <p>{order.payment_phone}</p>
//                       </div>

//                       <div>
//                         <p className="text-xs text-gray-400">Payment Name</p>
//                         <p>{order.payment_name}</p>
//                       </div>
//                     </div>

//                     {/* Payment Photo */}
//                     {order.payment_photo && (
//                       <div className="mt-4">
//                         <p className="text-xs text-gray-400 mb-2">
//                           Payment Screenshot
//                         </p>

//                         <img
//                           src={`https://api.pwezayshops.com/${order.payment_photo}`}
//                           alt="payment"
//                           onClick={() =>
//                             setPreview(
//                               `https://api.pwezayshops.com/${order.payment_photo}`,
//                             )
//                           }
//                           className="rounded-xl border border-slate-700 w-full max-h-60 object-cover hover:opacity-90 cursor-pointer"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Nested Order Items */}
//                 {order.orders?.map((item, itemIdx) => (
//                   <div key={itemIdx} className="border-t border-slate-700 pt-4">
//                     <p className="font-semibold text-white">{item.menu_name}</p>
//                     <p className="text-gray-300 text-sm">
//                       Size {item.size} × {item.quantity}
//                     </p>

//                     {/* Ingredients */}
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {item.ingredients?.length > 0 ? (
//                         item.ingredients.map((ing) => (
//                           <span
//                             key={ing.ingredients_id}
//                             className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg"
//                           >
//                             {ing.ingredients_name} (+{ing.ingredients_price} Ks)
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-xs text-gray-500">
//                           No Ingredients
//                         </span>
//                       )}
//                     </div>

//                     {/* Description */}
//                     {item.product_description && (
//                       <p className="text-xs text-gray-400 mt-1">
//                         Note: {item.product_description}
//                       </p>
//                     )}

//                     <p className="text-indigo-400 font-semibold mt-1">
//                       Total: {item.total?.toLocaleString()} Ks
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//      {preview && (
//   <div
//     className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
//     onClick={() => setPreview(null)}
//   >
//     <img
//       src={preview}
//       alt="preview"
//       className=" max-h-[80vh] rounded-2xl shadow-2xl"
//     />
//   </div>
// )}
//       </div>

//     </div>
//   );
// }

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
        <p><span className="text-slate-400">Name:</span> {order.name}</p>
        <p><span className="text-slate-400">Phone:</span> {order.phone}</p>
        <p><span className="text-slate-400">Address:</span> {order.address}</p>
        <p><span className="text-slate-400">Remark:</span> {order.remark || "-"}</p>
      </div>
    </div>

    {/* PAYMENT INFO */}
    <div className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700 shadow-lg">
      <h4 className="text-indigo-400 mb-3 font-semibold text-lg">
        Payment Info
      </h4>

      <div className="space-y-2">
        <p><span className="text-slate-400">Method:</span> {order.payment_method}</p>
        <p><span className="text-slate-400">Name:</span> {order.payment_name}</p>
        <p><span className="text-slate-400">Phone:</span> {order.payment_phone}</p>
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
              `https://api.pwezayshops.com/${order.payment_photo}`
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
                  {ing.ingredients_name} (+{ing.ingredients_price})
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
                    {" "}
                    {/* PAYMENT */}
                    {/* <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                      <h4 className="text-indigo-400 mb-2 font-semibold">
                        Payment
                      </h4>

                      <p>Method: {order.payment_method}</p>
                      <p>Name: {order.payment_name}</p>
                      <p>Phone: {order.payment_phone}</p>

                      {order.payment_photo && (
                        <img
                          src={`https://api.pwezayshops.com/${order.payment_photo}`}
                          onClick={() =>
                            setPreview(
                              `https://api.pwezayshops.com/${order.payment_photo}`,
                            )
                          }
                          className="w-40 mt-3 rounded-lg border border-slate-700 cursor-pointer hover:scale-105 transition"
                        />
                      )}
                    </div> */}
                    {/* SUMMARY */}
                    {/* <div className="bg-[#1e293b] p-4 rounded-xl border border-slate-700">
                      <h4 className="text-indigo-400 mb-2 font-semibold">
                        Summary
                      </h4>

                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span>{order.discount} Ks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{order.tax} Ks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>{order.delivery_fees} Ks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Extra</span>
                        <span>{order.extra} Ks</span>
                      </div>

                      <div className="border-t border-slate-600 mt-2 pt-2 flex justify-between text-cyan-400 font-bold">
                        <span>Grand Total</span>
                        <span>{order.grand_total?.toLocaleString()} Ks</span>
                      </div>
                    </div> */}
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
