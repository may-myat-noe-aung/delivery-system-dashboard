import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        flex items-center justify-center
        py-5 px-8 w-full relative
        bg-white dark:bg-gray-900
        text-gray-600 dark:text-gray-300
        shadow-md border-t
        border-gray-200 dark:border-gray-800
      "
    >
      <div className="text-sm font-medium">
        @magwaysoftwarehouse
      </div>

      <div className="absolute right-12 text-sm">
        © 2025
      </div>
    </footer>
  );
};

export default Footer;
