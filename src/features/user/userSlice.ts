import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../../models/user";

import { registerUser } from "../../services/userService";
import { fetchAllUsers } from "./userThunk";

export interface UserState {
  id: number | null;
  users: UserResponse[];
  photoUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
    id: null,
    users: [],
    photoUrl: localStorage.getItem('photoUrl') || null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.id = action.payload;
        },
        setUserPhoto: (state, action) => {
            state.photoUrl = action.payload;
        },
      
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || 'Error al crear usuario';
        });
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || 'Error al listar usuarios';
        })
    }
})

export const { setUserData, setUserPhoto } = userSlice.actions;

export const userReducer = userSlice.reducer;