import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsLoginState {
  isLogin: boolean;
}

const initialState: IsLoginState = {
  isLogin: false,
};

// Define a thunk to simulate an async action
export const setIsLogin = createAsyncThunk<boolean, boolean>(
  'isLogin/setIsLogin',
  async (value: boolean) => {
    return value; // Simply return the value in this example
  }
);

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setIsLogin.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isLogin = action.payload;
      });
  },
});

export const isLoginReducer = isLoginSlice.reducer;
