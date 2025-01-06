import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetError } from "../../features/auth/authSlice";
import { toast, Bounce } from "react-toastify";
import InputField from "../../components/InputField";
import PasswordToggle from "../../components/PasswordToggle";
import CustomButton from "../../components/Button";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   Cek apakah token ada di localStorage pada saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error, otpSent } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    dispatch(registerUser(form)); // Dispatch action loginUser
  };

  useEffect(() => {
    if (otpSent) {
      toast.success("Register successfully, lets verify your account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/auth/verify-otp", { state: { email: form.email } });
    }
  }, [otpSent, navigate, form.email]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      dispatch(resetError());
    }
  }, [error, dispatch]);

  return (
    <>
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="w-full mx-2 sm:w-[450px] p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-2xl font-sans font-bold text-center mb-5 dark:text-white">
            Sign up
          </h1>
          <InputField
            label="Name"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email address"
            type="text"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <PasswordToggle
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <CustomButton
            label={loading ? "Loading..." : "Sign Up"}
            size="xs"
            className="w-full h-10 rounded-lg"
            disabled={loading}
            onClick={handleRegister}
          />
          <p className="text-center mt-4 dark:text-white">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/auth/login">
              Sign in
            </Link>
          </p>
        </div>
        {/* <div className="absolute">
          <ThemeToggle />
        </div> */}
      </div>
    </>
  );
}
