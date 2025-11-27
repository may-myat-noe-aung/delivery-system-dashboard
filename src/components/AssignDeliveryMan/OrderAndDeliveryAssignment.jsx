// import React, { useState } from "react";
// import { CheckCircle } from "lucide-react";

// const AdminRestaurantOrderAssignment = () => {
//   const [orders, setOrders] = useState([
//     { id: 1, restaurant: "Pizza Hut", items: ["Pizza", "Coke"], status: "confirmed", createdAt: "10:00 AM" },
//     { id: 2, restaurant: "Burger King", items: ["Burger", "Fries"], status: "confirmed", createdAt: "10:05 AM" },
//     { id: 3, restaurant: "KFC", items: ["Chicken Bucket"], status: "pending", createdAt: "10:10 AM" },
//     { id: 4, restaurant: "Pizza Hut", items: ["Pasta"], status: "confirmed", createdAt: "10:15 AM" },
//   ]);

//   const [deliveryMen, setDeliveryMen] = useState([
//     { id: 101, name: "Hla Hla", status: "active", currentOrderId: null },
//     { id: 102, name: "Ko Ko", status: "active", currentOrderId: 2 },
//     { id: 103, name: "Mya Mya", status: "active", currentOrderId: null },
//     { id: 104, name: "Nyi Nyi", status: "offline", currentOrderId: null },
//   ]);

//   const [restaurantFilter, setRestaurantFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchDM, setSearchDM] = useState("");

//   const assignDeliveryMan = (orderId, deliveryManId) => {
//     setOrders(prev =>
//       prev.map(order =>
//         order.id === orderId ? { ...order, status: "out-for-delivery" } : order
//       )
//     );
//     setDeliveryMen(prev =>
//       prev.map(dm =>
//         dm.id === deliveryManId ? { ...dm, currentOrderId: orderId } : dm
//       )
//     );
//   };

//   const restaurants = ["all", ...new Set(orders.map(o => o.restaurant))];
//   const filteredOrders = orders.filter(order =>
//     (restaurantFilter === "all" || order.restaurant === restaurantFilter) &&
//     (statusFilter === "all" || order.status === statusFilter)
//   );

//   const filteredDeliveryMen = deliveryMen.filter(dm =>
//     dm.name.toLowerCase().includes(searchDM.toLowerCase())
//   );

//   const statusColors = {
//     pending: "bg-yellow-100 text-yellow-800",
//     confirmed: "bg-blue-100 text-blue-800",
//     "out-for-delivery": "bg-purple-100 text-purple-800",
//     delivered: "bg-green-100 text-green-800",
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
//       {/* Orders Panel */}
//       <div className="flex-1 bg-white p-4 rounded-lg shadow overflow-x-auto">
//         <h2 className="text-2xl font-bold mb-4">Restaurant Orders</h2>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           <select
//             value={restaurantFilter}
//             onChange={e => setRestaurantFilter(e.target.value)}
//             className="border border-gray-300 rounded px-2 py-1 text-sm"
//           >
//             {restaurants.map(r => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>

//           <select
//             value={statusFilter}
//             onChange={e => setStatusFilter(e.target.value)}
//             className="border border-gray-300 rounded px-2 py-1 text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="out-for-delivery">Out-for-Delivery</option>
//             <option value="delivered">Delivered</option>
//           </select>
//         </div>

