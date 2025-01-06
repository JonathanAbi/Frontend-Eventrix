import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CustomButton from "../Button";
import DesktopMenu from "./DesktopMenu";
import UserDropdown from "./UserDropDown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false); // Untuk toggle mobile menu

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-white"
        >
          Eventrix
        </Link>

        <DesktopMenu />

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <UserDropdown user={user} handleLogout={handleLogout} />
          ) : (
            <CustomButton
              label="Login"
              size="sm"
              className="h-10"
              onClick={() => navigate("/auth/login")}
            />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu handleLogout={handleLogout} />}
    </nav>
  );
}
