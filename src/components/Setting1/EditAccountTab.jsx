import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { useAlert } from "../../AlertContext";


const API_BASE = "http://38.60.244.108:3000";

export default function EditAccountTab() {
  const [accounts, setAccounts] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const { showAlert } = useAlert();

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);

  const dropdownRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* ---------------- Fetch Accounts ---------------- */
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/admin`);
        if (res.data.success) {
          const order = { owner: 1, manager: 2, seller: 3 };
          const sorted = [...res.data.data].sort(
            (a, b) => order[a.role] - order[b.role]
          );
          setAccounts(sorted);
          setSelectedEmail(sorted[0]?.email || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  /* ---------------- Set Selected Account ---------------- */
  useEffect(() => {
    const acc = accounts.find((a) => a.email === selectedEmail);
    if (acc) {
      acc.gender = ["male", "female"].includes(acc.gender?.toLowerCase())
        ? acc.gender
        : "other";
      setAccount(acc);
      setTimeout(() => nameRef.current?.focus(), 0);
    }
  }, [selectedEmail, accounts]);

  /* ---------------- Utilities ---------------- */
  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

  const handleSaveClick = () => {
    if (!account) return;
    setShowModal(true);
  };

  const cancelModal = () => {
    setShowModal(false);
    setPassword("");
  };

  /* ---------------- Submit Update ---------------- */
  const handlePasswordSubmit = async () => {
    if (!password) {
      showAlert("Passcode ထည့်ပေးပါ", "warning");
      return;
    }

    if (!isValidPhone(account.phone)) {
      showAlert("Phone Number သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
      return;
    }

    try {
      const verify = await axios.post(
        `${API_BASE}/admin/verify-owner-passcode`,
        { passcode: password }
      );

      if (!verify.data.success) {
        showAlert(verify.data.message, "error");
        return;
      }

      setSaving(true);

      const formData = new FormData();
      Object.entries({
        strid: account.id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        gender: account.gender,
        role: account.role,
      }).forEach(([k, v]) => formData.append(k, v));

      if (account.photo instanceof File) {
        formData.append("photo", account.photo);
      } else if (typeof account.photo === "string") {
        formData.append("photo", account.photo);
      }

      const res = await axios.put(`${API_BASE}/admin`, formData);

      showAlert(res.data.message, res.data.success ? "success" : "error");

      if (res.data.success) {
        cancelModal();
      }
    } catch (err) {
      showAlert(err.response?.data?.message || "Error occurred", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Loading accounts...</p>;

  return (
    <div className="">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-xl text-[#B476FF]">Edit Account</h3>

        {/* Email Dropdown */}
        <div className="w-[300px] relative" ref={dropdownRef}>
          <div
            className="w-full rounded-lg bg-white border px-3 py-2 text-sm text-gray-700 cursor-pointer hover:border-[#B476FF]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedEmail || "Select account email"}
          </div>

          {dropdownOpen && (
            <ul className="absolute z-50 w-full bg-white border rounded-lg mt-1 max-h-48 overflow-auto">
              {accounts.map((a) => (
                <li
                  key={a.id}
                  onClick={() => {
                    setSelectedEmail(a.email);
                    setDropdownOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-[#B476FF] hover:text-white"
                >
                  {a.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {account && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-600">Name *</label>
            <input
              ref={nameRef}
              value={account.name || ""}
              onChange={(e) =>
                setAccount({ ...account, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone *</label>
            <input
              ref={phoneRef}
              value={account.phone || ""}
              onChange={(e) =>
                setAccount({ ...account, phone: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">Gender *</label>
            <div className="flex gap-4">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={account.gender === g}
                    onChange={() => setAccount({ ...account, gender: g })}
                  />
                  <span className="text-sm capitalize">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-3 pt-4">
            <button
              onClick={() => setSelectedEmail("")}
              className="border px-5 py-2 rounded-lg text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              disabled={saving}
              className="bg-[#B476FF]  px-5 py-2 rounded-lg text-sm hover:bg-[#B476FF] text-white"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Passcode Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border rounded-xl p-6 w-80 relative">
            <button
              onClick={cancelModal}
              className="absolute top-2 right-2 text-gray-500"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center">
              Enter Owner Passcode
            </h3>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4"
              onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
            />

            <div className="flex justify-between">
              <button
                onClick={cancelModal}
                className="border px-4 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="bg-[#B476FF] px-4 py-2 rounded-md text-sm text-black"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )} */}

       {showModal && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white border border-gray-300 rounded-xl p-6 w-80 relative">
                  <button
                    onClick={() => cancelModal(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-black"
                  >
                    <X size={18} />
                  </button>
      
                  <h3 className="text-lg font-semibold mb-4 text-center text-[#B476FF]">
                    Enter Owner Passcode
                  </h3>
      
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passcode"
                    className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#B476FF]"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  />
      
                  <div className="flex justify-between">
                    <button
                      onClick={() => cancelModal(false)}
                      className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm"
                    >
                      Cancel
                    </button>
      
                    <button
                      onClick={handlePasswordSubmit}
                      className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
      
    </div>
  );
}
