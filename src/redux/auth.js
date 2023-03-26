import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth.user);


const initialState = {
  isLoggedIn: false,
  user: null,
  subscription:"",
  clientsecret: "",
  code:"",
  email:""
};
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logoutUser : (state,payload) => {
      state.isLoggedIn = false;
      state.user = null
    },
    setUserData : (state,{payload})=>{
      state.user = payload
    },
    switchLoginStatus:(state,payload)=>{
     state.isLoggedIn = true;
    },
    setSubscription: (state,payload)=>{
      state.subscription = payload
    },
    setClientSecret: (state,{payload})=>{
      state.clientsecret = payload
    },
    setCode: (state,{payload})=>{
      state.code = payload
    },
    settEmail: (state,{payload})=>{
      state.email = payload
    }
  }
});

export const {logoutUser,setUserData,setCode,settEmail, switchLoginStatus,setClientSecret } = authSlice.actions;
export const authReducer = authSlice.reducer;
