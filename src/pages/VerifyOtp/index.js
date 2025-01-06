import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/Button";
import { toast, Bounce } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../features/auth/authSlice";

export default function OtpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, otpVerified } = useSelector((state) => state.auth);

  // Ambil email dari state
  const location = useLocation();
  const email = location.state?.email; // Ambil email dari state yang dikirim

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60); // Timer 60 detik
  const inputRefs = useRef([]); // Referensi untuk setiap input

  // Pastikan email tersedia
  useEffect(() => {
    if (!email) {
      navigate("/auth/register"); // Redirect jika tidak ada email
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (value, index) => {
    if (!isNaN(value) && value.length <= 1) {
      // Hanya menerima angka (0-9) dan maksimal 1 karakter
      const newOtp = [...otp]; // Salin state OTP saat ini
      newOtp[index] = value; // Ganti nilai OTP di indeks yang sedang diedit
      setOtp(newOtp); // Update state dengan nilai baru

      // Pindah ke input berikutnya jika pengguna mengetik angka
      if (value && index < 5) {
        inputRefs.current[index + 1].focus(); // Fokus otomatis ke input berikutnya
      }
    }
  };

  // Fungsi untuk menangani key event
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    dispatch(verifyOtp({ email, otpCode }));
  };

  const handleResendOtp = () => {
    dispatch(resendOtp(email)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("OTP has been resent successfully!");
        setTimer(60); // Reset timer
      } else {
        toast.error(result.payload || "Failed to resend OTP.");
      }
    });
  };

  useEffect(() => {
    if (otpVerified) {
      toast.success("Account has been verify!", {
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
      navigate("/auth/login");
    }
  }, [otpVerified, navigate]);

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
  }, [error]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full sm:w-[450px] p-10 bg-white border rounded-lg shadow dark:bg-gray-800">
        {" "}
        {/*lebar 450px di breakpoint sm keatas dan akan full saat dibawah sm*/}
        <h1 className="text-2xl font-bold text-center mb-5 dark:text-white">
          Verify Your OTP
        </h1>
        <p className="text-sm text-center mb-5 text-gray-500 dark:text-gray-400">
          Please enter the 6-digit code sent to your email.
        </p>
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-5">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)} // Simpan referensi input
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          ))}
        </div>
        <CustomButton
          label={loading ? "Verifying..." : "Verify your OTP"}
          size="sm"
          className="w-full h-10 rounded-lg"
          onClick={handleSubmit}
        />
        <p className="text-center mt-4 dark:text-white">
          Didn't receive the code?{" "}
          {timer > 0 ? (
              <span className="text-blue-500">{`Resend in ${timer}s`}</span>
            ) : (
              <button
                className="text-blue-500 hover:underline"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
        </p>
      </div>
    </div>
  );
}
