import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/registerUser", // Nama action
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otpCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/verify", {
        email,
        otpCode,
      });
      return response.data; // Mengembalikan status sukses
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "OTP verification failed"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/resend-otp", {
        email,
      });
      return response.data; // Mengembalikan status sukses
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Resend otp failed"
      );
    }
  }
);

// Action Async untuk Login
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Type action
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.data.accessToken); // Simpan token
      return response.data; // Return data user & token
    } catch (error) {
      return rejectWithValue(
        error.response.data.message ||
          "Too many login attempts, please try again later."
      );
    }
  }
);

// State Awal
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
};

// Slice Redux
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token"); // Hapus token dari localStorage
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null; // Reset error state untuk menghindari error muncul terus menerus
    },
  },
  extraReducers: (builder) => {
    // Register Reducers
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Verify OTP Reducers
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Resend OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Login Reducers
    builder
      // Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })
      // Rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions dan reducer
export const { logout, resetError } = authSlice.actions;
export default authSlice.reducer;
