import { createAsyncThunk } from "@reduxjs/toolkit";

 
import axiosWithAuth from "../../api/api.axios";
import { OrganizationalSubUnitWithId, 
         OrganizationalSubUnitDto, 
         OrganizationalSubUnit } from "../../models/organizationalSubUnit";


export const fetchSuborganizationalUnits = createAsyncThunk<
  OrganizationalSubUnitDto[],
  void,
  { rejectValue: string }
>("suborganizationalUnit/all", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.get<OrganizationalSubUnitDto[]>(
      "suborganizational/dto/all"
    ); //fetch('http://localhost:8080/organizationalSubunit/all');

    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const fetchSuborganizationalById = createAsyncThunk<
  OrganizationalSubUnitWithId,
  { suborganizational_id: number },
  { rejectValue: string }
>(
  "suborganizationalUnit/fetchById",
  async ({ suborganizational_id }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<OrganizationalSubUnitWithId>(
        `suborganizational/${suborganizational_id}`
      );
      console.log("DATA SUBORGANIZACIONAL POR ID ", data);
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const addSuborganizational = createAsyncThunk<
  OrganizationalSubUnitWithId,
  OrganizationalSubUnit,
  { rejectValue: string }
>("suborganizationalUnit/add", async (suborganizational, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.post<OrganizationalSubUnitWithId>(
      "suborganizational/create", suborganizational
    );
    return data;
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export const updateSuborganizational = createAsyncThunk<
  OrganizationalSubUnitWithId,
  {
    suborganizational_id: number;
    suborganizational: Partial<OrganizationalSubUnitWithId>;
  },
  { rejectValue: string }
>(
  "suborganizationalUnit/update",
  async ({ suborganizational_id, suborganizational }, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.put<OrganizationalSubUnitWithId>(
        `suborganizational/update/${suborganizational_id}`,
        suborganizational
      );
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);
