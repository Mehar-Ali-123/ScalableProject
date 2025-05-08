import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { dispatch }) => {
    dispatch(checkAuthRequest());
    try {
      const response = await axios.get(`${server}/check-auth`, {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        dispatch(checkAuthSuccess(true));
        console.log("User is authenticated");
      } else {
        dispatch(checkAuthSuccess(false));
        console.log("User is not authenticated");
      }
    } catch (error) {
      dispatch(checkAuthFail(error));
      console.error("Error checking authentication:", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthRequest: (state) => {
      state.isLoading = true;
    },
    checkAuthSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = action.payload;
    },
    checkAuthFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state) => {
      // Additional logic after API call is successful, if needed
    });
  },
});

export const { checkAuthRequest, checkAuthSuccess, checkAuthFail } =
  authSlice.actions;

export default authSlice.reducer;
