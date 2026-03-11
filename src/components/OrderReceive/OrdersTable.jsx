
// import React, { useState } from "react";

// export default function OrdersTable() {
//   const orders = [
//     {
//       id: "ORD-102938",
//       status: "PENDING",
//       customer: {
//         name: "Aung Min Htet",
//         phone: "09 777 123 456",
//         type: "Regular",
//         address: "Hlaing Township (16.8409, 96.1735)",
//         remark: "Please make less spicy",
//       },
//       items: [
//         { name: "Chicken Burger", size: "Large", qty: 2, ingredients: ["Cheese", "Bacon"] },
//         { name: "French Fries", size: "Medium", qty: 1, ingredients: ["Ketchup"] },
//       ],
//       payment: {
//         method: "KBZPay",
//         accountName: "Su Su",
//         number: "0944555666",
//         photos: [
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQww0jN07_uTf6ioL3PhmLL_t6xupnHmL5_Eg&s",
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQww0jN07_uTf6ioL3PhmLL_t6xupnHmL5_Eg&s",
//         ],
//       },
//       total: 12000,
//     },
//     {
//       id: "ORD-102939",
//       status: "CONFIRMED",
//       customer: { name: "Su Su", phone: "09 444 555 666", type: "VIP", address: "Sanchaung Township", remark: "" },
//       items: [
//         { name: "Chicken Burger", size: "Large", qty: 2, ingredients: ["Cheese", "Bacon"] },
//         { name: "French Fries", size: "Medium", qty: 1, ingredients: ["Ketchup"] },
//       ],
//       payment: { method: "KBZPay", accountName: "Su Su" },
//       total: 8500,
//     },
//   ];

//   const [openId, setOpenId] = useState(null);
//   const [selectedItems, setSelectedItems] = useState({});

//   const toggleItem = (orderId, index) => {
//     setSelectedItems((prev) => {
//       const current = prev[orderId] || [];
//       return {
//         ...prev,
//         [orderId]: current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
//       };
//     });
//   };

//   const toggleSelectAll = (orderId, itemsLength) => {
//     setSelectedItems((prev) => {
//       const allIndexes = [...Array(itemsLength).keys()];
//       const isAllSelected = prev[orderId]?.length === itemsLength;
//       return {
//         ...prev,
//         [orderId]: isAllSelected ? [] : allIndexes,
//       };
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 text-gray-800">
//       <h1 className="mb-6 text-2xl font-semibold">Orders</h1>

//       <div className="overflow-x-auto rounded-2xl border">
//         <table className="w-full border-collapse text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <th className="p-3 text-left">Order ID</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-right">Total</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <React.Fragment key={order.id}>
//                 <tr className="border-t">
//                   <td className="p-3 font-medium">{order.id}</td>
//                   <td className="p-3">{order.customer.name}</td>
//                   <td className="p-3">{order.customer.phone}</td>
//                   <td className="p-3">
//                     <span className="rounded-full bg-[#F3EBFF] px-3 py-1 text-xs font-medium text-[#B476FF]">
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-right">{order.total} MMK</td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => setOpenId(openId === order.id ? null : order.id)}
//                       className="rounded-lg border border-[#B476FF] px-3 py-1 text-xs text-[#B476FF]"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>

//                 {openId === order.id && (
//                   <tr className="bg-gray-50">
//                     <td colSpan={6} className="p-4">
//                       <div className="grid gap-4 md:grid-cols-3">
//                         {/* Customer Info */}
//                         <DetailCard title="Customer Info">
//                           <p>Name: {order.customer.name}</p>
//                           <p>Type: {order.customer.type}</p>
//                           <p>Address: {order.customer.address}</p>
//                           {order.customer.remark && <p>Remark: {order.customer.remark}</p>}
//                         </DetailCard>

