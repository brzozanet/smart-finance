import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { loadNewBalance } from "../user/userSlice";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/";

const getExpenseStats = createAsyncThunk(
  "expenses/getExpensesStats",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get("transaction/expense");
      const normalizedExpenses = (res.data.expenses || []).map((item) => ({
        id: item._id,
        description: item.description,
        category: item.categories,
        amount: item.amount,
        createdAt: item.createdAt,
      }));

      return { ...res.data, expenses: normalizedExpenses };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const setNewExpense = createAsyncThunk(
  "expenses/setNewExpense",
  async (data, thunkAPI) => {
    const { description, amount, date, category } = data;

    try {
      const res = await axios.post("transaction/expense", {
        description,
        amount: Number(amount),
        date,
        categories: category,
      });
      thunkAPI.dispatch(loadNewBalance(res.data.newBalance));
      thunkAPI.dispatch(getExpenseStats());
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (transactionId, thunkAPI) => {
    try {
      const res = await axios.delete(`transaction/${transactionId}`);
      console.log(res.data.newBalance);
      thunkAPI.dispatch(loadNewBalance(res.data.newBalance));
      thunkAPI.dispatch(getExpenseStats());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export { getExpenseStats, setNewExpense, deleteExpense };