//         <table className="w-full table-auto border-collapse text-sm">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="px-4 py-2">ID</th>
//               <th className="px-4 py-2">Restaurant</th>
//               <th className="px-4 py-2">Items</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Assign Delivery</th>
//               <th className="px-4 py-2">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map(order => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-2">{order.id}</td>
//                 <td className="px-4 py-2">{order.restaurant}</td>
//                 <td className="px-4 py-2">
//                   {order.items.map((item, idx) => (
//                     <span key={idx} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 mr-1 rounded-full text-xs">
//                       {item}
//                     </span>
//                   ))}
//                 </td>
//                 <td className="px-4 py-2">
//                   <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[order.status]}`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">
//                   {order.status === "confirmed" ? (
//                     <select
//                       onChange={e => assignDeliveryMan(order.id, parseInt(e.target.value))}
//                       defaultValue=""
//                       className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
//                     >
//                       <option value="" disabled>Assign delivery man</option>
//                       {deliveryMen
//                         .filter(dm => dm.status === "active" && !dm.currentOrderId)
//                         .map(dm => (
//                           <option key={dm.id} value={dm.id}>{dm.name}</option>
//                         ))}
//                     </select>
//                   ) : (
//                     <span className="text-green-600 flex items-center gap-1">
//                       <CheckCircle size={16} /> Assigned
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-4 py-2">{order.createdAt}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delivery Men Panel */}
//       <div className="w-full lg:w-80 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-2xl font-bold mb-4">Delivery Men</h2>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search delivery men..."
//           value={searchDM}
//           onChange={e => setSearchDM(e.target.value)}
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm"
//         />

//         <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
//           {filteredDeliveryMen.map(dm => (
//             <li key={dm.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
//               <span>{dm.name}</span>
//               <span className={`text-sm ${dm.status === "active" ? (dm.currentOrderId ? "text-blue-500" : "text-green-500") : "text-gray-400"}`}>
//                 {dm.status === "active" ? (dm.currentOrderId ? `Delivering #${dm.currentOrderId}` : "Available") : "Offline"}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminRestaurantOrderAssignment;



// import React, { useState, useMemo } from "react";
// import { Bell, User, X, Search } from "lucide-react";

// export default function AdminRestaurantOrderAssignment() {
//   // Mock initial data
//   const initialOrders = [
//     {
//       id: 2001,
//       customer: "Mg Mg",
//       restaurant: "City Foods",
//       items: ["Pizza", "Coke"],
//       total: 9.5,
//       status: "confirmed",
//       assignedTo: null,
//       createdAt: "2025-09-29T08:12:00Z",
//       location: "No. 12, Baho Street, Yangon",
//     },
//     {
//       id: 2002,
//       customer: "Aye Aye",
//       restaurant: "City Foods",
//       items: ["Burger", "Fries"],
//       total: 8.0,
//       status: "confirmed",
//       assignedTo: null,
//       createdAt: "2025-09-29T08:22:00Z",
//       location: "University Avenue, Yangon",
//     },
//     {
//       id: 2003,
//       customer: "Thin Thin",
//       restaurant: "BBQ House",
//       items: ["BBQ Platter"],
//       total: 12.0,
//       status: "confirmed",
//       assignedTo: null,
//       createdAt: "2025-09-29T08:30:00Z",
//       location: "No. 77, Anawrahta Road, Mandalay",
//     },
//   ];

//   const initialDeliveryMen = [
//     {
//       id: 1,
//       name: "Ko Aung",
//       phone: "09-1234567",
//       status: "online",
//       location: "Downtown Yangon",
//     },
//     {
//       id: 2,
//       name: "Ma Hla",
//       phone: "09-7654321",
//       status: "offline",
//       location: "Thingangyun, Yangon",
//     },
//     {
//       id: 3,
//       name: "Saw Win",
//       phone: "09-5550001",
//       status: "online",
//       location: "Hledan, Yangon",
//     },
//   ];
//   const updateOrderStatus = (orderId, newStatus) => {
//     setOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
//     );
//   };
//   const getRestaurantOrderCount = (restaurant) =>
//     orders.filter((o) => o.restaurant === restaurant).length;

//   // state
//   const [orders, setOrders] = useState(initialOrders);
//   const [deliveryMen, setDeliveryMen] = useState(initialDeliveryMen);
//   const [notifications, setNotifications] = useState(() =>
//     initialOrders
//       .filter((o) => o.status === "confirmed")
//       .map((o) => ({
//         id: `n-${o.id}`,
//         orderId: o.id,
//         text: `Order #${o.id} confirmed by ${o.restaurant}`,
//         read: false,
//       }))
//   );
//   const [showNoti, setShowNoti] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [assignModalOpen, setAssignModalOpen] = useState(false);
//   const [filter, setFilter] = useState("");

//   // 👉 NEW states for restaurant detail modal
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);

