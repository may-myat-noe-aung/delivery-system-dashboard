import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  // -------------------------
  // ALERT STATE
  // -------------------------
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });

    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  // -------------------------
  // CONFIRM STATE
  // -------------------------
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    resolve: null,
  });

  const confirm = (message) => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        message,
        resolve,
      });
    });
  };

  const handleYes = () => {
    confirmState.resolve(true);
    setConfirmState({ ...confirmState, open: false });
  };

  const handleNo = () => {
    confirmState.resolve(false);
    setConfirmState({ ...confirmState, open: false });
  };

  // -------------------------
  // WHITE THEME COLORS
  // -------------------------
  const alertColorMap = {
    success: "bg-[#B476FF]",
    error: "bg-red-500",
    warning: "bg-orange-400",
    info: "bg-blue-500",
  };

  return (
    <AlertContext.Provider value={{ showAlert, confirm }}>
      {children}

      {/* ------------------ ALERT UI ------------------ */}
      {alert.show && (
        <div
          className={`
            fixed top-6 left-1/2 z-50
            -translate-x-1/2
            px-5 py-3 rounded-xl shadow-xl
            text-white text-sm font-medium
            animate-slideIn
            ${alertColorMap[alert.type] || alertColorMap.info}
          `}
        >
          {alert.message}
        </div>
      )}

      {/* ------------------ CONFIRM UI ------------------ */}
      {confirmState.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-2xl w-[400px] text-center animate-fadeIn">
            <p className="text-neutral-800 text-lg font-semibold mb-6">
              {confirmState.message}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleYes}
                className="px-6 py-2.5 rounded-xl bg-[#B476FF]
                          text-white font-semibold shadow-md
                          hover:opacity-90 transition"
              >
                Yes
              </button>

              <button
                onClick={handleNo}
                className="px-6 py-2.5 rounded-xl border border-neutral-300
                          text-neutral-700 hover:bg-neutral-100 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
