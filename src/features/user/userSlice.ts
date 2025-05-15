import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserWithId } from "../../models/user";
//import { AUTH_ACTION_TYPES } from "../../constants/AuthConstants";

//import { authReducer } from "../../context/authReducer";
export const userinitialState = JSON.parse(localStorage.getItem("user_access_token") || "{}");

const DEFAULT_STATE = 
  {
    id: "",
    username: "",
    password: "",
    accessToken: "",
    status: false,
    roles: []    
  }
  


//const UPDATE_STATE_BY_ACTION = {

//}

const initialState: UserWithId = (() => {
  if (userinitialState) {
    return {
      
    id: userinitialState.id,
      username: userinitialState.username,
      password: userinitialState.password,
      accessToken: userinitialState.accessToken,
      status: userinitialState.status,
      roles: userinitialState.roles
    };
  }
  return DEFAULT_STATE;
})();

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>
    ) => {
      const username = action.payload;
      const newState = { ...state, username: username };
      return newState;
    },
    setPassword: (state,action: PayloadAction<string>
    ) => {
      const newState = { ...state, password: action.payload };
      return newState;
    },
    setRoles: (state, action: PayloadAction<string[]>) => {
      const { payload } = action;
      const newState = { ...state, roles: payload };
      return newState;
    },
    setAccessToken: (state,action: PayloadAction<string>
    ) => {
      const { payload } = action;
      const newState = { ...state, accessToken: payload };
      return newState;
    },
     setLogin : (state,action: PayloadAction<boolean>) => {
      const { payload } = action;
      const newState = { ...state, status: payload };
      return newState;
    },
     setLogout: (state,action: PayloadAction<boolean>) => {
      const { payload } = action;
      const newState = { ...state, status: payload };
      return newState;
    },
  },
});

export default userSlice.reducer;
export const { setUsername, setPassword, setRoles, setAccessToken, setLogin, setLogout } = userSlice.actions;