//   // derived
//   const confirmedOrders = useMemo(
//     () => orders.filter((o) => o.status === "confirmed"),
//     [orders]
//   );
//   const assignments = useMemo(
//     () => orders.filter((o) => o.assignedTo !== null),
//     [orders]
//   );

//   const restaurantGroupedOrders = useMemo(() => {
//     const map = new Map();
//     orders.forEach((o) => {
//       if (!map.has(o.restaurant)) {
//         map.set(o.restaurant, []);
//       }
//       map.get(o.restaurant).push(o);
//     });
//     return Array.from(map.entries()); // [ [restaurantName, ordersArray], ... ]
//   }, [orders]);

//   // functions
//   const markNotificationRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   // 👉 changed: open restaurant detail instead of one order
//   const openOrderDetail = (order) => {
//     const sameRestaurantOrders = orders.filter(
//       (o) => o.restaurant === order.restaurant
//     );
//     setSelectedOrders(sameRestaurantOrders);
//     setDetailModalOpen(true);
//   };
//   const closeOrderDetail = () => {
//     setSelectedOrders([]);
//     setDetailModalOpen(false);
//   };

//   const openAssignModal = (order) => {
//     setSelectedOrder(order);
//     setAssignModalOpen(true);
//   };
//   const closeAssignModal = () => {
//     setSelectedOrder(null);
//     setAssignModalOpen(false);
//   };

//   const assignOrderTo = (orderId, deliveryManId) => {
//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === orderId
//           ? { ...o, assignedTo: deliveryManId, status: "assigned" }
//           : o
//       )
//     );
//     setNotifications((prev) =>
//       prev.map((n) => (n.orderId === orderId ? { ...n, read: true } : n))
//     );
//     closeAssignModal();
//   };

//   const reassign = (orderId) => {
//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === orderId ? { ...o, assignedTo: null, status: "confirmed" } : o
//       )
//     );
//   };

//   const getDeliveryManById = (id) =>
//     deliveryMen.find((d) => d.id === id) || null;

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Main */}
//       <main className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <h1 className="text-2xl font-semibold">Orders - Confirmed</h1>
//             <div className="flex items-center bg-white p-2 rounded shadow-sm">
//               <Search size={16} />
//               <input
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 placeholder="Search orders"
//                 className="ml-2 outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowNoti((s) => !s)}
//                 className="p-2 bg-white rounded-full shadow-sm"
//               >
//                 <Bell />
//               </button>
//               {notifications.some((n) => !n.read) && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
//                   {notifications.filter((n) => !n.read).length}
//                 </span>
//               )}

//               {/* Notifications Drawer */}
//               {showNoti && (
//                 <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded p-3 z-50">
//                   <h3 className="font-semibold mb-2">Notifications</h3>
//                   <div className="space-y-2 max-h-64 overflow-auto">
//                     {notifications.length === 0 && (
//                       <div className="text-sm text-gray-500">
//                         No notifications
//                       </div>
//                     )}
//                     {notifications.map((n) => (
//                       <div
//                         key={n.id}
//                         className={`p-2 rounded flex justify-between items-start ${
//                           n.read ? "bg-gray-50" : "bg-blue-50"
//                         }`}
//                       >
//                         <div>
//                           <div className="text-sm">{n.text}</div>
//                           <div className="text-xs text-gray-400">
//                             Order ID: {n.orderId}
//                           </div>
//                         </div>
//                         <div className="flex flex-col items-end gap-2">
//                           <button
//                             onClick={() => {
//                               openOrderDetail(
//                                 orders.find((o) => o.id === n.orderId)
//                               );
//                               markNotificationRead(n.id);
//                             }}
//                             className="text-sm px-2 py-1 rounded bg-white border"
//                           >
//                             View
//                           </button>
//                           {!n.read && (
//                             <button
//                               onClick={() => markNotificationRead(n.id)}
//                               className="text-sm text-blue-600 underline"
//                             >
//                               Mark read
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="p-2 bg-white rounded shadow-sm">Admin</div>
//           </div>
//         </div>

