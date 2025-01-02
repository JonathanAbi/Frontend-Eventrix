import React from "react";
import { Button } from "flowbite-react";

const CustomButton = ({
  label,
  onClick,
  type = "button",
  color = "blue",
  size = "md",
  disabled = false,
  className = "", // Tambahkan prop className untuk kustomisasi tambahan
}) => {
  // Mapping warna untuk tema light dan dark
  const colorClass = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-800 dark:hover:bg-blue-900",
    red: "bg-red-600 hover:bg-red-700 text-white dark:bg-red-800 dark:hover:bg-red-900",
    green:
      "bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 dark:hover:bg-green-900",
    gray: "bg-gray-600 hover:bg-gray-700 text-white dark:bg-gray-800 dark:hover:bg-gray-900",
  };

  // Mapping ukuran
  const sizeClass = {
    xs: "px-3 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded ${colorClass[color]} ${sizeClass[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`} // Tambahkan className tambahan di sini
    >
      {label}
    </Button>
  );
};

export default CustomButton;
