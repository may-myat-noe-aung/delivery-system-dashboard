
import { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { apiFetch } from "../../api";
import { useAlert } from "../../AlertContext";

const API_URL = "https://api.pwezayshops.com/create-main-menu";
const VERIFY_PASSCODE_URL =
  "https://api.pwezayshops.com/admin/verify-owner-passcode";

const AddMainMenu = ({ menu, onClose, onSuccess }) => {
  const { showAlert } = useAlert();

  const [mainMenu, setMainMenu] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const passcodeInputRef = useRef(null);

  const menuId = menu?.menu_id ?? menu?.id;

  useEffect(() => {
    if (passcodeModal) {
      setTimeout(() => {
        passcodeInputRef.current?.focus();
      }, 100);
    }
  }, [passcodeModal]);

  const handleSubmit = (event) => {
    event?.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!menuId) {
      showAlert("Menu ID not found", "error");
      return;
    }

    if (!mainMenu) {
      showAlert("Please select a main menu position", "error");
      return;
    }

    setPasscode("");
    setPasscodeModal(true);
  };

  const doSubmit = async (event) => {
    event?.preventDefault();

    if (pendingSubmit || loading) return;

    if (!passcode.trim()) {
      showAlert("Please enter passcode", "error");
      passcodeInputRef.current?.focus();
      return;
    }

    setPendingSubmit(true);

    try {
      const token = localStorage.getItem("token");

      // Step 1: Verify owner passcode.
      // Use fetch directly so a wrong passcode returning 403
      // does not trigger apiFetch's automatic logout behavior.
      const verifyResponse = await fetch(VERIFY_PASSCODE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token
            ? { Authorization: `MSHteam ${token}` }
            : {}),
        },
        body: JSON.stringify({
          passcode: passcode.trim(),
        }),
      });

      const verifyData = await verifyResponse
        .json()
        .catch(() => ({}));

      // Wrong passcode: display the actual API message.
      // Keep the modal open so the user can try again.
      if (!verifyResponse.ok || verifyData.success !== true) {
        showAlert(
          verifyData.message || "Passcode verification failed",
          "error"
        );
        return;
      }

      // Step 2: Only submit the main menu after verification succeeds.
      setLoading(true);

      const response = await apiFetch(API_URL, {
        method: "PATCH",
        body: JSON.stringify({
          menu_id: menuId,
          main_menu: Number(mainMenu),
        }),
      });

      // apiFetch may return null after handling an auth error.
      if (!response) return;

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        const errorMessage =
          data.message || "Failed to add main menu";

        setMessage(errorMessage);
        setSuccess(false);
        showAlert(errorMessage, "error");
        return;
      }

      const successMessage =
        data.message || "Main menu added successfully";

      setMessage(successMessage);
      setSuccess(true);
      showAlert(successMessage, "success");

      setPasscodeModal(false);
      setPasscode("");
      setMainMenu("");

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.error("Add Main Menu Error:", error);

      const errorMessage =
        error?.message || "Something went wrong. Please try again.";

      setMessage(errorMessage);
      setSuccess(false);
      showAlert(errorMessage, "error");
    } finally {
      setLoading(false);
      setPendingSubmit(false);
    }
  };

  const closePasscodeModal = () => {
    if (pendingSubmit || loading) return;

    setPasscodeModal(false);
    setPasscode("");
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2c2f44] bg-[#15192b] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2c2f44] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                <LayoutGrid size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  Add Main Menu
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Select a position for this menu
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading || pendingSubmit}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Selected Menu */}
            <div className="rounded-xl border border-[#30354d] bg-[#1b2035] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Selected Menu
              </p>

              <div className="flex items-center gap-4">
                {menu?.photo || menu?.image || menu?.image_url ? (
                  <img
                    src={menu.photo || menu.image || menu.image_url}
                    alt={menu?.name || menu?.menu_name || "Menu"}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                    <LayoutGrid size={26} />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white">
                    {menu?.menu_name ||
                      menu?.name ||
                      menu?.title ||
                      "Selected Menu"}
                  </h3>

                  {menuId && (
                    <p className="mt-1 text-xs text-gray-400">
                      Menu ID: {menuId}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Position Selection */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-white">
                  Main Menu Position
                </label>

                <span className="text-xs text-gray-400">
                  Choose 1–10
                </span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 10 }, (_, index) => {
                  const position = index + 1;
                  const selected =
                    Number(mainMenu) === position;

                  return (
                    <button
                      key={position}
                      type="button"
                      onClick={() =>
                        setMainMenu(String(position))
                      }
                      disabled={loading || pendingSubmit}
                      className={`relative flex h-14 items-center justify-center rounded-xl border text-lg font-bold transition ${
                        selected
                          ? "border-purple-400 bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                          : "border-[#30354d] bg-[#1b2035] text-gray-400 hover:border-purple-400/60 hover:bg-purple-500/10 hover:text-white"
                      }`}
                    >
                      {position}

                      {selected && (
                        <CheckCircle2
                          size={15}
                          className="absolute right-1 top-1 text-white"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {mainMenu && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm text-purple-300">
                  <Sparkles size={17} />
                  Position {mainMenu} selected
                </div>
              )}
            </div>

            {/* API Result Message */}
            {message && (
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 ${
                  success
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/20 bg-red-500/10 text-red-300"
                }`}
              >
                {success ? (
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                  />
                ) : (
                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />
                )}

                <p className="text-sm">{message}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 border-t border-[#2c2f44] pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={loading || pendingSubmit}
                className="flex-1 rounded-xl border border-[#353a52] px-4 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || pendingSubmit || !mainMenu}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading || pendingSubmit
                  ? "Please wait..."
                  : "Add Main Menu"}

                {!loading && !pendingSubmit && (
                  <ArrowRight size={17} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Passcode Modal — same UI as AnnouncementTab.jsx */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closePasscodeModal}
          />

          <div className="relative w-[90%] max-w-[330px] rounded-xl border border-[#2c2f44] bg-[#1e2235] p-6">
            <h3 className="mb-4 text-center text-lg font-bold text-purple-400">
              Enter Passcode
            </h3>

            <form onSubmit={doSubmit}>
              <input
                ref={passcodeInputRef}
                type="password"
                value={passcode}
                onChange={(event) =>
                  setPasscode(event.target.value)
                }
                disabled={pendingSubmit || loading}
                className="mb-4 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white outline-none focus:border-purple-500 disabled:opacity-50"
                placeholder="Passcode"
                autoComplete="current-password"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closePasscodeModal}
                  disabled={pendingSubmit || loading}
                  className="flex-1 rounded-lg border border-neutral-700 px-3 py-2 text-white transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={pendingSubmit || loading}
                  className="flex-1 rounded-lg bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pendingSubmit || loading ? "..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMainMenu;
