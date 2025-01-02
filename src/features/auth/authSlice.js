import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Action Async untuk Login
export const loginUser = createAsyncThunk(
  "auth/loginUser", // Type action
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.data.accessToken); // Simpan token
      return response.data; // Return data user & token
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Too many login attempts, please try again later.");
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
  },
  extraReducers: (builder) => {
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
export const { logout } = authSlice.actions;
export default authSlice.reducer;
