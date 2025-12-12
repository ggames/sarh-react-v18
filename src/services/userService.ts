import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../api/api.axios";
import { toast } from "react-toastify";


export const registerUser = createAsyncThunk("user/registerUser",
    async (formData: FormData, {rejectWithValue}) => {
        try {
            
            const response = await axiosWithAuth.post("user/create", formData, {
                headers: {'Content-Type': "multipart/form-data" }
            });
            toast.success("El usuario se registro con exito");
            return response.data;
        } catch (error) {
            

            return rejectWithValue(String(error));
            
        }
    }
)

export const fetchUserPhoto = async (username: string): Promise<string> => {
    const response = await axiosWithAuth.get(`/user/${username}/photo`, {
        responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
}