//                         {/* Order Items */}
//                         <DetailCard title="Order Items">
//                           {/* Select All */}
//                           <div
//                             onClick={() => toggleSelectAll(order.id, order.items.length)}
//                             className="mb-4 flex cursor-pointer items-center justify-between rounded-xl border border-[#B476FF]/30 bg-[#F9F5FF] px-4 py-3"
//                           >
//                             <span className="font-medium text-[#B476FF]">Select All Items</span>
//                             <div
//                               className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
//                                 selectedItems[order.id]?.length === order.items.length
//                                   ? "border-[#B476FF] bg-[#B476FF]"
//                                   : "border-[#B476FF]/40"
//                               }`}
//                             >
//                               {selectedItems[order.id]?.length === order.items.length && (
//                                 <div className="h-2 w-2 rounded-sm bg-white" />
//                               )}
//                             </div>
//                           </div>

//                           {/* Items List */}
//                           <div className="space-y-4">
//                             {order.items.map((item, idx) => {
//                               const isChecked = selectedItems[order.id]?.includes(idx);
//                               return (
//                                 <div
//                                   key={idx}
//                                   onClick={() => toggleItem(order.id, idx)}
//                                   className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition ${
//                                     isChecked ? "border-[#B476FF] bg-[#F3EBFF]" : "border-gray-200 hover:border-[#B476FF]/40"
//                                   }`}
//                                 >
//                                   <div
//                                     className={`mt-1 flex h-5 w-5 items-center justify-center rounded-md border-2 ${
//                                       isChecked ? "border-[#B476FF] bg-[#B476FF]" : "border-gray-300"
//                                     }`}
//                                   >
//                                     {isChecked && <div className="h-2 w-2 rounded-sm bg-white" />}
//                                   </div>

//                                   <div className="flex-1 space-y-1 text-sm">
//                                     <p className="font-semibold text-[#B476FF]">{item.name}</p>
//                                     <div className="flex flex-wrap gap-4 text-gray-600">
//                                       <span>Size: {item.size}</span>
//                                       <span>Qty: {item.qty}</span>
//                                     </div>
//                                     <p className="text-xs text-gray-500">
//                                       Ingredients: {item.ingredients.join(", ")}
//                                     </p>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>

//                           {/* Actions */}
//                           <div className="mt-6 flex justify-end gap-3">
//                             <button
//                               onClick={() => console.log("REJECT", selectedItems[order.id])}
//                               className="rounded-xl border border-red-300 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
//                             >
//                               Reject
//                             </button>
//                             <button
//                               onClick={() => console.log("ACCEPT", selectedItems[order.id])}
//                               className="rounded-xl bg-[#B476FF] px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90"
//                             >
//                               Accept Selected
//                             </button>
//                           </div>
//                         </DetailCard>

//                         {/* Payment */}
//                         <DetailCard title="Payment">
//                           <p>Method: {order.payment.method}</p>
//                           <p>Account: {order.payment.accountName}</p>
//                           {order.payment.number && <p>Number: {order.payment.number}</p>}

//                           {order.payment.photos?.length > 0 && (
//                             <div className="mt-4 flex flex-wrap gap-2">
//                               {order.payment.photos.map((photo, idx) => (
//                                 <img key={idx} src={photo} alt={`Payment ${idx + 1}`} className="w-44 rounded-lg border object-cover" />
//                               ))}
//                             </div>
//                           )}
//                         </DetailCard>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function DetailCard({ title, children }) {
//   return (
//     <div className="rounded-xl border bg-white p-4 shadow-sm">
//       <h3 className="mb-2 font-semibold">{title}</h3>
//       <div className="space-y-1 text-sm text-gray-700">{children}</div>
//     </div>
//   );
// }


// import React, { useState } from "react";

// export default function OrdersTable({ darkMode = false }) {
//   const initialOrders = [
//     {
//       id: "ORD-102938",
//       status: "PENDING",
//       customer: { name: "Aung Min Htet", phone: "09 777 123 456", type: "Regular", address: "Hlaing Township", remark: "Please make less spicy" },
//       items: [
//         { name: "Chicken Burger", size: "Large", qty: 2, ingredients: ["Cheese", "Bacon"] },
//         { name: "French Fries", size: "Medium", qty: 1, ingredients: ["Ketchup"] },
//       ],
//       payment: { method: "KBZPay", accountName: "Su Su", number: "0944555666" },
//       total: 12000,
//     },
//     {
//       id: "ORD-102939",
//       status: "CONFIRMED",
//       customer: { name: "Su Su", phone: "09 444 555 666", type: "VIP", address: "Sanchaung Township", remark: "" },
//       items: [
//         { name: "Chicken Burger", size: "Large", qty: 2, ingredients: ["Cheese", "Bacon"] },
//         { name: "French Fries", size: "Medium", qty: 1, ingredients: ["Ketchup"] },
//       ],
//       payment: { method: "KBZPay", accountName: "Su Su" },
//       total: 8500,
//     },
//   ];