//         {/* Confirmed Orders Table */}
//         <section className="bg-white shadow rounded p-4">
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="font-semibold">Confirmed Orders</h3>
//             <div className="text-sm text-gray-500">
//               Showing {confirmedOrders.length} confirmed
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="text-sm text-gray-500">
//                 <tr>
//                   <th className="py-2">Order</th>
//                   <th className="py-2">Customer</th>
//                   <th className="py-2">Restaurant</th>
//                   <th className="py-2">Items</th>
//                   <th className="py-2">Location</th>
//                   <th className="py-2">Total</th>
//                   <th className="py-2">Assigned</th>
//                   <th className="py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {restaurantGroupedOrders
//                   .filter(([restaurant, orders]) =>
//                     restaurant.toLowerCase().includes(filter.toLowerCase())
//                   )
//                   .map(([restaurant, orders]) => (
//                     <tr key={restaurant} className="border-t">
//                       <td className="py-3">{orders.map((o) => `#${o.id} `)}</td>
//                       <td className="py-3">
//                         {orders.map((o) => o.customer).join(", ")}
//                       </td>
//                       <td className="py-3 flex items-center gap-2">
//                         {restaurant}
//                         {orders.length > 1 && (
//                           <span className="text-xs text-blue-600 px-2 py-0.5 rounded bg-blue-100">
//                             {orders.length} orders
//                           </span>
//                         )}
//                       </td>
//                       <td className="py-3">
//                         {orders.map((o) => o.items.join(", ")).join(" | ")}
//                       </td>
//                       <td className="py-3 text-xs text-gray-600">
//                         {orders.map((o) => o.location).join(" | ")}
//                       </td>
//                       <td className="py-3">
//                         $
//                         {orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
//                       </td>
//                       <td className="py-3">-</td>
//                       <td className="py-3">
//                         <button
//                           onClick={() => openOrderDetail(orders[0])}
//                           className="px-3 py-1 rounded bg-gray-100 text-sm"
//                         >
//                           Detail
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Delivery Men + Assignments */}
//         <div className="grid grid-cols-2 gap-4 mt-6">
//           <div className="bg-white shadow rounded p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="font-semibold">Delivery Men</h3>
//               <div className="text-sm text-gray-500">
//                 {deliveryMen.length} total
//               </div>
//             </div>
//             <div className="space-y-2">
//               {deliveryMen.map((d) => (
//                 <div
//                   key={d.id}
//                   className="flex items-center justify-between p-2 border rounded"
//                 >
//                   <div>
//                     <div className="font-medium">{d.name}</div>
//                     <div className="text-xs text-gray-500">{d.phone}</div>
//                     <div className="text-xs text-gray-400">
//                       Location: {d.location}
//                     </div>
//                   </div>
//                   <div
//                     className={`text-xs px-2 py-1 rounded ${
//                       d.status === "online"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {d.status}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white shadow rounded p-4">
//             <h3 className="font-semibold mb-3">Assignments</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm">
//                 <thead className="text-gray-500">
//                   <tr>
//                     <th className="py-2">Order</th>
//                     <th className="py-2">Customer</th>
//                     <th className="py-2">Delivery Man</th>
//                     <th className="py-2">Status</th>
//                     <th className="py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {assignments.map((a) => (
//                     <tr key={a.id} className="border-t">
//                       <td className="py-2">#{a.id}</td>
//                       <td className="py-2">{a.customer}</td>
//                       <td className="py-2">
//                         {getDeliveryManById(a.assignedTo)?.name}
//                       </td>
//                       <td className="py-2">{a.status}</td>
//                       <td className="py-2">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => reassign(a.id)}
//                             className="px-2 py-1 bg-yellow-50 rounded text-sm"
//                           >
//                             Unassign
//                           </button>
//                           <button
//                             onClick={() => openOrderDetail(a)}
//                             className="px-2 py-1 bg-gray-50 rounded text-sm"
//                           >
//                             Detail
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                   {assignments.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={5}
//                         className="text-gray-400 py-3 text-center"
//                       >
//                         No assignments yet
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Assign Modal */}
//         {assignModalOpen && selectedOrder && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//               className="absolute inset-0 bg-black/30"
//               onClick={closeAssignModal}
//             ></div>
//             <div className="bg-white rounded shadow-lg z-50 max-w-md w-full p-6">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">
//                   Assign Order #{selectedOrder.id}
//                 </h3>
//                 <button
//                   onClick={closeAssignModal}
//                   className="p-1 rounded hover:bg-gray-100"
//                 >
//                   <X />
//                 </button>
//               </div>

