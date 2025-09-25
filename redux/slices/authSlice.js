const { createSlice } = require("@reduxjs/toolkit");


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated:false
  },
  reducers: {
    setUserDetails: (state, action) => {
      const {isAuthenticated,user:userData} = action.payload;
      state.user = userData || null;
      state.isAuthenticated = isAuthenticated ?? true;
    },
    clearUserDetails: (state) => {
      state.user = null;
    },
    clearAuth:(state)=>{
      state.user = null,
      state.isAuthenticated = false
    }
  },
});


export const {setUserDetails,clearUserDetails,clearAuth} = authSlice.actions;

export default authSlice.reducer;