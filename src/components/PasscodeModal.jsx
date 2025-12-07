import React, { useRef, useEffect, useState } from "react";

export default function PasscodeModal({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Enter Passcode" 
}) {
  const [passcode, setPasscode] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setPasscode("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm(passcode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-[330px] shadow-2xl border border-purple-200">
        <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <input
          ref={inputRef}
          type="password"
          className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
          placeholder="Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