//               <div className="space-y-2">
//                 {deliveryMen.map((d) => (
//                   <div
//                     key={d.id}
//                     className="p-2 rounded border flex items-center justify-between"
//                   >
//                     <div>
//                       <div className="font-medium">
//                         {d.name}{" "}
//                         {d.status === "online" ? (
//                           <span className="ml-2 text-xs text-green-600">
//                             (online)
//                           </span>
//                         ) : (
//                           <span className="ml-2 text-xs text-gray-400">
//                             (offline)
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-xs text-gray-500">{d.phone}</div>
//                       <div className="text-xs text-gray-400">
//                         Location: {d.location}
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         disabled={d.status !== "online"}
//                         onClick={() => assignOrderTo(selectedOrder.id, d.id)}
//                         className={`px-3 py-1 rounded ${
//                           d.status === "online"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-100 text-gray-400"
//                         }`}
//                       >
//                         Assign
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={closeAssignModal}
//                   className="px-3 py-1 bg-gray-100 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 👉 Restaurant Detail Modal */}
//         {detailModalOpen && selectedOrders.length > 0 && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//               className="absolute inset-0 bg-black/30"
//               onClick={closeOrderDetail}
//             ></div>
//             <div className="bg-white rounded shadow-lg z-50 max-w-2xl w-full p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold flex items-center gap-2">
//                   Orders from {selectedOrders[0].restaurant}
//                   {selectedOrders.length > 1 && (
//                     <span className="text-xs text-blue-600 px-2 py-0.5 rounded bg-blue-100">
//                       {selectedOrders.length} orders
//                     </span>
//                   )}
//                 </h3>
//                 <button
//                   onClick={closeOrderDetail}
//                   className="p-1 hover:bg-gray-100 rounded"
//                 >
//                   <X />
//                 </button>
//               </div>

//               <table className="w-full text-sm">
//                 <thead className="text-gray-500">
//                   <tr>
//                     <th className="py-2">Order</th>
//                     <th className="py-2">Customer</th>
//                     <th className="py-2">Items</th>
//                     <th className="py-2">Total</th>
//                     <th className="py-2">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrders.map((o) => (
//                     <tr key={o.id} className="border-t">
//                       <td className="py-2">#{o.id}</td>
//                       <td className="py-2">{o.customer}</td>
//                       <td className="py-2">{o.items.join(", ")}</td>
//                       <td className="py-2">${o.total.toFixed(2)}</td>
//                       <td className="py-2">
//                         <select
//                           value={o.assignedTo || ""}
//                           onChange={(e) =>
//                             assignOrderTo(o.id, Number(e.target.value))
//                           }
//                           className="text-sm border rounded px-1 py-0.5"
//                         >
//                           <option value="">-- Assign --</option>
//                           {deliveryMen.map((d) => (
//                             <option
//                               key={d.id}
//                               value={d.id}
//                               disabled={d.status !== "online"}
//                             >
//                               {d.name}{" "}
//                               {d.status !== "online" ? "(offline)" : ""}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import { Bell, User, X, Search } from "lucide-react";

