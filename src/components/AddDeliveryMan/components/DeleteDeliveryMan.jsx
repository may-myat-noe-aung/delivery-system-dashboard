import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { deleteDeliveryMan } from "../services/deliveryManApi";
import { useAlert } from "../../../AlertContext";

export default function DeleteDeliveryMan({
  delivery,
  onSuccess,
  loading,
  setLoading,
}) {
  const { showAlert } = useAlert();

  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");

  const passcodeInputRef = useRef(null);

  useEffect(() => {
    if (passcodeModal && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [passcodeModal]);

  // Open passcode popup
  const handleDelete = () => {
    setPasscode("");
    setPasscodeModal(true);
  };

  const handlePasscodeKey = (e) => {
    if (e.key === "Enter") {
      doDelete();
    }
  };

  const doDelete = async () => {
    if (!passcode.trim()) {
      showAlert("Enter passcode", "error");
      return;
    }

    try {
      // Show loading
      setLoading((prev) => ({
        ...prev,
        [delivery.id]: true,
      }));

      // Verify admin passcode
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-admin-passcode",
        {
          passcode,
        },
      );

      if (!verifyRes.data.success) {
        showAlert(verifyRes.data.message || "Incorrect Passcode", "error");
        return;
      }

      // Close modal after successful verification
      setPasscodeModal(false);

      // Delete delivery man
      const res = await deleteDeliveryMan(delivery.id);

      showAlert(res.data.message || "Deleted Successfully", "success");

      onSuccess(delivery.id);

      setPasscode("");
    } catch (err) {
      showAlert(err.response?.data?.message || "Delete Failed", "error");
    } finally {
      setLoading((prev) => ({
        ...prev,
        [delivery.id]: false,
      }));
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading?.[delivery.id]}
        className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500 transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>

      {/* PASSCODE MODAL */}
      {passcodeModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center ">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPasscodeModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-[#1e2235] rounded-xl p-6 w-[90%] max-w-[330px] shadow-2xl border border-[#2c2f44]">
            <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
              Enter Passcode
            </h3>

            <input
              ref={passcodeInputRef}
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={handlePasscodeKey}
              className="border border-neutral-700 rounded-lg w-full px-3 py-2 mb-4 bg-neutral-900 text-white focus:ring-2 focus:ring-[#B476FF] placeholder-gray-400"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
                className="flex-1 px-4 py-2 border border-neutral-700 rounded-lg text-white hover:bg-[#2c2f44]"
              >
                Cancel
              </button>

              <button
                onClick={doDelete}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg hover:opacity-90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
