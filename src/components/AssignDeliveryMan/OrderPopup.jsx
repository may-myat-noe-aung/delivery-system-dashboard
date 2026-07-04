// import React, { useState } from "react";
// import { useAlert } from "../../AlertContext";

// export default function OrderPopup({ order, close }) {
//   const { showAlert } = useAlert();
//   const [localOrder] = useState(order);
//   const [preview, setPreview] = useState(null);

//   const PRIMARY = "#B476FF";

//   const total =
//     localOrder?.orders?.reduce((sum, item) => sum + item.total, 0) || 0;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-[#181a2f] border border-[#2a2d4a] rounded-3xl p-8 w-full max-w-3xl text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
//         {/* Close */}
//         <button
//           onClick={close}
//           className="absolute top-4 right-5 text-gray-400 hover:text-white text-lg"
//         >
//           ✕
//         </button>

//         {/* Header */}
//         <h3 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
//           Order #{localOrder.id}
//         </h3>

//         {/* Customer Info */}
//         <div className="grid md:grid-cols-2 gap-6 mb-6 bg-[#20223a] p-5 rounded-2xl">
//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="text-gray-400">Customer:</span> {localOrder.name}
//             </p>
//             <p>
//               <span className="text-gray-400">Phone:</span> {localOrder.phone}
//             </p>
//             <p>
//               <span className="text-gray-400">Address:</span>{" "}
//               {localOrder.address}
//             </p>
//             <p>
//               <span className="text-gray-400">Location:</span>{" "}
//               {localOrder.location}
//             </p>
//             <p>
//               <span className="text-gray-400">Remark:</span>{" "}
//               {localOrder.remark || "—"}
//             </p>
//           </div>

//           <div className="space-y-2 text-sm">
//             <p>
//               <span className="text-gray-400">Payment Method:</span>{" "}
//               {localOrder.payment_method}
//             </p>
//             <p>
//               <span className="text-gray-400">Payment Name:</span>{" "}
//               {localOrder.payment_name}
//             </p>
//             <p>
//               <span className="text-gray-400">Payment Phone:</span>{" "}
//               {localOrder.payment_phone}
//             </p>

//             {/* {localOrder.payment_photo && (
//               <img
//                 src={`https://api.pwezayshops.com/${localOrder.payment_photo}`}
//                 alt="Payment"
//                 className="mt-2 rounded-xl border border-[#2a2d4a] max-h-40"
//               />
//             )} */}
//             {localOrder.payment_photo && (
//               <img
//                 src={`https://api.pwezayshops.com/${localOrder.payment_photo}`}
//                 alt="Payment"
//                 onClick={() =>
//                   setPreview(
//                     `https://api.pwezayshops.com/${localOrder.payment_photo}`,
//                   )
//                 }
//                 className="mt-2 rounded-xl border border-[#2a2d4a] max-h-40 cursor-pointer hover:opacity-80"
//               />
//             )}
//           </div>
//         </div>

//         {/* Items */}
//         <div className="bg-[#20223a] rounded-2xl p-5 space-y-5 mb-6">
//           {localOrder.orders.map((item, i) => (
//             <div
//               key={i}
//               className="flex justify-between border-b border-[#2f3254] pb-4"
//             >
//               <div>
//                 <p className="font-semibold">{item.menu_name}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Size: {item.size} × {item.quantity}
//                 </p>

//                 {/* Ingredients */}
//                 <div className="mt-2">
//                   {item.ingredients.length > 0 ? (
//                     item.ingredients.map((ing) => (
//                       <span
//                         key={ing.ingredients_id}
//                         className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg mr-1 mb-1"
//                       >
//                         {ing.ingredients_name}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-xs text-gray-500">
//                       No Ingredients
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//                 <p style={{ color: PRIMARY }}>
//                   {item.total.toLocaleString()} Ks
//                 </p>
//                 {/* 
//                 {item.status === 1 && (
//                   <span className="text-emerald-400 text-xs">
//                     Approved
//                   </span>
//                 )}
//                 {item.status === 2 && (
//                   <span className="text-rose-400 text-xs">
//                     Rejected
//                   </span>
//                 )} */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary */}
//         <div className="bg-[#20223a] p-5 rounded-2xl mb-6 text-sm space-y-2">
//           <p>Items Total: {total.toLocaleString()} Ks</p>
//           <p>Discount: {localOrder.discount} Ks</p>
//           <p>Tax: {localOrder.tax} Ks</p>
//           <p>Extra: {localOrder.extra} Ks</p>

