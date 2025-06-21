import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,     // for logged-in user
    users: [],             // for admin: list of users
    isFetching: false,
    error: false,
  },
  reducers: {
    // Login Reducers
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },

    // Admin: Create User
    createUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    createUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  createUserStart,
  createUserSuccess,
  createUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
