import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { FcGoogle } from "react-icons/fc";
import { toast, Bounce } from "react-toastify";
import ThemeToggle from "../../components/ThemeToggle";
import CustomButton from "../../components/Button";
import InputField from "../../components/InputField";
import PasswordToggle from '../../components/PasswordToggle'

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //   Cek apakah token ada di localStorage pada saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(loginUser(form)); // Dispatch action loginUser
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(`Hello ${user.name}`, {
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
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]); // Hanya jalan saat isAuthenticate berubah

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
    }
  }, [error]); // Hanya jalan saat error berubah

  return (
    <>
      <div className="container mx-auto flex items-center justify-center min-h-screen">
        <div className="w-full mx-2 sm:w-[450px] p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-2xl font-sans font-bold text-center mb-5 dark:text-white">
            Sign in to your account
          </h1>
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
            label={loading ? "Loading..." : "Sign In"}
            size="xs"
            className="w-full h-10 rounded-lg"
            disabled={loading}
            onClick={handleLogin}
          />
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-800">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            type="button"
            className="w-full flex justify-center bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
          >
            <FcGoogle className="w-6 h-6 me-2" />
            Google
          </button>
          <p className="text-center mt-4 dark:text-white">
            Don't have an account?{" "}
            <Link className="text-blue-500" to="/auth/register">
              Sign up
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
