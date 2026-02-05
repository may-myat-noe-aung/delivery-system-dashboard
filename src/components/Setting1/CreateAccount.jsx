// import { X, Camera, Eye, EyeOff } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { useAlert } from "../../AlertContext";

// export default function CreateAccount() {
//   const { showAlert } = useAlert();

//   const [newAccount, setNewAccount] = useState({
//     role: "Admin",
//     name: "",
//     password: "",
//     email: "",
//     phone: "",
//     gender: "Female",
//     photo: null,
//     passcode: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showPasscodeModal, setShowPasscodeModal] = useState(false);
//   const [passcode, setPasscode] = useState("");
//   const [saving, setSaving] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     const nameInput = document.getElementById("full-name-input");
//     if (nameInput) nameInput.focus();
//   }, []);

//   const handleNewChange = (field, value) => {
//     setNewAccount((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

//   const handleRegister = async () => {
//     const newErrors = {};
//     if (!newAccount.name.trim()) newErrors.name = "Name is required";
//     if (!newAccount.email.trim()) newErrors.email = "Email is required";
//     if (!newAccount.password.trim())
//       newErrors.password = "Password is required";
//     if (!newAccount.role.trim()) newErrors.role = "Role is required";

//     setErrors(newErrors);
//     setSuccessMessage("");
//     if (Object.keys(newErrors).length > 0) return;

//     if (!isValidEmail(newAccount.email)) {
//       showAlert("Email သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
//       return;
//     }

//     if (!isValidPhone(newAccount.phone)) {
//       showAlert("Phone Number သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
//       return;
//     }

//     const strongPasswordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
//     if (!strongPasswordRegex.test(newAccount.password)) {
//       showAlert(
//         "Password သည် အနည်းဆုံး 8 လုံးရှိရမည်၊ Uppercase, Lowercase, Number, Special Character ပါဝင်ရမည်",
//         "error"
//       );
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", newAccount.name);
//     formData.append("email", newAccount.email);
//     formData.append("password", newAccount.password);
//     formData.append("role", newAccount.role);
//     formData.append("gender", newAccount.gender);
//     formData.append("photo", newAccount.photo || "");
//     formData.append("phone", newAccount.phone);

//     if (newAccount.role === "Manager") {
//       if (!/^\d{6}$/.test(newAccount.passcode)) {
//         showAlert("Owner Passcode သည် 6 လုံး အတိအကျ ရှိရမည်", "error");
//         return;
//       }
//       formData.append("passcode", newAccount.passcode);
//     }

//     try {
//       setSaving(true);
//       const res = await fetch("http://38.60.244.108:3000/admin", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json().catch(() => ({}));

//       if (res.ok && data.success) {
//         showAlert(
//           data.message || "အကောင့်အသစ် အောင်မြင်စွာ register လုပ်ပြီးပါပြီ",
//           "success"
//         );
//         setNewAccount({
//           role: "Admin",
//           name: "",
//           password: "",
//           email: "",
//           phone: "",
//           gender: "Female",
//           photo: null,
//           passcode: "",
//         });
//         setErrors({});
//       } else {
//         showAlert(data.message || "အကောင့် register မအောင်မြင်ပါ", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert("Network error (Server unreachable)", "error");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasscodeConfirm = async () => {
//     const trimmedPasscode = passcode.trim();

//     if (!trimmedPasscode) {
//       showAlert("Passcode ထည့်ရန် လိုအပ်ပါသည်", "error");
//       return;
//     }
//     if (!/^\d{6}$/.test(trimmedPasscode)) {
//       showAlert("Passcode သည် 6 လုံး အတိအကျ ရှိရမည်", "error");
//       return;
//     }

//     try {
//       const res = await fetch(
//         "http://38.60.244.108:3000/admin/verify-owner-passcode",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ passcode: trimmedPasscode }),
//         }
//       );
//       const data = await res.json().catch(() => ({}));

//       if (!data.success) {
//         showAlert(data.message || "Passcode မမှန်ပါ", "error");
//         return;
//       }

//       await handleRegister();
//       setShowPasscodeModal(false);
//     } catch (err) {
//       console.error(err);
//       showAlert("Passcode verification မအောင်မြင်ပါ", "error");
//     }
//   };

//   return (
//     <div>
//       <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
//         Register New Account
//       </h3>

//       {/* Photo Upload */}
//       <div className="relative flex flex-col items-start justify-start mb-6">
//         <div className="relative">
//           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B476FF] shadow-lg bg-white flex items-center justify-center">
//             {newAccount.photo ? (
//               <img
//                 src={URL.createObjectURL(newAccount.photo)}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-[#B476FF] font-bold text-xl">
//                 {newAccount.name
//                   ? newAccount.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .toUpperCase()
//                   : "P"}
//               </span>
//             )}
//           </div>

