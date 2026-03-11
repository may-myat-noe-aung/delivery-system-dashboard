// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function ReportPopup({ order, close }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-[#1a2030] w-[90%] max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl text-indigo-400 font-semibold">
//             Order {order.id}
//           </h2>

//           <button
//             onClick={close}
//             className="text-gray-400 hover:text-white text-lg"
//           >
//             ✕
//           </button>
//         </div>

//         {/* ================= CUSTOMER INFO ================= */}
//         <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
//           <h3 className="text-indigo-400 font-semibold mb-3">
//             Customer Information
//           </h3>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p>Customer Name: <span className="text-slate-300">{order.name}</span></p>
//             <p>Phone: <span className="text-slate-300">{order.phone}</span></p>
//             <p>Address: <span className="text-slate-300">{order.address}</span></p>
//             <p>Location: <span className="text-slate-300">{order.location}</span></p>
//           </div>
//         </div>

//         {/* ================= ORDER INFO ================= */}
//         <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
//           <h3 className="text-indigo-400 font-semibold mb-3">
//             Order Information
//           </h3>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p>Order ID: <span className="text-slate-300">{order.id}</span></p>
//             <p>Order Type: <span className="text-slate-300">{order.type}</span></p>
//             <p>Total Orders: <span className="text-slate-300">{order.total_order}</span></p>
//             <p>Total Amount: <span className="text-yellow-400">{order.grand_total?.toLocaleString()} Ks</span></p>
//             <p>Discount: {order.discount}</p>
//             <p>Tax: {order.tax}</p>
//             <p>Date: <span className="text-slate-300">{order.created_at}</span></p>
//           </div>
//         </div>

//         {/* ================= DELIVERY / PAYMENT INFO ================= */}
//         <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
//           <h3 className="text-indigo-400 font-semibold mb-3">
//             Delivery / Payment Information
//           </h3>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <p>Payment Method: <span className="text-slate-300">{order.payment_method}</span></p>
//             <p>Payment Phone: <span className="text-slate-300">{order.payment_phone}</span></p>
//             <p>Payment Name: <span className="text-slate-300">{order.payment_name}</span></p>
//             <p>Connected Deliveryman: <span className="text-slate-300">{order.connected_deliveryman}</span></p>
//           </div>
//         </div>

//         {/* ================= PHOTOS ================= */}
//         <div className="grid grid-cols-2 gap-6 mb-6">

//           {order.payment_photo && (
//             <div>
//               <p className="text-sm text-gray-400 mb-2">Payment Photo</p>
//               <img
//                 src={`http://38.60.244.137:3000/${order.payment_photo}`}
//                 alt="payment"
//                 className="rounded-xl border border-slate-700 w-full h-48 object-cover"
//               />
//             </div>
//           )}

//           {order.esign && (
//             <div>
//               <p className="text-sm text-gray-400 mb-2">Customer Signature</p>
//               <img
//                 src={`http://38.60.244.137:3000/${order.esign}`}
//                 alt="esign"
//                 className="rounded-xl border border-slate-700 w-full h-48 object-contain bg-white"
//               />
//             </div>
//           )}

//         </div>

//         {/* ================= ORDER ITEMS ================= */}
//         <div className="bg-[#20223a] rounded-2xl overflow-hidden">

//           <div
//             onClick={() => setOpen(!open)}
//             className="flex justify-between items-center p-4 cursor-pointer"
//           >
//             <h3 className="text-indigo-400 font-semibold">
//               Order Items
//             </h3>

//             {open ? (
//               <ChevronUp className="text-indigo-400" />
//             ) : (
//               <ChevronDown className="text-indigo-400" />
//             )}
//           </div>

//           {open && (
//             <div className="px-4 pb-4">

//               {order.orders?.map((item, i) => (
//                 <div
//                   key={i}
//                   className="border-b border-slate-700 py-4 flex justify-between"
//                 >
//                   <div>

//                     <p className="font-semibold text-white">
//                       {item.menu_name}
//                     </p>

//                     <p className="text-sm text-gray-300">
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
//                       <p className="text-xs text-gray-400 mt-2">
//                         Note: {item.product_description}
//                       </p>
//                     )}

//                   </div>

//                   <div className="text-indigo-400 font-semibold">
//                     {item.total?.toLocaleString()} Ks
//                   </div>

//                 </div>
//               ))}

//             </div>
//           )}

//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import ReportPopup from "./ReportPopup";

export default function ReportTable() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://38.60.244.137:3000/report");
        const data = await res.json();

        if (data.success) {
          // API response: data.data[i].order
          const fetchedOrders = data.data.map(d => d.order);
          setOrders(fetchedOrders);
          setError("");
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

    fetchOrders();
  }, []);

  return (
    <div className="text-white mt-8 mb-8">

      <h2 className="text-2xl text-[#B476FF] font-semibold mb-6">
        Report Orders
      </h2>

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-slate-400 py-10">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#1a2030]/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-6">
          <table className="w-full text-sm">
            <thead className="text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-4 text-left">Order ID</th>
                <th className="py-4 text-left">Customer</th>
                <th className="py-4 text-left">Phone</th>
                <th className="py-4 text-left">Location</th>
                <th className="py-4 text-left">Type</th>
                <th className="py-4 text-left">Total</th>
                <th className="py-4 text-left">Payment Method</th>
                <th className="py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="py-4 font-semibold text-cyan-400">{order.id}</td>
                  <td className="py-4 text-slate-300">{order.name}</td>
                  <td className="py-4 text-slate-300">{order.phone}</td>
                  <td className="py-4 text-slate-300">{order.location}</td>
                  <td className="py-4 text-indigo-400">{order.type}</td>
                  <td className="py-4 text-yellow-400">
                    {order.grand_total?.toLocaleString()} Ks
                  </td>
                  <td className="py-4 text-purple-400">{order.payment_method}</td>
                  <td className="py-4 flex gap-2 items-center">
                    <button
                      onClick={() => setSelected(order)}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= POPUP ================= */}
      {selected && <ReportPopup order={selected} close={() => setSelected(null)} />}

    </div>
  );
}