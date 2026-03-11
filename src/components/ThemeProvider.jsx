// import { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const prefersDark = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;

//   const [dark, setDark] = useState(() => {
//     return localStorage.theme
//       ? localStorage.theme === "dark"
//       : prefersDark;
//   });

//   useEffect(() => {
//     const html = document.documentElement;

//     if (dark) {
//       html.classList.add("dark");
//       localStorage.theme = "dark";
//     } else {
//       html.classList.remove("dark");
//       localStorage.theme = "light";
//     }
//   }, [dark]);

//   const toggleTheme = () => setDark(prev => !prev);

//   return (
//     <ThemeContext.Provider value={{ dark, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.theme
      ? localStorage.theme === "dark"
      : prefersDark;
  });

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      html.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);