//           <label
//             htmlFor="photo-upload"
//             className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 cursor-pointer hover:bg-black/20 transition shadow-md"
//           >
//             <Camera className="w-5 h-5 text-[#B476FF]" />
//           </label>

//           <input
//             id="photo-upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => {
//               const file = e.target.files[0];
//               if (file) handleNewChange("photo", file);
//             }}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Role */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">
//             Role <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={newAccount.role}
//             onChange={(e) => handleNewChange("role", e.target.value)}
//             className={`w-full rounded-lg bg-white border px-3 py-2 text-sm text-gray-900 focus:outline-none ${
//               errors.role
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#B476FF]"
//             }`}
//           >
//             <option value="Manager">Manager</option>
//             <option value="Admin">Admin</option>
//           </select>
//           {errors.role && (
//             <p className="text-red-500 text-xs mt-1">{errors.role}</p>
//           )}
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">
//             Full Name <span className="text-red-500">*</span>
//           </label>
//           <input
//             id="full-name-input"
//             type="text"
//             value={newAccount.name}
//             onChange={(e) => handleNewChange("name", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") setShowPasscodeModal(true);
//             }}
//             className={`w-full rounded-lg bg-white border px-3 py-2 text-sm focus:outline-none ${
//               errors.name
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#B476FF]"
//             }`}
//           />
//           {errors.name && (
//             <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="email"
//             value={newAccount.email}
//             onChange={(e) => handleNewChange("email", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") setShowPasscodeModal(true);
//             }}
//             className={`w-full rounded-lg bg-white border px-3 py-2 text-sm focus:outline-none ${
//               errors.email
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#B476FF]"
//             }`}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Password with eye toggle */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={newAccount.password}
//               onChange={(e) => handleNewChange("password", e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") setShowPasscodeModal(true);
//               }}
//               className={`w-full rounded-lg bg-white border px-3 py-2 text-sm focus:outline-none ${
//                 errors.password
//                   ? "border-red-500"
//                   : "border-gray-300 focus:border-[#B476FF]"
//               }`}
//             />
//             <span
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <Eye className="w-5 h-5" />
//               ) : (
//                 <EyeOff className="w-5 h-5" />
//               )}
//             </span>
//           </div>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             value={newAccount.phone}
//             onChange={(e) => handleNewChange("phone", e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") setShowPasscodeModal(true);
//             }}
//             className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF]"
//             placeholder="Enter phone number"
//           />
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="block text-sm mb-2 text-gray-700">Gender</label>
//           <div className="flex gap-4">
//             {["Female", "Male", "Other"].map((g) => (
//               <label key={g} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   checked={newAccount.gender === g}
//                   onChange={() => handleNewChange("gender", g)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") setShowPasscodeModal(true);
//                   }}
//                   className="text-[#B476FF] focus:ring-[#B476FF]"
//                 />
//                 <span className="text-gray-800 text-sm">{g}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Passcode for Owner */}
//         {/* Passcode for All Roles */}
//         {/* <div>
//   <label className="block text-sm mb-2 text-gray-700">Passcode</label>
//   <input
//     type="password"
//     value={newAccount.passcode}
//     onChange={(e) => {
//       const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//       setNewAccount((prev) => ({ ...prev, passcode: val }));
//     }}
//     placeholder="6-digit passcode"
//     className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF]"
//   />
// </div> */}

//         {/* Passcode for Manager */}
//         {newAccount.role === "Manager" && (
//           <div>
//             <label className="block text-sm mb-2 text-gray-700">Passcode</label>
//             <input
//               type="password"
//               value={newAccount.passcode}
//               onChange={(e) => {
//                 const val = e.target.value.replace(/\D/g, "").slice(0, 6); // numbers only, max 6
//                 setNewAccount((prev) => ({ ...prev, passcode: val }));
//               }}
//               placeholder="Enter passcode"
//               className="w-full rounded-lg bg-white border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF]"
//             />
//           </div>
//         )}

//         {/* Passcode Modal */}
//         {showPasscodeModal && (
//           <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
//             <div className="bg-white border border-gray-300 rounded-xl p-6 w-80 relative">
//               <button
//                 onClick={() => setShowPasscodeModal(false)}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//               >
//                 <X size={18} />
//               </button>

//               <h3 className="text-lg font-semibold mb-4 text-center text-[#B476FF]">
//                 Enter Owner Passcode
//               </h3>

//               <input
//                 type="password"
//                 ref={(input) => input && input.focus()}
//                 value={passcode}
//                 onChange={(e) => {
//                   const val = e.target.value.replace(/\D/g, "").slice(0, 6);
//                   setPasscode(val);
//                 }}
//                 placeholder="Enter passcode"
//                 className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm mb-4"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handlePasscodeConfirm();
//                 }}
//               />

