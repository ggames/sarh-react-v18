import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginSuccess } from "./authSlice";
//import { logout } from "./authSlice";
//import { loginSuccess, logout, updateAccessToken } from "./authSlice";

//const LOGIN_URL = "http://localhost:8080/auth";

/* interface LoginResponse {
  username?: string;
  accessToken: string;
  tempToken?: string;
  roles?: string[];
  refreshToken?: string;
  // otros campos del backend si los hubiese
} */


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { username: string; password: string }, { dispatch }) => {
    const response = await axios.post("http://localhost:8080/auth/log-in", credentials);

    console.log("USUARIO LOGIN " + response.data.username);

    const { accessToken, refreshToken, username, roles } = response.data;

    // ✅ Guardar en Redux + localStorage
    dispatch(loginSuccess({ accessToken, refreshToken, user: username, roles }));
    

    return response.data;
  }
);


/* 
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { username: string; password: string }, { dispatch},
  
  ) => {
    try {
      const resp = await axios.post<LoginResponse>(
        LOGIN_URL + "/log-in",
        credentials
      );

      const {
        username,
        accessToken: token,
        tempToken,
        roles,
        refreshToken,
      } = resp.data;
      console.log("ACCESS TOKEN LOGIN ", resp.data);
      console.log("REFRESH TOKEN LOGIN ", refreshToken);

       dispatch(loginSuccess({accessToken, refreshToken, username, roles}))

      // intentamos varias formas de obtener el token
     

      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user", username || "");
        if (roles) {
          localStorage.setItem("roles", JSON.stringify(roles));
        }
      }
      console.log("Login response:", username);

     

      return {
        user: username,
        accessToken: token,
        tempToken: token || null,
        roles: roles || [],
        refreshToken: refreshToken || null,
      };
    } catch (error) {
      return rejectWithValue("Login failed" + error);
    }
  }
); */

/* export const refreshAccessToken = createAsyncThunk<
  string | undefined,
  void,
  { state: { auth: { refreshToken?: string | null } } }
>(
  "auth/refreshAccessToken",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { refreshToken } = getState().auth;
    if (!refreshToken) {
      dispatch(logout());
      return rejectWithValue("No refresh token available");
    }
    try {
      const resp = await axios.post<{ accessToken: string }>(
        LOGIN_URL + "/refresh",
        { refreshToken }
      );
      const { accessToken } = resp.data;
      return accessToken;
    } catch (error) {
      dispatch(logout());
      return rejectWithValue("Failed to refresh token" + error);
    }
  }
); */

/* export const loginUser = createAsyncThunk("auth/loginUser", async (credentials: { username: string; password: string },{dispatch}) => {
    const resp = await authService.login(credentials);
    console.log("Login response:", resp);
   // dispatch(loginSuccess(resp));
} );

export const refreshAccessToken = createAsyncThunk<string | undefined, void, { state: { auth: { refreshToken?: string | null } } }>(
    "auth/refreshAccessToken",
    async (_, { dispatch, getState }) => {
        const { refreshToken } = getState().auth;
        if(!refreshToken) {
           // dispatch(logout());
            return;
        }

        try{
            const resp = await authService.refreshToken(refreshToken);
           // dispatch(updateAccessToken(resp.accessToken));
            return resp.accessToken;
        }catch(error){
           // dispatch(logout());
            throw error;
        }

    }); */
