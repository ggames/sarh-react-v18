import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserPhoto } from "../../services/userService";
import { setUserData, setUserPhoto } from "./userSlice";
import { User, UserResponse, UserWithId } from "../../models/user";
import axiosWithAuth from "../../api/api.axios";
import { AxiosError } from "axios";




export const loadUserSession = createAsyncThunk(
  "user/loadSession",
  async (
    { username, }: { username: string; },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Setea datos básicos del usuario
      dispatch(setUserData({ username }));

      // Obtiene la foto desde el backend
      const photoUrl = await fetchUserPhoto(username);

      localStorage.setItem('photoUrl', photoUrl);

      dispatch(setUserPhoto(photoUrl));     // Retorna la foto (se pasa al fulfilled)
      return photoUrl;
    } catch (error) {
      return rejectWithValue("No se pudo cargar la foto del usuario" + String(error));
    }
  }
);

export const fetchAllUsers = createAsyncThunk<UserResponse[], void, { rejectValue: string }>
("user/fetchAllUsers", async ( _ , { rejectWithValue }) => {
   try {
      const { data } = await axiosWithAuth.get("user/all");
      console.log("USUARIOS " + JSON.stringify(data));
      return data;
   } catch (error) {
       if(error instanceof AxiosError){
         const message = error.response?.data.message;
         return rejectWithValue(message);
       }
   }
})
