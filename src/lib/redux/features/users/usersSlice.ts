
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetMe } from '@/types/GetMe';
import { Convert } from '@/types/GetMe';

const initialUserState: GetMe = {
    id: 0,
    nama_lengkap: "",
    role: "",
    asal_sekolah: ""
};


export const user = createAsyncThunk<GetMe, GetMe>(
  'getMe',
  async (user: GetMe) => {
    return user;
  }
);
  
  // Slice untuk user
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(user.fulfilled, (state, data) => {
        state.id = data.payload.id
        state.nama_lengkap = data.payload.nama_lengkap
        state.role = data.payload.role
        state.asal_sekolah = data.payload.asal_sekolah
      })
  },
});

export const userReducer = userSlice.reducer;