//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setShowPasscodeModal(false)}
//                   className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handlePasscodeConfirm}
//                   className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="col-span-2 flex flex-col items-end justify-between sm:flex-row gap-3 ">
//           <div>
//             {successMessage && (
//               <p className="text-green-500 text-sm mt-1">{successMessage}</p>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() =>
//                 setNewAccount({
//                   role: "Admin",
//                   name: "",
//                   password: "",
//                   email: "",
//                   phone: "",
//                   gender: "Female",
//                   photo: null,
//                   passcode: "",
//                 })
//               }
//               className="rounded-lg border border-gray-300 bg-white text-gray-700 px-5 py-2 hover:bg-gray-100 transition-colors text-sm w-full sm:w-auto"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => setShowPasscodeModal(true)}
//               disabled={saving}
//               className="rounded-lg bg-[#B476FF] text-white px-5 py-2 hover:bg-[#9c57f0] transition-colors font-medium text-sm w-full sm:w-auto"
//             >
//               {saving ? "Saving..." : "Register"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { X, Camera, Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAlert } from "../../AlertContext";
import { useTheme } from "../ThemeProvider"; // adjust path if needed

export default function CreateAccount() {
  const { showAlert } = useAlert();
  const { dark } = useTheme();

  const [newAccount, setNewAccount] = useState({
    role: "Admin",
    name: "",
    password: "",
    email: "",
    phone: "",
    gender: "Female",
    photo: null,
    passcode: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const nameInput = document.getElementById("full-name-input");
    if (nameInput) nameInput.focus();
  }, []);

  const handleNewChange = (field, value) => {
    setNewAccount((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

  const handleRegister = async () => {
    const newErrors = {};
    if (!newAccount.name.trim()) newErrors.name = "Name is required";
    if (!newAccount.email.trim()) newErrors.email = "Email is required";
    if (!newAccount.password.trim())
      newErrors.password = "Password is required";
    if (!newAccount.role.trim()) newErrors.role = "Role is required";

    setErrors(newErrors);
    setSuccessMessage("");
    if (Object.keys(newErrors).length > 0) return;

    if (!isValidEmail(newAccount.email)) {
      showAlert("Email သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
      return;
    }

    if (!isValidPhone(newAccount.phone)) {
      showAlert("Phone Number သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(newAccount.password)) {
      showAlert(
        "Password သည် အနည်းဆုံး 8 လုံးရှိရမည်၊ Uppercase, Lowercase, Number, Special Character ပါဝင်ရမည်",
        "error"
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", newAccount.name);
    formData.append("email", newAccount.email);
    formData.append("password", newAccount.password);
    formData.append("role", newAccount.role);
    formData.append("gender", newAccount.gender);
    formData.append("photo", newAccount.photo || "");
    formData.append("phone", newAccount.phone);

    if (newAccount.role === "Manager") {
      if (!/^\d{6}$/.test(newAccount.passcode)) {
        showAlert("Owner Passcode သည် 6 လုံး အတိအကျ ရှိရမည်", "error");
        return;
      }
      formData.append("passcode", newAccount.passcode);
    }

    try {
      setSaving(true);
      const res = await fetch("http://38.60.244.108:3000/admin", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        showAlert(
          data.message || "အကောင့်အသစ် အောင်မြင်စွာ register လုပ်ပြီးပါပြီ",
          "success"
        );
        setNewAccount({
          role: "Admin",
          name: "",
          password: "",
          email: "",
          phone: "",
          gender: "Female",
          photo: null,
          passcode: "",
        });
        setErrors({});
      } else {
        showAlert(data.message || "အကောင့် register မအောင်မြင်ပါ", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Network error (Server unreachable)", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePasscodeConfirm = async () => {
    const trimmedPasscode = passcode.trim();

    if (!trimmedPasscode) {
      showAlert("Passcode ထည့်ရန် လိုအပ်ပါသည်", "error");
      return;
    }
    if (!/^\d{6}$/.test(trimmedPasscode)) {
      showAlert("Passcode သည် 6 လုံး အတိအကျ ရှိရမည်", "error");
      return;
    }

    try {
      const res = await fetch(
        "http://38.60.244.108:3000/admin/verify-owner-passcode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: trimmedPasscode }),
        }
      );
      const data = await res.json().catch(() => ({}));

      if (!data.success) {
        showAlert(data.message || "Passcode မမှန်ပါ", "error");
        return;
      }

      await handleRegister();
      setShowPasscodeModal(false);
    } catch (err) {
      console.error(err);
      showAlert("Passcode verification မအောင်မြင်ပါ", "error");
    }
  };

  return (
    <div
      className={`${
        dark ? " text-white" : "bg-white text-gray-900"
      } min-h-screen p-4`}
    >
      <h3 className="font-bold text-xl mb-6 text-[#B476FF]">
        Register New Account
      </h3>

      {/* Photo Upload */}
      <div className="relative flex flex-col items-start justify-start mb-6">
        <div className="relative">
          <div
            className={`w-24 h-24 rounded-full overflow-hidden border-2 border-[#B476FF] shadow-lg flex items-center justify-center ${
              dark ? "bg-gray-800" : "bg-white"
            }`}
          >
            {newAccount.photo ? (
              <img
                src={URL.createObjectURL(newAccount.photo)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#B476FF] font-bold text-xl">
                {newAccount.name
                  ? newAccount.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "P"}
              </span>
            )}
          </div>

          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 cursor-pointer hover:bg-black/20 transition shadow-md"
          >
            <Camera className="w-5 h-5 text-[#B476FF]" />
          </label>

          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleNewChange("photo", file);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Role */}
        <div>
          <label className="block text-sm mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            value={newAccount.role}
            onChange={(e) => handleNewChange("role", e.target.value)}
            className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
              errors.role
                ? "border-red-500"
                : dark
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm mb-2">Full Name <span className="text-red-500">*</span></label>
          <input
            id="full-name-input"
            type="text"
            value={newAccount.name}
            onChange={(e) => handleNewChange("name", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowPasscodeModal(true);
            }}
            className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
              errors.name
                ? "border-red-500"
                : dark
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            value={newAccount.email}
            onChange={(e) => handleNewChange("email", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowPasscodeModal(true);
            }}
            className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
              errors.email
                ? "border-red-500"
                : dark
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password with eye toggle */}
        <div>
          <label className="block text-sm mb-2">Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newAccount.password}
              onChange={(e) => handleNewChange("password", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setShowPasscodeModal(true);
              }}
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
                errors.password
                  ? "border-red-500"
                  : dark
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-2">Phone Number</label>
          <input
            type="text"
            value={newAccount.phone}
            onChange={(e) => handleNewChange("phone", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowPasscodeModal(true);
            }}
            className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
              dark
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter phone number"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm mb-2">Gender</label>
          <div className="flex gap-4">
            {["Female", "Male", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  checked={newAccount.gender === g}
                  onChange={() => handleNewChange("gender", g)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setShowPasscodeModal(true);
                  }}
                  className="text-[#B476FF] focus:ring-[#B476FF]"
                />
                <span className={`${dark ? "text-white" : "text-gray-800"} text-sm`}>{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Passcode for Manager */}
        {newAccount.role === "Manager" && (
          <div>
            <label className="block text-sm mb-2">Passcode</label>
            <input
              type="password"
              value={newAccount.passcode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setNewAccount((prev) => ({ ...prev, passcode: val }));
              }}
              placeholder="Enter passcode"
              className={`w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#B476FF] ${
                dark
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        )}

        {/* Passcode Modal */}
        {showPasscodeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className={`rounded-xl p-6 w-80 relative ${
                dark ? "bg-gray-800 border border-gray-600 text-white" : "bg-white border border-gray-300 text-gray-900"
              }`}
            >
              <button
                onClick={() => setShowPasscodeModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                <X size={18} />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-center text-[#B476FF]">
                Enter Owner Passcode
              </h3>

              <input
                type="password"
                ref={(input) => input && input.focus()}
                value={passcode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setPasscode(val);
                }}
                placeholder="Enter passcode"
                className={`w-full rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-[#B476FF] ${
                  dark
                    ? "bg-gray-700 border border-gray-500 text-white placeholder-gray-400"
                    : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePasscodeConfirm();
                }}
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setShowPasscodeModal(false)}
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasscodeConfirm}
                  className="bg-[#B476FF] text-white px-3 py-2 rounded-md text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="col-span-2 flex flex-col items-end justify-between sm:flex-row gap-3 ">
          <div>
            {successMessage && (
              <p className="text-green-500 text-sm mt-1">{successMessage}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setNewAccount({
                  role: "Admin",
                  name: "",
                  password: "",
                  email: "",
                  phone: "",
                  gender: "Female",
                  photo: null,
                  passcode: "",
                })
              }
              className="rounded-lg border border-gray-300 bg-white text-gray-700 px-5 py-2 hover:bg-gray-100 transition-colors text-sm w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowPasscodeModal(true)}
              disabled={saving}
              className="rounded-lg bg-[#B476FF] text-white px-5 py-2 hover:bg-[#9c57f0] transition-colors font-medium text-sm w-full sm:w-auto"
            >
              {saving ? "Saving..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
