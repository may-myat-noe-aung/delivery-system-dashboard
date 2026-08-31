import React, { useEffect, useState, useRef } from "react";
import {
  X,
  Store,
  Receipt,
  Percent,
  Save,
  Loader2,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { useAlert } from "../../AlertContext";


const API_URL = "https://api.pwezayshops.com";

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function formatDate(date) {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const paid = status?.toLowerCase() === "paid";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        paid
          ? "bg-emerald-500/10 text-emerald-300"
          : "bg-yellow-500/10 text-yellow-300"
      }`}
    >
      {paid && <CheckCircle2 size={12} />}
      {status || "pending"}
    </span>
  );
}

function LoadingDetails() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="h-32 rounded-2xl bg-white/5" />
      <div className="h-40 rounded-2xl bg-white/5" />
      <div className="h-64 rounded-2xl bg-white/5" />
      <div className="h-64 rounded-2xl bg-white/5" />
    </div>
  );
}

function formatDateTime(date) {
  if (!date) return "-";

  const parsed = new Date(date.replace(" ", "T"));

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FinanceShopDetails({ shop, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [platformMethod, setPlatformMethod] = useState("Weekly");
  const [platformFee, setPlatformFee] = useState("");

  const [commissionMethod, setCommissionMethod] = useState("Weekly");
  const [commissionFee, setCommissionFee] = useState("");

  const [saving, setSaving] = useState(false);
  const [payingId, setPayingId] = useState(null);


  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeLoading, setPasscodeLoading] = useState(false);
  const passcodeInputRef = useRef(null);
  const [pendingCommissionRecord, setPendingCommissionRecord] = useState(null);

  const [pendingPlatformRecord, setPendingPlatformRecord] = useState(null);

  const token = localStorage.getItem("token");
  const { showAlert } = useAlert();

  useEffect(() => {
    if (!shop?.id) {
      setData(null);
      return;
    }

 const fetchFinanceDetails = async () => {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}/finance/${shop.id}`, {
      method: "GET",
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(
        result?.message ||
        result?.error ||
        `Request failed: ${res.status}`
      );
    }

    setData(result);

    setPlatformMethod(
      result.shopsInfo?.platform_fees_method || "Monthly"
    );

    setPlatformFee(
      result.shopsInfo?.platform_fees ?? ""
    );

    setCommissionMethod(
      result.shopsInfo?.commission_fees_method || "Monthly"
    );

    setCommissionFee(
      result.shopsInfo?.commission_fees ?? ""
    );

  } catch (err) {
    console.error("Finance details error:", err);

    showAlert(
      err.message || "Failed to load finance details.",
      "error"
    );

  } finally {
    setLoading(false);
  }
};

    fetchFinanceDetails();
  }, [shop?.id, token]);

  const refreshDetails = async () => {
    if (!shop?.id) return;

    const res = await fetch(`${API_URL}/finance/${shop.id}`, {
      method: "GET",
      headers: {
        Authorization: `MSHteam ${token}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      setData(result);

      setPlatformMethod(result.shopsInfo?.platform_fees_method || "Monthly");

      setPlatformFee(result.shopsInfo?.platform_fees ?? "");

      setCommissionMethod(
        result.shopsInfo?.commission_fees_method || "Monthly",
      );

      setCommissionFee(result.shopsInfo?.commission_fees ?? "");
    }
  };

const handleConfirmPasscode = async () => {
  if (!passcode.trim()) {
    showAlert("Please enter passcode.", "error");
    return;
  }

  try {
    setPasscodeLoading(true);

    const verifyRes = await fetch(
      `${API_URL}/admin/verify-manager-passcode`,
      {
        method: "POST",
        headers: {
          Authorization: `MSHteam ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passcode,
        }),
      }
    );

    const verifyResult = await verifyRes.json();

    if (!verifyRes.ok || !verifyResult.success) {
      showAlert(
        verifyResult?.message || "Incorrect passcode.",
        "error"
      );
      return;
    }

    // Close modal
    setPasscodeModal(false);
    setPasscode("");

    // Commission payment
    if (pendingCommissionRecord) {
      await payCommissionAfterVerify(pendingCommissionRecord);
      setPendingCommissionRecord(null);
      return;
    }

    // Platform payment
    if (pendingPlatformRecord) {
      await payPlatformFeeAfterVerify(pendingPlatformRecord);
      setPendingPlatformRecord(null);
      return;
    }

    // Save finance settings
    await handleSaveFees();

  } catch (err) {
    console.error("Passcode verification error:", err);

    showAlert(
      err.message || "Passcode verification failed.",
      "error"
    );

  } finally {
    setPasscodeLoading(false);
  }
};