export default function AdminRestaurantOrderAssignment() {
  // Mock initial data
  const initialOrders = [
    {
      id: 2001,
      customer: "Mg Mg",
      restaurant: "City Foods",
      items: ["Pizza", "Coke"],
      total: 9.5,
      status: "confirmed",
      assignedTo: null,
      createdAt: "2025-09-29T08:12:00Z",
      location: "No. 12, Baho Street, Yangon",
    },
    {
      id: 2002,
      customer: "Aye Aye",
      restaurant: "City Foods",
      items: ["Burger", "Fries"],
      total: 8.0,
      status: "confirmed",
      assignedTo: null,
      createdAt: "2025-09-29T08:22:00Z",
      location: "University Avenue, Yangon",
    },
    {
      id: 2003,
      customer: "Thin Thin",
      restaurant: "BBQ House",
      items: ["BBQ Platter"],
      total: 12.0,
      status: "confirmed",
      assignedTo: null,
      createdAt: "2025-09-29T08:30:00Z",
      location: "No. 77, Anawrahta Road, Mandalay",
    },
  ];

  const initialDeliveryMen = [
    {
      id: 1,
      name: "Ko Aung",
      phone: "09-1234567",
      status: "online",
      location: "Downtown Yangon",
    },
    {
      id: 2,
      name: "Ma Hla",
      phone: "09-7654321",
      status: "offline",
      location: "Thingangyun, Yangon",
    },
    {
      id: 3,
      name: "Saw Win",
      phone: "09-5550001",
      status: "online",
      location: "Hledan, Yangon",
    },
  ];
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };
  const getRestaurantOrderCount = (restaurant) =>
    orders.filter((o) => o.restaurant === restaurant).length;

  // state
  const [orders, setOrders] = useState(initialOrders);
  const [deliveryMen, setDeliveryMen] = useState(initialDeliveryMen);
  const [notifications, setNotifications] = useState(() =>
    initialOrders
      .filter((o) => o.status === "confirmed")
      .map((o) => ({
        id: `n-${o.id}`,
        orderId: o.id,
        text: `Order #${o.id} confirmed by ${o.restaurant}`,
        read: false,
      }))
  );
  const [showNoti, setShowNoti] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // 👉 NEW states for restaurant detail modal
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // derived
  const confirmedOrders = useMemo(
    () => orders.filter((o) => o.status === "confirmed"),
    [orders]
  );
  const assignments = useMemo(
    () => orders.filter((o) => o.assignedTo !== null),
    [orders]
  );

  // functions
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // 👉 changed: open restaurant detail instead of one order
  const openOrderDetail = (order) => {
    const sameRestaurantOrders = orders.filter(
      (o) => o.restaurant === order.restaurant
    );
    setSelectedOrders(sameRestaurantOrders);
    setDetailModalOpen(true);
  };
  const closeOrderDetail = () => {
    setSelectedOrders([]);
    setDetailModalOpen(false);
  };

  const openAssignModal = (order) => {
    setSelectedOrder(order);
    setAssignModalOpen(true);
  };
  const closeAssignModal = () => {
    setSelectedOrder(null);
    setAssignModalOpen(false);
  };

  const assignOrderTo = (orderId, deliveryManId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, assignedTo: deliveryManId, status: "assigned" }
          : o
      )
    );
    setNotifications((prev) =>
      prev.map((n) => (n.orderId === orderId ? { ...n, read: true } : n))
    );
    closeAssignModal();
  };

  const reassign = (orderId) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, assignedTo: null, status: "confirmed" } : o
      )
    );
  };

  const getDeliveryManById = (id) =>
    deliveryMen.find((d) => d.id === id) || null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main */}
      <main className="flex-1 p-6">
   

        {/* Confirmed Orders Table */}
        <section className="bg-white shadow rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Confirmed Orders</h3>
            <div className="text-sm text-gray-500">
              Showing {confirmedOrders.length} confirmed
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-500">
                <tr>
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Restaurant</th>
                  <th className="py-2">Items</th>
                  <th className="py-2">Location</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Assigned</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
             <tbody>
  {Array.from(
    new Map(
      confirmedOrders.map((o) => [o.restaurant, o])
    ).values()
  )
    .filter((o) =>
      `${o.id} ${o.customer} ${o.restaurant}`
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .map((o) => (
      <tr key={o.restaurant} className="border-t">
        <td className="py-3">#{o.id}</td>
        <td className="py-3">{o.customer}</td>
        <td className="py-3 flex items-center gap-2">
          {o.restaurant}
          {getRestaurantOrderCount(o.restaurant) > 1 && (
            <span className="text-xs text-blue-600 px-2 py-0.5 rounded bg-blue-100">
              {getRestaurantOrderCount(o.restaurant)} orders
            </span>
          )}
        </td>

        <td className="py-3">{o.items.join(", ")}</td>
        <td className="py-3 text-xs text-gray-600">{o.location}</td>
        <td className="py-3">${o.total.toFixed(2)}</td>
        <td className="py-3">
          {o.assignedTo ? getDeliveryManById(o.assignedTo)?.name : "-"}
        </td>
        <td className="py-3">
          <div className="flex gap-2">
            <button
              onClick={() => openOrderDetail(o)}
              className="px-3 py-1 rounded bg-gray-100 text-sm"
            >
              Detail
            </button>
            <button
              onClick={() => openAssignModal(o)}
              className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            >
              Assign
            </button>
          </div>
        </td>
      </tr>
    ))}
</tbody>

            </table>
          </div>
        </section>

        {/* Delivery Men + Assignments */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Delivery Men</h3>
              <div className="text-sm text-gray-500">
                {deliveryMen.length} total
              </div>
            </div>
            <div className="space-y-2">
              {deliveryMen.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-gray-500">{d.phone}</div>
                    <div className="text-xs text-gray-400">
                      Location: {d.location}
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      d.status === "online"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {d.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold mb-3">Orders Assign</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="py-2">Order</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Delivery Man</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((a) => (
                    <tr key={a.id} className="border-t">
                      <td className="py-2">#{a.id}</td>
                      <td className="py-2">{a.customer}</td>
                      <td className="py-2">
                        {getDeliveryManById(a.assignedTo)?.name}
                      </td>
                      <td className="py-2">{a.status}</td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => reassign(a.id)}
                            className="px-2 py-1 bg-yellow-50 rounded text-sm"
                          >
                            Unassign
                          </button>
                          <button
                            onClick={() => openOrderDetail(a)}
                            className="px-2 py-1 bg-gray-50 rounded text-sm"
                          >
                            Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {assignments.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-gray-400 py-3 text-center"
                      >
                        No assignments yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Assign Modal */}
        {assignModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={closeAssignModal}
            ></div>
            <div className="bg-white rounded shadow-lg z-50 max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">
                  Assign Order #{selectedOrder.id}
                </h3>
                <button
                  onClick={closeAssignModal}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-2">
                {deliveryMen.map((d) => (
                  <div
                    key={d.id}
                    className="p-2 rounded border flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {d.name}{" "}
                        {d.status === "online" ? (
                          <span className="ml-2 text-xs text-green-600">
                            (online)
                          </span>
                        ) : (
                          <span className="ml-2 text-xs text-gray-400">
                            (offline)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{d.phone}</div>
                      <div className="text-xs text-gray-400">
                        Location: {d.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={d.status !== "online"}
                        onClick={() => assignOrderTo(selectedOrder.id, d.id)}
                        className={`px-3 py-1 rounded ${
                          d.status === "online"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={closeAssignModal}
                  className="px-3 py-1 bg-gray-100 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 👉 Restaurant Detail Modal */}
        {detailModalOpen && selectedOrders.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={closeOrderDetail}
            ></div>
            <div className="bg-white rounded shadow-lg z-50 max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  Orders from {selectedOrders[0].restaurant}
                  {selectedOrders.length > 1 && (
                    <span className="text-xs text-blue-600 px-2 py-0.5 rounded bg-blue-100">
                      {selectedOrders.length} orders
                    </span>
                  )}
                </h3>
                <button
                  onClick={closeOrderDetail}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X />
                </button>
              </div>

              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="py-2">Order</th>
                    <th className="py-2">Customer</th>
                    <th className="py-2">Items</th>
                    <th className="py-2">Total</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="py-2">#{o.id}</td>
                      <td className="py-2">{o.customer}</td>
                      <td className="py-2">{o.items.join(", ")}</td>
                      <td className="py-2">${o.total.toFixed(2)}</td>
                      <td className="py-2">
                        <select
                          value={o.assignedTo || ""}
                          onChange={(e) =>
                            assignOrderTo(o.id, Number(e.target.value))
                          }
                          className="text-sm border rounded px-1 py-0.5"
                        >
                          <option value="">-- Assign --</option>
                          {deliveryMen.map((d) => (
                            <option
                              key={d.id}
                              value={d.id}
                              disabled={d.status !== "online"}
                            >
                              {d.name}{" "}
                              {d.status !== "online" ? "(offline)" : ""}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 