/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    fontFamily: {
      sans: ["Montserrat", "Padauk", "sans-serif"],
    },

    extend: {
      colors: {
        primary: "#B476FF",
        secondary: "#6C5CE7",

        theme: {
          background: "#F8F9FA",
          card: "#FFFFFF",
          text: "#1F2937",
          border: "#E5E7EB",
        },

      },

      backgroundImage: {
        'custom-gradient':
          'linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)',
      },
    },
  },

  plugins: [
    require("flowbite/plugin")
  ],
};