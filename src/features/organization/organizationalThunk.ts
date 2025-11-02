import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";
import {
  OrganizationalUnit,
  OrganizationalUnitDto,
  OrganizationalUnitWithId,
} from "../../models/organizationalUnit.d";

export const fetchOrganizationalUnit = createAsyncThunk<
  OrganizationalUnitWithId[],
  void,
  { rejectValue: string }
>("organizational/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalUnitWithId[]>(
      "organizational/all"
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchOrganizationalById = createAsyncThunk<
  OrganizationalUnitWithId,
  { organizational_id: number },
  { rejectValue: string }
>(
  "organizational/fetchById",
  async ({ organizational_id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<OrganizationalUnitWithId>(
        `organizational/${organizational_id}`
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const fetchOrganizationalUnitDto = createAsyncThunk<
  OrganizationalUnitDto[],
  void,
  { rejectValue: string }
>("organizational/fetchAllDto", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalUnitDto[]>(
      "organizational/dto/all"
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});
/* export const fetchOrganizationalUnitDto = createAsyncThunk<OrganizationalUnitDto[], { rejectValue: string}>(
  "organizational/fetchAllDto", async (_, { rejectWithValue }) => {
    try {
      const {data} = await axiosWithAuth.get<OrganizationalUnitDto[]>("organizational/allDto");
      return data;
    } catch (error) {
       return rejectWithValue(error);
    }
  }
); */

export const addOrganizationalUnit = createAsyncThunk<
  OrganizationalUnitWithId,
  OrganizationalUnit,
  { rejectValue: string }
>("organizational/add", async (organizational, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.post<OrganizationalUnitWithId>(
      "organizational/create",
      organizational
    );
    return data as OrganizationalUnitWithId;
  } catch (error) {
    return rejectWithValue("Error al crear el departamento " + error);
  }
});

export const updateOrganizationaUnit = createAsyncThunk<
  OrganizationalUnitWithId,
  { organizationalId: number; organizational: OrganizationalUnit },
  { rejectValue: string }
>(
  "organizational/update",
  async ({ organizationalId, organizational }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.put(
        `organizational/updata/${organizationalId}`,
        organizational
      );
      return data as OrganizationalUnitWithId;
    } catch (error) {
      return rejectWithValue("No se ha podido actualizar el Dpto " + error);
    }
  }
);
