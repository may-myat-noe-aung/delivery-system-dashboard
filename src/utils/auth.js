// // ==============================
// // AUTH STORAGE
// // ==============================

// export const saveAuth = ({ id, role, token }) => {
//   const user = {
//     id,
//     role,
//     token,
//   };

//   localStorage.setItem("user", JSON.stringify(user));
//   localStorage.setItem("userId", id);
//   localStorage.setItem("role", role);
//   localStorage.setItem("token", token);
// };

// // ==============================
// // GET USER
// // ==============================

// export const getUser = () => {
//   const user = localStorage.getItem("user");

//   if (!user) return null;

//   try {
//     return JSON.parse(user);
//   } catch {
//     return null;
//   }
// };

// // ==============================
// // GET TOKEN
// // ==============================

// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// // ==============================
// // GET ROLE
// // ==============================

// export const getRole = () => {
//   return localStorage.getItem("role");
// };

// // ==============================
// // GET USER ID
// // ==============================

// export const getUserId = () => {
//   return localStorage.getItem("userId");
// };

// // ==============================
// // CHECK LOGIN
// // ==============================

// export const isLoggedIn = () => {
//   return !!getToken();
// };

// // ==============================
// // AUTH HEADER
// // ==============================

// export const getAuthHeader = () => {
//   const token = getToken();

//   if (!token) return {};

//   return {
//     Authorization: `MSHteam ${token}`,
//   };
// };

// // ==============================
// // LOGOUT
// // ==============================

// export const logout = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("role");
//   localStorage.removeItem("token");
// };
export const getAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    token: user?.token || null,
    role: user?.role || null,
    id: user?.id || null,
  };
};


export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};