//   const [orders, setOrders] = useState(initialOrders);
//   const [openId, setOpenId] = useState(null);
//   const [selectedItems, setSelectedItems] = useState({});

//   const toggleItem = (orderId, index) => {
//     setSelectedItems((prev) => {
//       const current = prev[orderId] || [];
//       return {
//         ...prev,
//         [orderId]: current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
//       };
//     });
//   };

//   const toggleSelectAll = (orderId, itemsLength) => {
//     setSelectedItems((prev) => {
//       const allIndexes = [...Array(itemsLength).keys()];
//       const isAllSelected = prev[orderId]?.length === itemsLength;
//       return { ...prev, [orderId]: isAllSelected ? [] : allIndexes };
//     });
//   };

//   const handleAccept = (orderId) => {
//     setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "ACCEPTED" } : o)));
//     setSelectedItems((prev) => ({ ...prev, [orderId]: [] }));
//   };

//   const handleReject = (orderId) => {
//     setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "REJECTED" } : o)));
//     setSelectedItems((prev) => ({ ...prev, [orderId]: [] }));
//   };

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} min-h-screen p-6`}>
//       <h1 className="mb-6 text-2xl font-semibold">Orders</h1>

//       <div className={`overflow-x-auto rounded-2xl border ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
//         <table className="w-full border-collapse text-sm">
//           <thead className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
//             <tr>
//               <th className="p-3 text-left">Order ID</th>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-right">Total</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <React.Fragment key={order.id}>
//                 <tr className={`${darkMode ? "border-gray-700" : "border-t"}`}>
//                   <td className="p-3 font-medium">{order.id}</td>
//                   <td className="p-3">{order.customer.name}</td>
//                   <td className="p-3">{order.customer.phone}</td>
//                   <td className="p-3">
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-medium ${
//                         order.status === "PENDING"
//                           ? "bg-[#F3EBFF] text-[#B476FF]"
//                           : order.status === "ACCEPTED"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-500"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-right">{order.total} MMK</td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => setOpenId(openId === order.id ? null : order.id)}
//                       className="rounded-lg border border-[#B476FF] px-3 py-1 text-xs text-[#B476FF]"
//                     >
//                       Details
//                     </button>
//                   </td>
//                 </tr>

//                 {openId === order.id && (
//                   <tr className={`${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
//                     <td colSpan={6} className="p-4">
//                       <div className="grid gap-4 md:grid-cols-3">
//                         <DetailCard title="Customer Info" darkMode={darkMode}>
//                           <p>Name: {order.customer.name}</p>
//                           <p>Type: {order.customer.type}</p>
//                           <p>Address: {order.customer.address}</p>
//                           {order.customer.remark && <p>Remark: {order.customer.remark}</p>}
//                         </DetailCard>

//                         <DetailCard title="Order Items" darkMode={darkMode}>
//                           <div
//                             onClick={() => toggleSelectAll(order.id, order.items.length)}
//                             className={`mb-4 flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 ${
//                               darkMode
//                                 ? "border-[#B476FF]/40 bg-gray-700 text-gray-100"
//                                 : "border-[#B476FF]/30 bg-[#F9F5FF] text-gray-800"
//                             }`}
//                           >
//                             <span className="font-medium text-[#B476FF]">Select All Items</span>
//                             <div
//                               className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
//                                 selectedItems[order.id]?.length === order.items.length
//                                   ? "border-[#B476FF] bg-[#B476FF]"
//                                   : "border-[#B476FF]/40"
//                               }`}
//                             >
//                               {selectedItems[order.id]?.length === order.items.length && (
//                                 <div className="h-2 w-2 rounded-sm bg-white" />
//                               )}
//                             </div>
//                           </div>

//                           <div className="space-y-4">
//                             {order.items.map((item, idx) => {
//                               const isChecked = selectedItems[order.id]?.includes(idx);
//                               return (
//                                 <div
//                                   key={idx}
//                                   onClick={() => toggleItem(order.id, idx)}
//                                   className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition ${
//                                     isChecked
//                                       ? "border-[#B476FF] bg-[#F3EBFF]"
//                                       : darkMode
//                                       ? "border-gray-600 hover:border-[#B476FF]/40"
//                                       : "border-gray-200 hover:border-[#B476FF]/40"
//                                   }`}
//                                 >
//                                   <div
//                                     className={`mt-1 flex h-5 w-5 items-center justify-center rounded-md border-2 ${
//                                       isChecked ? "border-[#B476FF] bg-[#B476FF]" : "border-gray-300"
//                                     }`}
//                                   >
//                                     {isChecked && <div className="h-2 w-2 rounded-sm bg-white" />}
//                                   </div>

//                                   <div className="flex-1 space-y-1 text-sm">
//                                     <p className="font-semibold text-[#B476FF]">{item.name}</p>
//                                     <div className="flex flex-wrap gap-4 text-gray-600">{/* Tailwind color auto-adjust */}</div>
//                                     <p className="text-xs text-gray-500">
//                                       Ingredients: {item.ingredients.join(", ")}
//                                     </p>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>

//                           <div className="mt-6 flex justify-end gap-3">
//                             <button
//                               onClick={() => handleReject(order.id)}
//                               className="rounded-xl border border-red-300 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
//                             >
//                               Reject
//                             </button>
//                             <button
//                               onClick={() => handleAccept(order.id)}
//                               className="rounded-xl bg-[#B476FF] px-5 py-2 text-sm font-medium text-white shadow hover:opacity-90"
//                             >
//                               Accept Selected
//                             </button>
//                           </div>
//                         </DetailCard>

//                         <DetailCard title="Payment" darkMode={darkMode}>
//                           <p>Method: {order.payment.method}</p>
//                           <p>Account: {order.payment.accountName}</p>
//                           {order.payment.number && <p>Number: {order.payment.number}</p>}
//                         </DetailCard>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function DetailCard({ title, children, darkMode }) {
//   return (
//     <div className={`rounded-xl border p-4 shadow-sm ${darkMode ? "border-gray-700 bg-gray-800 text-gray-100" : "border-gray-200 bg-white text-gray-700"}`}>
//       <h3 className="mb-2 font-semibold">{title}</h3>
//       <div className="space-y-1 text-sm">{children}</div>
//     </div>
//   );
// }

import React from "react";

export default function OrdersTable({ orders = [], onAccept, onReject }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#B476FF]">
          Food Orders
        </h2>
        <span className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#B476FF] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-50 transition">
                
                {/* Order ID */}
                <td className="px-6 py-4 font-semibold">
                  #{order.id}
                </td>

                {/* Customer */}
                <td className="px-6 py-4">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-gray-500 text-xs">{order.phone}</p>
                  <p className="text-gray-400 text-xs">{order.address}</p>
                </td>

                {/* Items */}
                <td className="px-6 py-4">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-gray-600">
                      {item.name} × {item.qty}
                    </p>
                  ))}
                </td>

                {/* Payment */}
                <td className="px-6 py-4">
                  <p className="font-medium">{order.paymentMethod}</p>
                  <p
                    className={`text-xs font-semibold ${
                      order.paid ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {order.paid ? "Paid" : "Unpaid"}
                  </p>
                </td>

                {/* Total */}
                <td className="px-6 py-4 font-bold text-[#B476FF]">
                  {order.total.toLocaleString()} MMK
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium">
                    Pending
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => onAccept(order)}
                    className="px-3 py-1.5 rounded-lg bg-[#B476FF] text-white text-xs hover:opacity-90 transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => onReject(order)}
                    className="px-3 py-1.5 rounded-lg border border-red-500 text-red-500 text-xs hover:bg-red-50 transition"
                  >
                    Reject
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