//   const handleSaveFees = async () => {
//     if (!shop?.id) return;

//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       const payload = {
//         platform_fees_method: platformMethod,
//         platform_fees: Number(platformFee),
//         commission_fees_method: commissionMethod,
//         commission_fees: Number(commissionFee),
//       };

//       console.log("SENDING EXACT PAYLOAD:", payload);
//       console.log("platformMethod:", platformMethod);
// console.log("platformFee:", platformFee);
// console.log("commissionMethod:", commissionMethod);
// console.log("commissionFee:", commissionFee);
// console.log("FINAL PAYLOAD:", JSON.stringify(payload));

//       const res = await fetch(`${API_URL}/changeMethodsAndFees/${shop.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `MSHteam ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();

//       console.log("STATUS:", res.status);
//       console.log("RESULT:", result);

//       if (!res.ok || result?.success === false) {
//         throw new Error(
//           result?.message || result?.error || `Update failed (${res.status})`,
//         );
//       }

//       await refreshDetails();

//       setSuccess("Finance settings updated successfully.");
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };
// const handleSaveFees = async () => {
//   if (!shop?.id) return;

//   try {
//     setSaving(true);

//     const platformFeeValue = Number(platformFee);
//     const commissionFeeValue = Number(commissionFee);

//     if (!Number.isFinite(platformFeeValue)) {
//       showAlert("Please enter a valid platform fee.", "error");
//       return;
//     }

//     if (!Number.isFinite(commissionFeeValue)) {
//       showAlert("Please enter a valid commission percentage.", "error");
//       return;
//     }

//     if (commissionFeeValue < 0 || commissionFeeValue > 99.99) {
//       showAlert(
//         "Commission fee must be between 0 and 99.99%.",
//         "error"
//       );
//       return;
//     }

//     if (commissionFeeValue > 10) {
//       showAlert(
//         "Commission fee cannot be more than 10%.",
//         "error"
//       );
//       return;
//     }

//     const payload = {
//       platform_fees_method: platformMethod,
//       platform_fees: platformFeeValue,
//       commission_fees_method: commissionMethod,
//       commission_fees: commissionFeeValue,
//     };

//     console.log("========== FINANCE UPDATE ==========");
//     console.log("URL:", `${API_URL}/changeMethodsAndFees/${shop.id}`);
//     console.log("FINAL PAYLOAD:", payload);

//     const res = await fetch(
//       `${API_URL}/changeMethodsAndFees/${shop.id}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `MSHteam ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const result = await res.json();

//     console.log("STATUS:", res.status);
//     console.log("RESULT:", result);

//     if (!res.ok || result?.success === false) {
//       throw new Error(
//         result?.message ||
//         result?.error ||
//         `Update failed (${res.status})`
//       );
//     }

//     await refreshDetails();

//     showAlert(
//       result?.message || "Finance settings updated successfully.",
//       "success"
//     );

//   } catch (err) {
//     console.error("Finance update error:", err);

//     showAlert(
//       err.message || "Failed to update methods and fees.",
//       "error"
//     );

//   } finally {
//     setSaving(false);
//   }
// };

