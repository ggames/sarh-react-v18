// features/agent/agentThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../api/api.axios";
import { Agent } from "../../models/agent";
import { AgentWithId } from "../../models/agent.d";

export const fetchAgents = createAsyncThunk(
  "agent/all",
  async (pageParam: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<AgentWithId[]>("agent/all", { params: pageParam});
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAgentById = createAsyncThunk<AgentWithId, {agentId: number}, { rejectValue: string}>(
  "agent/fetchById",
  async ({agentId}, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<AgentWithId>(`/agent/${agentId}`);
      console.log("DATA AGENTE POR ID ", data);
      return data;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);

export const fetchAgentByDocument = createAsyncThunk(
  "agent/document",
  async (document: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosWithAuth.get<AgentWithId>(
        `/agent/document/${document}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAgent = createAsyncThunk<
  AgentWithId,
  Agent,
  { rejectValue: string }
>("agent/add", async (agent, { rejectWithValue }) => {
  try {
    const { data } = await axiosWithAuth.post<AgentWithId>(
      "/agent/create",
      agent
    );
    return data as AgentWithId;
  } catch (error) {
    return rejectWithValue("Error al crear el agente " + error);
  }
});

export const updateAgent = createAsyncThunk<
  AgentWithId,
  { agentId: number; agent: AgentWithId },
  { rejectValue: string }
>(
  "agent/update",
  async (
    { agentId, agent },
    { rejectWithValue }
  ) => {
    try {
     
      const { data } = await axiosWithAuth.put<AgentWithId>(
        `/agent/update/${agentId}`,
        agent
      );
       console.log("AGENTE PARA ACTUALIZAR ", agent); 

      return data as AgentWithId;
    } catch (error) {
      return rejectWithValue(String(error));
    }
  }
);
