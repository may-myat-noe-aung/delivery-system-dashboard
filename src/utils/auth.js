
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