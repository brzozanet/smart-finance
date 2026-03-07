import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

const register = createAsyncThunk("user/register", async (data, thunkAPI) => {
  const { email, password } = data;
  try {
    const res = await axios.post("auth/register", { email, password });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.data ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { email, password } = data;
  try {
    const res = await axios.post("auth/login", { email, password });
    setAuthHeader(res.data.data.accessToken);
    return res.data.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.data ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const updateBalance = createAsyncThunk(
  "user/updateBalance",
  async (balanceValue, thunkAPI) => {
    const newBalance = balanceValue;
    try {
      const res = await axios.patch("auth/balance", { newBalance });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const logout = createAsyncThunk("user/logout", async (data, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    await axios.post("auth/logout", { email: state.user.userData.email });
    clearAuthHeader();
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, login, logout, updateBalance };