const handleSaveFees = async () => {
  if (!shop?.id) return;

  try {
    setSaving(true);

    const payload = {
      platform_fees_method: platformMethod,
      platform_fees: Number(platformFee),
      commission_fees_method: commissionMethod,
      commission_fees: Number(commissionFee),
    };

    console.log("========== FINANCE UPDATE ==========");
    console.log("URL:", `${API_URL}/changeMethodsAndFees/${shop.id}`);
    console.log("FINAL PAYLOAD:", payload);

    const res = await fetch(
      `${API_URL}/changeMethodsAndFees/${shop.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `MSHteam ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESULT:", result);

    if (!res.ok || result?.success === false) {
      showAlert(
        result?.message ||
          result?.error ||
          `Update failed (${res.status})`,
        "error"
      );
      return;
    }

    await refreshDetails();

    showAlert(
      result?.message || "Finance settings updated successfully.",
      "success"
    );

  } catch (err) {
    console.error("Finance update error:", err);

    showAlert(
      err.message || "Failed to update methods and fees.",
      "error"
    );

  } finally {
    setSaving(false);
  }
};
const handlePayPlatformFee = (record) => {
  if (!record?.id) {
    showAlert("Platform fee record ID is missing.", "error");
    return;
  }

  setPendingPlatformRecord(record);
  setPasscode("");
  setPasscodeModal(true);

  setTimeout(() => {
    passcodeInputRef.current?.focus();
  }, 200);
};

const payPlatformFeeAfterVerify = async (record) => {
  try {
    setPayingId(`platform-${record.id}`);

    const res = await fetch(
      `${API_URL}/pay-platform-fees/${record.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `MSHteam ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok || result.success === false) {
      throw new Error(
        result?.message ||
        "Failed to mark platform fee as paid."
      );
    }

    await refreshDetails();

    showAlert(
      result?.message || "Platform fee marked as paid.",
      "success"
    );

  } catch (err) {
    console.error("Pay platform fee error:", err);

    showAlert(
      err.message || "Failed to mark platform fee as paid.",
      "error"
    );

  } finally {
    setPayingId(null);
  }
};

const handlePayCommission = (record) => {
  if (!record?.id) {
    showAlert("Commission record ID is missing.", "error");
    return;
  }

  // Save the record that will be paid
  setPendingCommissionRecord(record);

  // Open same passcode modal
  setPasscode("");
  setPasscodeModal(true);

  setTimeout(() => {
    passcodeInputRef.current?.focus();
  }, 200);
};

const payCommissionAfterVerify = async (record) => {
  try {
    setPayingId(`commission-${record.id}`);

    const res = await fetch(
      `${API_URL}/pay-commission/${record.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `MSHteam ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok || result.success === false) {
      throw new Error(
        result?.message ||
        "Failed to mark commission as paid."
      );
    }

    await refreshDetails();

    showAlert(
      result?.message || "Commission marked as paid.",
      "success"
    );

  } catch (err) {
    console.error("Pay commission error:", err);

    showAlert(
      err.message || "Failed to mark commission as paid.",
      "error"
    );

  } finally {
    setPayingId(null);
  }
};

  if (!shop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
              <Store size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-purple-400 flex items-center justify-center">
                {shop.shop_name}
                <p className="text-sm text-slate-400"> ({shop.id}) </p>
              </h2>

             
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">

          {loading && <LoadingDetails />}

          {!loading && data && (
            <div className="space-y-5 ">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <CreditCard size={27} className="text-purple-300" />

                  <h3 className="text-md font-semibold text-white">
                    Finance Settings
                  </h3>
                 
                </div>
                      <div className="flex items-center gap-2 mb-2"> Created  :
                    <p className="text-xs text-slate-400">
   {formatDateTime(data?.shopsInfo?.created_at || shop.created_at)}
</p>
                    </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Receipt size={17} className="text-purple-300" />

                      <h4 className="text-sm font-medium text-white">
                        Platform Fee
                      </h4>
                      
                    </div>
                    
               

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          Method
                        </label>

                        <div className="grid grid-cols-3 gap-1 rounded-xl border border-purple-500/20 bg-slate-950/80 p-1">
                        {["Daily", "Weekly", "Monthly"].map((method) => {
                            const active = platformMethod === method;

                            return (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setPlatformMethod(method)}
                                className={`relative rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                                  active
                                    ? "bg-[#B476FF] text-white shadow-lg shadow-purple-500/20"
                                    : "text-slate-400 hover:bg-purple-500/10 hover:text-purple-300"
                                }`}
                              >
                                {method}

                                {active && (
                                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-white/40" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          Platform Fee
                        </label>

                        <div className="relative">
                    <input
  type="number"
  min="0"
  value={platformFee}
  onChange={(e) => setPlatformFee(e.target.value)}
  placeholder="Enter fee amount"
  className="w-full rounded-xl border border-purple-500/20 bg-slate-950/80 px-4 py-3 pr-14 text-sm font-medium text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#B476FF] focus:ring-4 focus:ring-purple-500/10"
/>

                          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-[#B476FF]">
                           Ks
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="mb-4 flex items-center gap-2">
                      <Percent size={17} className="text-[#B476FF]" />

                      <h4 className="text-sm font-medium text-white">
                        Commission Fee
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {/* Method */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          Method
                        </label>

                        <div className="grid grid-cols-3 gap-1 rounded-xl border border-purple-500/20 bg-slate-950/80 p-1">
                        {["Daily", "Weekly", "Monthly"].map((method) => {
                            const active = commissionMethod === method;

                            return (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setCommissionMethod(method)}
                                className={`relative rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                                  active
                                    ? "bg-[#B476FF] text-white shadow-lg shadow-purple-500/20"
                                    : "text-slate-400 hover:bg-purple-500/10 hover:text-purple-300"
                                }`}
                              >
                                {method}

                                {active && (
                                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-white/40" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Percentage */}
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          Percentage
                        </label>

                        {/* <div className="relative">
                          <input
                           type="number"
  min="0"
  max="99.99"
  step="0.01"
  value={commissionFee}
  onChange={(e) => setCommissionFee(e.target.value)}
                            placeholder="Enter commission percentage"
                            className="w-full rounded-xl border border-purple-500/20 bg-slate-950/80 px-4 py-3 pr-14 text-sm font-medium text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#B476FF] focus:ring-4 focus:ring-purple-500/10"
                          />

                          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-[#B476FF]">
                            %
                          </div>
                        </div> */}
                        <div className="relative">
  <input
    type="number"
    value={commissionFee}
    onChange={(e) => setCommissionFee(e.target.value)}
    placeholder="Enter commission percentage"
    className="w-full rounded-xl border border-purple-500/20 bg-slate-950/80 px-4 py-3 pr-14 text-sm font-medium text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#B476FF] focus:ring-4 focus:ring-purple-500/10"
  />

  <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-[#B476FF]">
    %
  </div>
</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setPasscode("");
                      setPasscodeModal(true);

                      setTimeout(() => {
                        passcodeInputRef.current?.focus();
                      }, 200);
                    }}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}

                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </section>

              {/* Platform Fee Records */}
              <section className="rounded-2xl border border-white/10 bg-white/5  p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Receipt size={25} className="text-purple-300" />

                  <div>
                    <h3 className="text-md font-semibold text-white">
                      Platform Fee Records
                    </h3>

                    {/* <p className="mt-0.5 text-xs text-slate-500">
                      Platform fee payment history
                    </p> */}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10 ">
                  <div className="max-h-[193px] overflow-y-auto">
                    <table className="w-full min-w-[800px]  text-left">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03]">
                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Type
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Period Start
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Period End
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Amount
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Status
                          </th>

                          <th className="px-5 py-3 text-right text-xs font-medium text-slate-400">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/5">
                        {Array.isArray(data?.platform_fee_records) &&
                        data.platform_fee_records.length > 0 ? (
                          data.platform_fee_records.map((record, index) => (
                            <tr
                              key={`${record.period_start}-${record.period_end}-${index}`}
                              className="transition hover:bg-white/[0.025]"
                            >
                              <td className="px-5 py-4 text-sm font-medium text-white">
                                {record.type || "-"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-300">
                                {formatDate(record.period_start)}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-300">
                                {formatDate(record.period_end)}
                              </td>

                              <td className="px-5 py-4 text-sm font-semibold text-white">
                                {formatNumber(record.amount)}
                                <span className="ml-1 text-xs font-normal text-slate-500">
                                  MMK
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <StatusBadge status={record.status} />
                              </td>

                           <td className="px-5 py-4 text-right">
  {record.status?.toLowerCase() === "paid" ? (
    <span className="text-sm font-bold text-purple-400">
      Paid
    </span>
  ) : record.id ? (
    <button
      type="button"
      onClick={() => handlePayPlatformFee(record)}
      disabled={payingId === `platform-${record.id}`}
      className="inline-flex items-center gap-2 rounded-lg bg-[#B476FF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#a45ff0] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {payingId === `platform-${record.id}` && (
        <Loader2
          size={13}
          className="animate-spin"
        />
      )}

      {payingId === `platform-${record.id}`
        ? "Paying..."
        : "Mark as Paid"}
    </button>
  ) : (
    <span className="text-xs text-slate-600">
      No ID
    </span>
  )}
</td>
                            </tr>
                          ))
                        ) : (
                          <EmptyTableRow colSpan={6} />
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Commission Records */}
              <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Percent size={27} className="text-[#B476FF]" />

                  <div>
                    <h3 className="text-md font-semibold text-white">
                      Commission Records
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <div className="max-h-[193px] overflow-y-auto">
                    <table className="w-full min-w-[850px] text-left">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03]">
                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Type
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Period
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Sale Amount
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Commission %
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Commission Fee
                          </th>

                          <th className="px-5 py-3 text-xs font-medium text-slate-400">
                            Status
                          </th>

                          <th className="px-5 py-3 text-right text-xs font-medium text-slate-400">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-white/5">
                        {data.commission_records?.length ? (
                          data.commission_records.map((record, index) => (
                            <tr
                              key={
                                record.id || `${record.period_start}-${index}`
                              }
                              className="transition hover:bg-white/[0.025]"
                            >
                              <td className="px-5 py-4 text-sm font-medium text-white">
                                {record.type || "-"}
                              </td>

                              <td className="px-5 py-4">
                                <div className="text-sm text-slate-200">
                                  {formatDate(record.period_start)}
                                </div>

                                <div className="mt-1 text-xs text-slate-500">
                                  to {formatDate(record.period_end)}
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm font-semibold text-white">
                                {formatNumber(record.sale_amount)}{" "}
                                <span className="text-xs font-normal text-slate-500">
                                  MMK
                                </span>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-200">
                                {record.commission_percentages ?? "0.00"}%
                              </td>

                              <td className="px-5 py-4 text-sm font-semibold text-white">
                                {formatNumber(record.commission_fees)}{" "}
                                <span className="text-xs font-normal text-slate-500">
                                  MMK
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <StatusBadge status={record.status} />
                              </td>

                              <td className="px-5 py-4 text-right">
                                {record.status?.toLowerCase() === "paid" ? (
                                  <span className="text-sm font-bold text-purple-400">
                                    Paid
                                  </span>
                                ) : record.id ? (
                                  <button
                                    type="button"
                                    onClick={() => handlePayCommission(record)}
                                    disabled={
                                      payingId === `commission-${record.id}`
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#B476FF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#a45ff0] disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    {payingId === `commission-${record.id}` && (
                                      <Loader2
                                        size={13}
                                        className="animate-spin"
                                      />
                                    )}

                                    {payingId === `commission-${record.id}`
                                      ? "Paying..."
                                      : "Mark as Paid"}
                                  </button>
                                ) : (
                                  <span className="text-xs text-slate-600">
                                    No ID
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <EmptyTableRow colSpan={7} />
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      {passcodeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center backdrop-blur-sm p-2">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              if (!passcodeLoading) {
                setPasscodeModal(false);
                setPasscode("");
              }
            }}
          />

          {/* Modal Box */}
          <div className="relative bg-slate-900 rounded-xl p-4 md:p-6 w-full max-w-[330px] shadow-2xl border border-slate-700 text-white">
            {/* Header */}
            <h3 className="text-lg font-bold text-center text-[#B476FF] mb-4">
              Enter Passcode
            </h3>

            {/* Input */}
            <input
              ref={passcodeInputRef}
              type="password"
              disabled={passcodeLoading}
              className="border border-slate-700 rounded-lg w-full px-3 py-2 mb-4 bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !passcodeLoading) {
                  handleConfirmPasscode();
                }
              }}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <button
                type="button"
                disabled={passcodeLoading}
                onClick={() => {
                  setPasscodeModal(false);
                  setPasscode("");
                }}
                className="px-4 py-1.5 border border-slate-700 rounded-lg hover:bg-slate-700 w-full sm:w-auto disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmPasscode}
                disabled={passcodeLoading}
                className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-[#B476FF] text-white rounded-lg shadow hover:opacity-90 w-full sm:w-auto disabled:opacity-50"
              >
                {passcodeLoading && (
                  <Loader2 size={15} className="animate-spin" />
                )}

                {passcodeLoading ? "Verifying..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] text-slate-500">{label}</p>

      <p className="mt-1 text-sm text-slate-200">{value || "-"}</p>
    </div>
  );
}

function EmptyTableRow({ colSpan }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-5 py-8 text-center text-sm text-slate-500"
      >
        No records found.
      </td>
    </tr>
  );
}

