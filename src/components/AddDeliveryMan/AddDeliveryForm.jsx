// import React, { useState, useRef, useEffect } from "react";
// import { Camera, Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import { useAlert } from "../../AlertContext";

// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };
// const isValidPhone = (phone) => {
//   return /^[0-9]{9,15}$/.test(phone);
// };

// export default function AddDeliveryForm({ shopId, onClose, onAdded }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     photo: null,
//   });

//   const { showAlert } = useAlert();

//   const nameInputRef = useRef(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (nameInputRef.current) nameInputRef.current.focus();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setFormData({ ...formData, photo: file });
//   };

//   // ✅ FINAL SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // -------------------------
//     // VALIDATION
//     // -------------------------
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.password.trim()) newErrors.password = "Password is required";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) {
//       showAlert("Please fill required fields", "warning");
//       return;
//     }

//     // -------------------------
//     // EMAIL CHECK
//     // -------------------------
//     if (!isValidEmail(formData.email)) {
//       showAlert("Email သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
//       return;
//     }

//     if (!isValidPhone(formData.phone)) {
//       showAlert("ဖုန်းနံပါတ် format မမှန်ကန်ပါ", "warning");
//       return;
//     }

//     // -------------------------
//     // PASSWORD CHECK
//     // -------------------------
//     const strongPasswordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//     if (!strongPasswordRegex.test(formData.password)) {
//       showAlert(
//         "Password သည် အနည်းဆုံး 8 လုံးရှိရမည်၊ Uppercase, Lowercase, Number, Special Character ပါဝင်ရမည်",
//         "error",
//       );
//       return;
//     }

//     // -------------------------
//     // CONFIRM PASSWORD
//     // -------------------------
//     if (formData.password !== formData.confirmPassword) {
//       showAlert("စကားဝှက်နှစ်ခု မကိုက်ညီပါ", "warning");
//       return;
//     }

//     // -------------------------
//     // API REQUEST
//     // -------------------------
//     const payload = new FormData();
//     payload.append("name", formData.name);
//     payload.append("email", formData.email);
//     payload.append("phone", formData.phone || "");
//     payload.append("password", formData.password);
//     payload.append("work_type", "");
//     payload.append("location", formData.location || "");

//     if (formData.photo instanceof File) {
//       payload.append("photo", formData.photo);
//     }

//     try {
//       setSaving(true);

//       const res = await axios.post(
//         "https://api.pwezayshops.com/deliverymen",
//         payload,
//         { headers: { "Content-Type": "multipart/form-data" } },
//       );

//       const data = res.data;

//       if (res.status === 200 || data.success) {
//         showAlert(data.message || "Delivery added successfully", "success");

//         onAdded?.();
//         onClose?.();

//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirmPassword: "",
//           work_type: "",
//           location: "",
//           photo: null,
//         });

//         setErrors({});
//       } else {
//         showAlert(data.message || "Failed to add delivery", "error");
//       }
//     } catch (err) {
//       showAlert(err.response?.data?.message || "Network error", "error");
//     } finally {
//       setSaving(false);
//     }
//   };
//   return (
//     <>
//       {/* MAIN MODAL */}
//       <div className="fixed inset-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)]">
//         <div className="relative w-[450px] p-6 rounded-2xl shadow-lg bg-gray-800 text-gray-100">
//           <h2 className="text-lg font-semibold mb-4 text-[#9b5de5]">
//             Add Delivery Man
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-3">
//             {/* PHOTO */}
//             <div className="flex flex-col items-center mb-4">
//               <div className="relative w-28 h-28">
//                 <img
//                   src={
//                     formData.photo
//                       ? URL.createObjectURL(formData.photo)
//                       : "https://i.pinimg.com/736x/4a/6b/e0/4a6be0cad2a1bb290e43477834fdf8ad.jpg"
//                   }
//                   alt="Profile Preview"
//                   className="w-full h-full rounded-full object-cover border-2 border-dashed border-gray-600 shadow-sm"
//                 />
//                 <label className="absolute bottom-0 right-0 bg-[#9b5de5] hover:bg-[#9b5de5] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md">
//                   <Camera className="w-4 h-4" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//               <p className="mt-2 text-sm text-gray-300">Upload profile image</p>
//             </div>

//             {/* NAME */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
//               required
//               ref={nameInputRef}
//             />

//             {/* EMAIL */}
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
//               required
//             />

//             {/* PASSWORD */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full px-3 py-2 rounded-lg text-sm border pr-10 bg-gray-700 border-gray-600 text-gray-100"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </span>
//             </div>

//             {/* CONFIRM PASSWORD */}
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="w-full px-3 py-2 rounded-lg text-sm border pr-10 bg-gray-700 border-gray-600 text-gray-100"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </span>
//             </div>

//             {/* PHONE (no need but kept UI) */}
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone "
//               className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
//             />

//             {/* BUTTONS */}
//             <div className="flex justify-end gap-2 pt-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-lg text-sm border border-gray-600 text-gray-100 hover:bg-gray-700"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={saving}
//                 className={`px-4 py-2 rounded-lg text-sm text-white ${
//                   saving ? "bg-gray-500 cursor-not-allowed" : "bg-[#9b5de5]"
//                 }`}
//               >
//                 {saving ? "Creating New Delivery..." : "Creating New Delivery "}
//               </button>
//             </div>
//           </form>

//           {/* <button
//             onClick={onClose}
//             className="absolute top-3 right-3 text-gray-300 hover:text-white"
//           >
//             ✕
//           </button> */}

//           <button
//             onClick={onClose}
//             className="absolute top-4 right-5 w-9 h-9 flex items-center justify-center
//   bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white
//   rounded-full transition duration-200"
//           >
//             ✕
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAlert } from "../../AlertContext";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  return /^[0-9]{9,15}$/.test(phone);
};

