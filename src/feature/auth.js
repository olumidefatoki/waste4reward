import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  islogin: false,
  isVerify: false,
  addOfflineModels: false,
};

// export const awsAuth = createAsyncThunk("/auth", async () => {
//   try {
//     const res = await Auth.currentAuthenticatedUser();
//     if (!!res.attributes && Object.keys(res.attributes).length > 0) {
//       return res.attributes;
//     }
//     return {};
//   } catch (error) {
//     return {};
//   }
// });

// export const awsLogout = createAsyncThunk("/authLogout", async () => {
//   try {
//     const res = await Auth.signOut();

//     posthog.unregister("modelId");
//     posthog.unregister("modelName");
//     posthog.reset();

//     if (!!res.attributes && Object.keys(res.attributes).length > 0) {
//       return res.attributes;
//     }
//     return {};
//   } catch (error) {
//     return {};
//   }
// });
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.islogin = true;
    },
    setLogin: (state, action) => {
      state.isVerify = action.payload;
    },
    // shouldAddOfflineModels: (state, action) => {
    //   state.addOfflineModels = action.payload ?? !state.addOfflineModels;
    // },
    logout: (state) => {
      state.user = {};
      state.islogin = false;
      state.isVerify = false;
      state.addOfflineModels = false;
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(awsAuth.fulfilled, (state, action) => {
  //         const user = action.payload;
  //         state.islogin = Object.keys(user).length > 0;
  //         state.user = user;
  //       })
  //       .addCase(awsAuth.rejected, (state) => {
  //         state.islogin = false;
  //         state.user = {};
  //       })
  //       .addCase(awsLogout.fulfilled, (state) => {
  //         state.islogin = false;
  //         state.user = {};
  //       })
  //       .addCase(awsLogout.rejected, (state) => {
  //         state.islogin = false;
  //         state.user = {};
  //       });
  //   },
});
// Action creators are generated for each case reducer function
export const { setUser, logout, setVerify, setLogin, shouldAddOfflineModels } =
  authSlice.actions;

export default authSlice.reducer;
