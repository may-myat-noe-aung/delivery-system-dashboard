// import React, { useState, useRef, useEffect } from "react";
// import { Camera, Eye, EyeOff } from "lucide-react";
// import axios from "axios";

// export default function AddDeliveryForm({ onClose, onAdded }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     work_type: "Full time",
//     photo: null,
//   });

//   const [showPasscode, setShowPasscode] = useState(false);
//   const [passcode, setPasscode] = useState("");

//   const nameInputRef = useRef(null);
//   const passcodeInputRef = useRef(null); // Added for auto-focus
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       axios
//         .get("http://38.60.244.108:3000/deliverymen")
//         .then((res) => {
//           console.log("Auto fetch success:", res.data);
//         })
//         .catch((err) => {
//           console.log("Auto fetch error:", err);
//         });
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   // focus on name input
//   useEffect(() => {
//     if (nameInputRef.current) nameInputRef.current.focus();
//   }, []);

//   // auto-focus passcode input when modal opens
//   useEffect(() => {
//     if (showPasscode && passcodeInputRef.current) {
//       passcodeInputRef.current.focus();
//     }
//   }, [showPasscode]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//     }
//   };

//   const openPasscodeBox = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setShowPasscode(true);
//   };

//   const verifyPasscode = async () => {
//     if (passcode !== "123456") {
//       alert("Invalid Passcode!");
//       return;
//     }

//     setShowPasscode(false);

//     try {
//       const payload = new FormData();
//       payload.append("name", formData.name);
//       payload.append("email", formData.email);
//       payload.append("phone", formData.phone);
//       payload.append("password", formData.password);
//       payload.append("work_type", formData.work_type);

//       if (formData.photo instanceof File) {
//         payload.append("photo", formData.photo);
//       }

//       const response = await axios.post(
//         "http://38.60.244.108:3000/deliverymen",
//         payload,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert(response.data.message);

//       onAdded?.();
//       onClose?.();

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         work_type: "Full time",
//         photo: null,
//       });
//       setPasscode("");
//     } catch (error) {
//       const msg =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong.";
//       alert(msg);
//     }
//   };

//   return (
//     <>
//       {/* Main Modal */}
//       <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//         <div className="bg-white rounded-2xl shadow-lg w-[450px] p-6 relative">
//           <h2 className="text-lg font-semibold mb-4 text-[#B476FF]">
//             Add Delivery Man
//           </h2>

//           <form onSubmit={openPasscodeBox} className="space-y-3">
//             {/* Photo */}
//             <div className="flex flex-col items-center mb-4">
//               <div className="relative w-28 h-28">
//                 <img
//                   src={
//                     formData.photo
//                       ? URL.createObjectURL(formData.photo)
//                       : "https://i.pinimg.com/736x/4a/6b/e0/4a6be0cad2a1bb290e43477834fdf8ad.jpg"
//                   }
//                   alt="Profile Preview"
//                   className="w-full h-full rounded-full object-cover border-2 border-dashed border-[#B476FF] shadow-sm"
//                 />
//                 <label className="absolute bottom-0 right-0 bg-[#B476FF] hover:bg-[#9b5de5] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md">
//                   <Camera className="w-4 h-4" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                 </label>
//               </div>

//               <p className="mt-2 text-sm text-gray-500">
//                 Upload profile image (optional)
//               </p>
//             </div>

//             {/* Inputs */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="w-full border px-3 py-2 rounded-lg text-sm"
//               required
//               ref={nameInputRef}
//             />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full border px-3 py-2 rounded-lg text-sm"
//               required
//             />
//             {/* PASSWORD WITH EYE */}
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full border px-3 py-2 rounded-lg text-sm pr-10"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </span>
//             </div>

//             {/* CONFIRM PASSWORD WITH EYE */}
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="w-full border px-3 py-2 rounded-lg text-sm pr-10"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </span>
//             </div>

//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone"
//               className="w-full border px-3 py-2 rounded-lg text-sm"
//               required
//             />

//             <select
//               name="work_type"
//               value={formData.work_type}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg text-sm"
//             >
//               <option>Full time</option>
//               <option>Part time</option>
//             </select>

//             <div className="flex justify-end gap-2 pt-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 rounded-lg border text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded-lg bg-[#B476FF] text-white text-sm"
//               >
//                 Save
//               </button>
//             </div>
//           </form>

//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 text-gray-500 hover:text-black"
//           >
//             ✕
//           </button>
//         </div>
//       </div>

//       {/* --------------------------
//           PASSCODE MODAL (Updated Style)
//       -------------------------- */}
//       {showPasscode && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setShowPasscode(false)}
//           />
//           <div className="relative bg-white rounded-xl p-6 w-[330px] shadow-2xl border border-purple-200">
//             <h3 className="text-lg font-bold text-center bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent mb-4">
//               Enter Passcode
//             </h3>
//             <input
//               ref={passcodeInputRef}
//               type="password"
//               className="border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 focus:ring-[#B476FF]"
//               placeholder="Passcode"
//               value={passcode}
//               onChange={(e) => setPasscode(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && verifyPasscode()}
//             />
//             <div className="flex justify-between gap-2">
//               <button
//                 onClick={() => setShowPasscode(false)}
//                 className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={verifyPasscode}
//                 className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { Camera, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useTheme } from "../ThemeProvider";

