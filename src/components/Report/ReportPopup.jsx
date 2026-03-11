
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ReportPopup({ order, close }) {
  const [open, setOpen] = useState(false);
const [preview, setPreview] = useState(null);

  // 🔒 Safety: order undefined/null
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1a2030] w-[90%] max-w-5xl rounded-3xl p-8 overflow-y-auto max-h-[90vh] shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-indigo-400 font-semibold">
            Order {order.id}
          </h2>
          <button
            onClick={close}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* ================= CUSTOMER INFO ================= */}
        <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
          <h3 className="text-indigo-400 font-semibold mb-3">Customer Information</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>Name: <span className="text-slate-300">{order.name}</span></p>
            <p>Phone: <span className="text-slate-300">{order.phone}</span></p>
            <p>Address: <span className="text-slate-300">{order.address}</span></p>
            <p>Location: <span className="text-slate-300">{order.location}</span></p>
          </div>
        </div>

        {/* ================= ORDER INFO ================= */}
        <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
          <h3 className="text-indigo-400 font-semibold mb-3">Order Information</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>Order ID: <span className="text-slate-300">{order.id}</span></p>
            <p>Type: <span className="text-slate-300">{order.type}</span></p>
            <p>Total Orders: <span className="text-slate-300">{order.total_order}</span></p>
            <p>Total Amount: <span className="text-yellow-400">{order.grand_total?.toLocaleString()} Ks</span></p>
            <p>Discount: {order.discount}</p>
            <p>Tax: {order.tax}</p>
            <p>Date: <span className="text-slate-300">{order.created_at}</span></p>
          </div>
        </div>

        {/* ================= DELIVERY / PAYMENT ================= */}
        <div className="bg-[#20223a] rounded-2xl p-4 mb-6">
          <h3 className="text-indigo-400 font-semibold mb-3">Payment Information</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>Payment Method: <span className="text-slate-300">{order.payment_method}</span></p>
            <p>Payment Phone: <span className="text-slate-300">{order.payment_phone}</span></p>
            <p>Payment Name: <span className="text-slate-300">{order.payment_name}</span></p>
     
          </div>
        </div>

        {/* ================= PHOTOS ================= */}
<div className="grid grid-cols-2 gap-6 mb-6">

  {order.payment_photo && (
    <div>
      <p className="text-sm text-gray-400 mb-2">Payment Photo</p>
      <img
        src={`http://38.60.244.137:3000/${order.payment_photo}`}
        alt="payment"
        onClick={() =>
          setPreview(`http://38.60.244.137:3000/${order.payment_photo}`)
        }
        className="rounded-xl border border-slate-700 w-full h-48 object-cover cursor-pointer hover:opacity-90"
      />
    </div>
  )}

  {order.esign && (
    <div>
      <p className="text-sm text-gray-400 mb-2">Customer Signature</p>
      <img
        src={`http://38.60.244.137:3000${order.esign}`}
        alt="esign"
        onClick={() =>
          setPreview(`http://38.60.244.137:3000${order.esign}`)
        }
        className="rounded-xl border border-slate-700 w-full h-48 object-contain bg-white cursor-pointer hover:opacity-90"
      />
    </div>
  )}

</div>

        {/* ================= ORDER ITEMS ================= */}
        <div className="bg-[#20223a] rounded-2xl overflow-hidden">
          <div
            onClick={() => setOpen(!open)}
            className="flex justify-between items-center p-4 cursor-pointer"
          >
            <h3 className="text-indigo-400 font-semibold">Order Items</h3>
            {open ? (
              <ChevronUp className="text-indigo-400" />
            ) : (
              <ChevronDown className="text-indigo-400" />
            )}
          </div>

          {open && (
            <div className="px-4 pb-4">
              {order.orders?.map((item, idx) => (
                <div key={idx} className="border-b border-slate-700 py-4 flex justify-between">
                  <div>
                    <p className="font-semibold text-white">{item.menu_name}</p>
                    <p className="text-sm text-gray-300">Size {item.size} × {item.quantity}</p>

                    {/* Ingredients */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.ingredients?.length > 0 ? (
                        item.ingredients.map((ing) => (
                          <span key={ing.ingredients_id} className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg">
                            {ing.ingredients_name} (+{ing.ingredients_price} Ks)
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">No Ingredients</span>
                      )}
                    </div>

                    {/* Description */}
                    {item.product_description && (
                      <p className="text-xs text-gray-400 mt-2">
                        Note: {item.product_description}
                      </p>
                    )}
                  </div>

                  <div className="text-indigo-400 font-semibold">
                    {item.total?.toLocaleString()} Ks
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {preview && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
    onClick={() => setPreview(null)}
  >
    <img
      src={preview}
      alt="preview"
      className="max-w-[90%] max-h-[80vh] rounded-2xl shadow-2xl"
    />
  </div>
)}

      </div>
    </div>
  );
}