//           <div className="flex justify-between pt-3 border-t border-[#2f3254]">
//             <span className="font-semibold">Grand Total</span>
//             <span className="text-xl font-bold" style={{ color: PRIMARY }}>
//               {localOrder.grand_total?.toLocaleString()} Ks
//             </span>
//           </div>
//         </div>

//         {preview && (
//   <div
//     className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
//     onClick={() => setPreview(null)}
//   >
//     <img
//       src={preview}
//       alt="Preview"
//       className="max-h-[80vh] rounded-2xl shadow-2xl"
//     />
//   </div>
// )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OrderPopup({ order, close }) {
  const [localOrder] = useState(order);
  const [openItems, setOpenItems] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const total =
    localOrder?.orders?.reduce((sum, item) => sum + item.total, 0) || 0;

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1e293b] border border-slate-700 rounded-3xl p-6 w-full max-w-2xl text-white shadow-2xl max-h-[90vh] overflow-y-scroll relative">

        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-4 right-5 w-9 h-9 flex items-center justify-center 
          bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white 
          rounded-full transition"
        >
          ✕
        </button>

        {/* HEADER */}
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Order #{localOrder.id}
        </h3>

        {/* CUSTOMER INFO */}
        <div className="flex justify-between px-4 mb-4">
          <div>
            <p><span className="text-slate-400">Customer:</span> {localOrder.name}</p>
            <p><span className="text-slate-400">Phone:</span> {localOrder.phone}</p>
          </div>
          <div>
            <p><span className="text-slate-400">Remark:</span> {localOrder.remark || "-"}</p>
            <p><span className="text-slate-400">Address:</span> {localOrder.address}</p>
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-slate-800 rounded-2xl px-4 pt-4 mb-5 space-y-3">
          {localOrder.orders.map((item, i) => {
            const isOpen = openItems[i];

            return (
              <div key={i} className="border border-slate-700 rounded-xl">
                <div
                  onClick={() => toggleItem(i)}
                  className="flex justify-between items-center p-3 cursor-pointer hover:bg-slate-700 rounded-xl"
                >
                  <div className="font-medium">{item.menu_name}</div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                      {item.total.toLocaleString()} Ks
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 pb-3 text-sm text-slate-300 space-y-2">
                    <div className="flex justify-between">
                      <p>Size: {item.size}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>

                    <div>
                      <p>Ingredients:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.ingredients.length > 0
                          ? item.ingredients.map((ing) => (
                              <span
                                key={ing.ingredients_id}
                                className="bg-slate-700 px-2 py-0.5 rounded"
                              >
                                {ing.ingredients_name}
                              </span>
                            ))
                          : "None"}
                      </div>
                    </div>

                    <p className="text-slate-400">
                      {item.product_description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-5 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{total.toLocaleString()} Ks</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>- {localOrder.discount} Ks</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{localOrder.tax} Ks</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{localOrder.delivery_fees} Ks</span>
          </div>

          <div className="border-t border-slate-700 pt-2 flex justify-between text-lg font-bold text-cyan-400">
            <span>Grand Total</span>
            <span>{localOrder.grand_total.toLocaleString()} Ks</span>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="mb-5 flex justify-between">
          <div>
            <h4 className="text-purple-400 text-lg font-semibold mb-2">
              Payment
            </h4>
            <p>Method: {localOrder.payment_method}</p>
            <p>Name: {localOrder.payment_name}</p>
            <p>Phone: {localOrder.payment_phone}</p>

            <div className="text-slate-400 mt-3">
              <p>Created: {new Date(localOrder.created_at).toLocaleString()}</p>
              <p>Pickup: {localOrder.orders_pickup ? "Done" : "Not Done"}</p>
            </div>
          </div>

          {localOrder.payment_photo && (
            <img
              src={`https://api.pwezayshops.com/${localOrder.payment_photo}`}
              onClick={() =>
                setPreviewImage(
                  `https://api.pwezayshops.com/${localOrder.payment_photo}`
                )
              }
              className="w-40 rounded-lg cursor-pointer hover:scale-105"
            />
          )}
        </div>

        {/* IMAGE PREVIEW */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              className="max-w-3xl max-h-[80vh] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}