export default function AddDeliveryForm({ onClose, onAdded }) {
  const { dark } = useTheme(); // get dark mode

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    work_type: "Full time",
    photo: null,
  });

  const [showPasscode, setShowPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");

  const nameInputRef = useRef(null);
  const passcodeInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get("http://38.60.244.108:3000/deliverymen")
        .then((res) => {
          console.log("Auto fetch success:", res.data);
        })
        .catch((err) => {
          console.log("Auto fetch error:", err);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (showPasscode && passcodeInputRef.current) {
      passcodeInputRef.current.focus();
    }
  }, [showPasscode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const openPasscodeBox = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setShowPasscode(true);
  };

  const verifyPasscode = async () => {
    if (passcode !== "123456") {
      alert("Invalid Passcode!");
      return;
    }

    setShowPasscode(false);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("password", formData.password);
      payload.append("work_type", formData.work_type);
      if (formData.photo instanceof File) {
        payload.append("photo", formData.photo);
      }

      const response = await axios.post(
        "http://38.60.244.108:3000/deliverymen",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(response.data.message);

      onAdded?.();
      onClose?.();

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        work_type: "Full time",
        photo: null,
      });
      setPasscode("");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      alert(msg);
    }
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)" }}>
        <div
          className={`relative w-[450px] p-6 rounded-2xl shadow-lg ${
            dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className={`text-lg font-semibold mb-4 ${dark ? "text-[#B476FF]" : "text-[#B476FF]"}`}>
            Add Delivery Man
          </h2>

          <form onSubmit={openPasscodeBox} className="space-y-3">
            {/* Photo */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-28 h-28">
                <img
                  src={
                    formData.photo
                      ? URL.createObjectURL(formData.photo)
                      : "https://i.pinimg.com/736x/4a/6b/e0/4a6be0cad2a1bb290e43477834fdf8ad.jpg"
                  }
                  alt="Profile Preview"
                  className={`w-full h-full rounded-full object-cover border-2 border-dashed shadow-sm ${
                    dark ? "border-gray-600" : "border-[#B476FF]"
                  }`}
                />
                <label className="absolute bottom-0 right-0 bg-[#B476FF] hover:bg-[#9b5de5] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className={`mt-2 text-sm ${dark ? "text-gray-300" : "text-gray-500"}`}>
                Upload profile image (optional)
              </p>
            </div>

            {/* Inputs */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full px-3 py-2 rounded-lg text-sm border ${
                dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
              required
              ref={nameInputRef}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-3 py-2 rounded-lg text-sm border ${
                dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />

            {/* PASSWORD WITH EYE */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-3 py-2 rounded-lg text-sm border pr-10 ${
                  dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                  dark ? "text-gray-300" : "text-gray-500"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* CONFIRM PASSWORD WITH EYE */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full px-3 py-2 rounded-lg text-sm border pr-10 ${
                  dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
                }`}
                required
              />
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                  dark ? "text-gray-300" : "text-gray-500"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              className={`w-full px-3 py-2 rounded-lg text-sm border ${
                dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />

            <select
              name="work_type"
              value={formData.work_type}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg text-sm border ${
                dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option>Full time</option>
              <option>Part time</option>
            </select>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded-lg text-sm border ${
                  dark ? "border-gray-600 text-gray-100 hover:bg-gray-700" : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#B476FF] text-white text-sm"
              >
                Save
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className={`absolute top-3 right-3 hover:text-black ${dark ? "text-gray-300" : "text-gray-500"}`}
          >
            ✕
          </button>
        </div>
      </div>

      {/* PASSCODE MODAL */}
      {showPasscode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)" }}
            onClick={() => setShowPasscode(false)}
          />
          <div
            className={`relative p-6 w-[330px] rounded-xl shadow-2xl border ${
              dark ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white border-purple-200 text-gray-900"
            }`}
          >
            <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-[#B476FF] to-purple-600 bg-clip-text text-transparent">
              Enter Passcode
            </h3>
            <input
              ref={passcodeInputRef}
              type="password"
              className={`border rounded-lg w-full px-3 py-2 mb-4 focus:ring-2 ${
                dark ? "focus:ring-[#B476FF] bg-gray-700 border-gray-600 text-gray-100" : "focus:ring-[#B476FF] bg-white border-purple-200 text-gray-900"
              }`}
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyPasscode()}
            />
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setShowPasscode(false)}
                className={`px-4 py-1.5 rounded-lg border text-sm ${
                  dark ? "border-gray-600 text-gray-100 hover:bg-gray-700" : "border-gray-300 text-gray-900 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={verifyPasscode}
                className="px-4 py-1.5 bg-gradient-to-r from-[#B476FF] to-purple-600 text-white rounded-lg shadow hover:opacity-90"
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
