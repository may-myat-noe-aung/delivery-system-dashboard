import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAlert } from "../../AlertContext";

export default function DeliFeesTab() {
  const token = localStorage.getItem("token");
  const { showAlert } = useAlert();

  const [loading, setLoading] = useState(true);

  const [deliFees, setDeliFees] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const [saving, setSaving] = useState(false);

  // PASSCODE
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");

  const passcodeInputRef = useRef(null);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.pwezayshops.com/open-server", {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        });

        if (res.data?.data?.deli_fees !== undefined) {
          setDeliFees(res.data.data.deli_fees);
          setInputValue(res.data.data.deli_fees);
        }
      } catch (err) {
        showAlert("Failed to load delivery fees", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showAlert]);

  // ================= OPEN MODAL =================
  const handleSaveClick = () => {
    if (inputValue === "" || isNaN(inputValue)) {
      showAlert("Invalid delivery fee", "warning");
      return;
    }

    setPasscode("");
    setPasscodeModal(true);
  };

  // ================= AUTO FOCUS =================
  useEffect(() => {
    if (passcodeModal && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [passcodeModal]);

  const handlePassKey = (e) => {
    if (e.key === "Enter") {
      doSave();
    }
  };

  // ================= PASSCODE + SAVE =================
  const doSave = async () => {
    if (!passcode) {
      showAlert("Enter passcode", "error");
      return;
    }

    setSaving(true);

    try {
      // 1. VERIFY PASSCODE
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-owner-passcode",
        {
          passcode,
        },
        {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        },
      );

      if (!verifyRes.data.success) {
        showAlert("Wrong passcode", "error");
        setSaving(false);
        return;
      }

      // 2. UPDATE DELIVERY FEES
      const res = await axios.patch(
        "https://api.pwezayshops.com/deli-fees",
        {
          deli_fees: Number(inputValue),
        },
        {
          headers: {
            Authorization: `MSHteam ${token}`,
          },
        },
      );

      if (res.data?.deli_fees !== undefined) {
        setDeliFees(res.data.deli_fees);
        setInputValue(res.data.deli_fees.toString());
      }

      showAlert(res.data?.message || "Updated successfully", "success");

      // reset modal
      setPasscodeModal(false);
      setPasscode("");
    } catch (err) {
      showAlert(err.response?.data?.message || "Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ================= UI =================
  if (loading) {
    return (
      <div className="p-6 text-gray-400 animate-pulse">
        Loading delivery fees...
      </div>
    );
  }

  return (
    <div className="max-w-xl p-4  rounded-2xl text-white">
      {/* TITLE */}
      <h2 className="text-xl font-semibold text-[#B476FF] mb-4">
        Delivery Fees 
      </h2>

      {/* CURRENT */}
      <div className="mb-6">
        <p className="text-md text-gray-400">Current Delivery Fee</p>
        <p className="text-2xl font-bold">{deliFees.toLocaleString()} Ks</p>
      </div>

      {/* INPUT */}
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 mb-6"
      />

      {/* BUTTON */}
      <button
        onClick={handleSaveClick}
        disabled={saving}
        className="w-full py-3 rounded-xl bg-purple-500 "
      >
        {saving ? "Saving..." : "Update Delivery Fee"}
      </button>

      {/* ================= PASSCODE MODAL ================= */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setPasscodeModal(false);
              setPasscode("");
            }}
          />

          <div className="relative bg-[#1e2235] rounded-xl p-6 w-[90%] max-w-[330px]">
            <h3 className="text-lg font-bold text-center text-purple-400 mb-4">
              Enter Passcode
            </h3>

            <input
              ref={passcodeInputRef}
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={handlePassKey}
              placeholder="Passcode"
              className="w-full px-3 py-2 mb-4 rounded-lg bg-neutral-900 border border-neutral-700"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPasscodeModal(false);
                  setPasscode("");
                }}
                className="flex-1 px-4 py-2 border border-neutral-700 rounded-lg text-white hover:bg-[#2c2f44]"
              >
                Cancel
              </button>

              <button
                onClick={doSave}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg hover:opacity-90"
              >
                {saving ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
