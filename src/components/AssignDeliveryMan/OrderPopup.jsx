import React, { useState } from "react";
import { useAlert } from "../../AlertContext";

export default function OrderPopup({ order, close }) {
  const { showAlert } = useAlert();
  const [localOrder] = useState(order);
  const [preview, setPreview] = useState(null);

  const PRIMARY = "#B476FF";

  const total =
    localOrder?.orders?.reduce((sum, item) => sum + item.total, 0) || 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#181a2f] border border-[#2a2d4a] rounded-3xl p-8 w-full max-w-3xl text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-4 right-5 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        {/* Header */}
        <h3 className="text-2xl font-bold mb-6" style={{ color: PRIMARY }}>
          Order #{localOrder.id}
        </h3>

        {/* Customer Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 bg-[#20223a] p-5 rounded-2xl">
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Customer:</span> {localOrder.name}
            </p>
            <p>
              <span className="text-gray-400">Phone:</span> {localOrder.phone}
            </p>
            <p>
              <span className="text-gray-400">Address:</span>{" "}
              {localOrder.address}
            </p>
            <p>
              <span className="text-gray-400">Location:</span>{" "}
              {localOrder.location}
            </p>
            <p>
              <span className="text-gray-400">Remark:</span>{" "}
              {localOrder.remark || "—"}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Payment Method:</span>{" "}
              {localOrder.payment_method}
            </p>
            <p>
              <span className="text-gray-400">Payment Name:</span>{" "}
              {localOrder.payment_name}
            </p>
            <p>
              <span className="text-gray-400">Payment Phone:</span>{" "}
              {localOrder.payment_phone}
            </p>

            {/* {localOrder.payment_photo && (
              <img
                src={`http://38.60.244.137:3000/${localOrder.payment_photo}`}
                alt="Payment"
                className="mt-2 rounded-xl border border-[#2a2d4a] max-h-40"
              />
            )} */}
            {localOrder.payment_photo && (
              <img
                src={`http://38.60.244.137:3000/${localOrder.payment_photo}`}
                alt="Payment"
                onClick={() =>
                  setPreview(
                    `http://38.60.244.137:3000/${localOrder.payment_photo}`,
                  )
                }
                className="mt-2 rounded-xl border border-[#2a2d4a] max-h-40 cursor-pointer hover:opacity-80"
              />
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-[#20223a] rounded-2xl p-5 space-y-5 mb-6">
          {localOrder.orders.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-[#2f3254] pb-4"
            >
              <div>
                <p className="font-semibold">{item.menu_name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Size: {item.size} × {item.quantity}
                </p>

                {/* Ingredients */}
                <div className="mt-2">
                  {item.ingredients.length > 0 ? (
                    item.ingredients.map((ing) => (
                      <span
                        key={ing.ingredients_id}
                        className="inline-block bg-[#2a2d4a] px-2 py-1 text-xs rounded-lg mr-1 mb-1"
                      >
                        {ing.ingredients_name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      No Ingredients
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p style={{ color: PRIMARY }}>
                  {item.total.toLocaleString()} Ks
                </p>
                {/* 
                {item.status === 1 && (
                  <span className="text-emerald-400 text-xs">
                    Approved
                  </span>
                )}
                {item.status === 2 && (
                  <span className="text-rose-400 text-xs">
                    Rejected
                  </span>
                )} */}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#20223a] p-5 rounded-2xl mb-6 text-sm space-y-2">
          <p>Items Total: {total.toLocaleString()} Ks</p>
          <p>Discount: {localOrder.discount} Ks</p>
          <p>Tax: {localOrder.tax} Ks</p>
          <p>Extra: {localOrder.extra} Ks</p>

          <div className="flex justify-between pt-3 border-t border-[#2f3254]">
            <span className="font-semibold">Grand Total</span>
            <span className="text-xl font-bold" style={{ color: PRIMARY }}>
              {localOrder.grand_total?.toLocaleString()} Ks
            </span>
          </div>
        </div>

        {preview && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]"
    onClick={() => setPreview(null)}
  >
    <img
      src={preview}
      alt="Preview"
      className="max-h-[80vh] rounded-2xl shadow-2xl"
    />
  </div>
)}
      </div>
    </div>
  );
}
