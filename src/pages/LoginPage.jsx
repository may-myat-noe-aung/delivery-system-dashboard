
// import React, { useState } from "react";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post(
//         "http://38.60.244.137:3000/login-admin",
//         {
//           email: email,
//           password: password,
//         }
//       );

//       console.log("Login success:", res.data);

//       // save token if API returns it
//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//       }

//       alert("Login Successful");

//       // redirect example
//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       setError("Invalid email or password");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-lg w-[350px]"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Admin Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-3">{error}</p>
//         )}

//         <div className="mb-4">
//           <label className="block mb-1 text-sm font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label className="block mb-1 text-sm font-medium">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../AlertContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert(); // alert context

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // --- helper to set cookie ---
  const setCookie = (name, value, days = 1) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Strict`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://38.60.244.137:3000/login-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ store token or id in cookie (depends on API response)
        if (data.token) setCookie("adminToken", data.token, 1);

        // ✅ show success alert
        showAlert(data.message || "Login successful", "success");

        // ✅ redirect to dashboard after short delay
        setTimeout(() => {
          navigate("/"); // dashboard route
        }, 500);
      } else {
        showAlert(data.message || "Login failed. Check email/password.", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
      <div className="bg-[#1a2030]/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96">
        <h2 className="text-2xl font-semibold mb-6 text-purple-400 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-2xl bg-neutral-900 border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="rounded-2xl bg-neutral-900 border border-neutral-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 px-4 py-2 rounded-2xl text-white font-semibold ${
              loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-400"
            } transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}