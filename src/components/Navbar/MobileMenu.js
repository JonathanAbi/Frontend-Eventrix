import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../Button";

export default function MobileMenu({ handleLogout }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="md:hidden bg-white dark:bg-gray-800 ">
      <Link
        to="/"
        className="block px-4 py-2 text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-400"
      >
        Explore
      </Link>
      <Link
        to="/create-event"
        className="block px-4 py-2 text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-400"
      >
        Create Event
      </Link>
      <Link
        to="/my-events"
        className="block px-4 py-2 text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-400"
      >
        My Events
      </Link>
      <Link
        to="/contact-us"
        className="block px-4 py-2 text-gray-600 hover:text-blue-500 dark:text-white dark:hover:text-blue-400"
      >
        Contact Us
      </Link>
      {isAuthenticated ? (
        <CustomButton
          label="Logout"
          size="sm"
          color="red"
          className="w-11/12 mx-auto mb-4"
          onClick={handleLogout}
        />
      ) : (
        <CustomButton
          label="Login"
          size="sm"
          className="w-11/12 mx-auto mb-4"
          onClick={() => navigate("/auth/login")}
        />
      )}
    </div>
  );
}
