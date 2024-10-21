// Part 1
import {createSlice} from '@reduxjs/toolkit';

// Part 2

const initialState = {
  dataUser: {
    tokenUser: '',
    userId: '',
    phone: '',
  },
  qrText: '',
  isAddAttribute: false,
};

// Part 3
export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.dataUser = action.payload;
    },
    addQrText: (state, action) => {
      state.qrText = action.payload;
    },
    addAttribute: (state, action) => {
      state.isAddAttribute = action.payload;
    },
  },
});

// Part 4
export const {addUserInfo, addQrText, addAttribute} = issueSlice.actions;
export default issueSlice.reducer;