export default function AddDeliveryForm({ shopId, onClose, onAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    photo: null,
  });

  const { showAlert } = useAlert();
  const nameInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // ================= PASSCODE STATES (ADDED ONLY) =================
  const [passcodeModal, setPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, photo: file });
  };

  // ================= UPDATED HANDLE SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showAlert("Please fill required fields", "warning");
      return;
    }

    if (!isValidEmail(formData.email)) {
      showAlert("Email သည် မှန်ကန်သော format မဟုတ်ပါ", "warning");
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      showAlert("ဖုန်းနံပါတ် format မမှန်ကန်ပါ", "warning");
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(formData.password)) {
      showAlert("Password သည် အနည်းဆုံး 8 လုံးရှိရမည်၊ Uppercase, Lowercase, Number, Special Character ပါဝင်ရမည်", "warning");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert("စကားဝှက်နှစ်ခု မကိုက်ညီပါ", "warning");
      return;
    }

    // 👉 OPEN PASSCODE MODAL (NO API HERE)
    setPasscode("");
    setPasscodeModal(true);
  };

  // ================= PASSCODE VERIFY + CREATE =================
  const doSubmit = async () => {
    if (!passcode) {
      showAlert("Enter passcode", "error");
      return;
    }

    setSaving(true);

    try {
      // 1. VERIFY PASSCODE
      const verifyRes = await axios.post(
        "https://api.pwezayshops.com/admin/verify-delimanager-passcode",
        { passcode },
      );

      if (!verifyRes.data.success) {
        showAlert("Wrong passcode", "error");
        setSaving(false);
        return;
      }

      // 2. CREATE DELIVERY MAN (YOUR ORIGINAL API)
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone || "");
      payload.append("password", formData.password);
      payload.append("work_type", "");
      payload.append("location", formData.location || "");

      if (formData.photo instanceof File) {
        payload.append("photo", formData.photo);
      }

      const res = await axios.post(
        "https://api.pwezayshops.com/deliverymen",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const data = res.data;

      if (res.status === 200 || data.success) {
        showAlert(data.message || "Delivery created", "success");

        onAdded?.();
        onClose?.();

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          location: "",
          photo: null,
        });
      } else {
        showAlert(data.message || "Failed", "error");
      }

      setPasscodeModal(false);
      setPasscode("");
    } catch (err) {
      showAlert(err.response?.data?.message || "Error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePassKey = (e) => {
    if (e.key === "Enter") doSubmit();
  };
  useEffect(() => {
  if (passcodeModal && passcodeInputRef.current) {
    passcodeInputRef.current.focus();
  }
}, [passcodeModal]);

  // ================= UI (UNCHANGED) =================
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.6)]">
        <div className="relative w-[450px] p-6 rounded-2xl shadow-lg bg-gray-800 text-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-[#9b5de5]">
            Add Delivery Man
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* PHOTO */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-28 h-28">
                <img
                  src={
                    formData.photo
                      ? URL.createObjectURL(formData.photo)
                      : "https://i.pinimg.com/736x/4a/6b/e0/4a6be0cad2a1bb290e43477834fdf8ad.jpg"
                  }
                  className="w-full h-full rounded-full object-cover border-2 border-dashed border-gray-600 shadow-sm"
                />
                <label className="absolute bottom-0 right-0 bg-[#9b5de5] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              ref={nameInputRef}
              placeholder="Name"
              className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 rounded-lg text-sm border pr-10 bg-gray-700 border-gray-600 text-gray-100"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 rounded-lg text-sm border pr-10 bg-gray-700 border-gray-600 text-gray-100"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-3 py-2 rounded-lg text-sm border bg-gray-700 border-gray-600 text-gray-100"
            />

            {/* <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg text-white bg-[#9b5de5]"
            >
              Create Delivery

            </button> */}
                  {/* BUTTONS */}
             <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm border border-gray-600 text-gray-100 hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 rounded-lg text-sm text-white ${
                  saving ? "bg-gray-500 cursor-not-allowed" : "bg-[#9b5de5]"
                }`}
              >
                {saving ? "Creating New Delivery..." : "Creating New Delivery "}
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="absolute top-4 right-5 w-9 h-9 flex items-center justify-center bg-red-500/20 rounded-full"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ================= PASSCODE MODAL (ADDED) ================= */}
      {passcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative bg-[#1e2235] rounded-xl p-6 w-[90%] max-w-[330px] shadow-2xl border border-[#2c2f44]">
              <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
                Enter Passcode
              </h3>

            <input
             ref={passcodeInputRef}
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={handlePassKey}
                 className="border border-neutral-700 rounded-lg w-full px-3 py-2 mb-4 bg-neutral-900 text-white focus:ring-2 focus:ring-[#B476FF] placeholder-gray-400"
              placeholder="Passcode"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    doSubmit();
                  }
                }}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setPasscodeModal(false)}
               className="flex-1 px-4 py-2 border border-neutral-700 rounded-lg text-white hover:bg-[#2c2f44]"
              >
                Cancel
              </button>

              <button
                onClick={doSubmit}
                disabled={saving}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg hover:opacity-90"
              >
                {saving ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
 
      
    </>
  );
}

