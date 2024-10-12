// Part 1
import {createSlice} from '@reduxjs/toolkit';

// Part 2

const initialState = {
  userInfo: {
    tokenUser: '',
    userId: '',
    phone: '',
  },
};

// Part 3
export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Part 4
export const {
  addUserInfo,
} = issueSlice.actions;
export default issueSlice.reducer;
