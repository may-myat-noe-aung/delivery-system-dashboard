import { createPortal } from "react-dom";

export default function DelimanagerPasscodeModal({
  open,
  onClose,
  onConfirm,
  passcode,
  setPasscode,
  loading,
  title,
}) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md p-2">
      {/* overlay full screen */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={!loading ? onClose : undefined}
      />

      {/* modal */}
      <div className="relative bg-slate-900 rounded-xl p-4 w-full max-w-[330px] border border-slate-700 text-white shadow-2xl">
        <h3 className="text-center text-lg font-bold mb-4 text-[#B476FF]">
          {title}
        </h3>

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onConfirm()}
          className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-purple-500 outline-none mb-4"
          placeholder="Enter passcode"
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full py-2 rounded-lg border border-slate-700 hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-2 rounded-lg bg-[#B476FF] hover:opacity-90"
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}