import React, { useState } from "react";
import { X } from "lucide-react";

const OrderDetail = ({ order, onClose, onConfirm, onReject }) => {
  if (!order) return null;

  const [selectedItems, setSelectedItems] = useState(order.acceptedItems ?? []);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const selectAll = () => setSelectedItems([...order.items]);
  const clearAll = () => setSelectedItems([]);

  const handleConfirm = () => {
    if (!selectedItems.length) {
      alert("⚠️ Please select at least 1 item to confirm");
      return;
    }
    const rejected = order.items.filter((i) => !selectedItems.includes(i));
    onConfirm(order.id, selectedItems, rejected);
    onClose();
  };

  const handleReject = () => {
    if (onReject) onReject(order.id);
    onClose();
  };

  return (
    <div className="fixed -inset-8 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Order #{order.id} - <span className="text-gray-600">{order.customer}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500 mb-4">{order.date}</p>

          <div className="flex gap-2 mb-4">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-1.5 text-sm rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {order.items.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center justify-between p-3 border rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
              >
                <span className="font-medium">{item}</span>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="w-5 h-5 accent-[#B476FF] "
                />
              </label>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#B476FF]  to-purple-500 hover:from-[#B476FF]  hover:to-[#B476FF]  text-white rounded-lg font-medium transition"
          >
            Confirm
          </button>
          <button
            onClick={handleReject}
            className="flex-1 px-4 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg font-medium transition"
          >
            Reject
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
