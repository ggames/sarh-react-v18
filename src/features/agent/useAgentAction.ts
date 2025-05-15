import { apiRequest } from "../../api/api.services";

import { useAppDispatch } from "../../hooks/store";
import { Agent, AgentWithId } from "../../models/agent";

import { setAgents, setAgent } from "./agentSlice";

export const useAgentAction = () => {
  const dispatch = useAppDispatch();

  const fetchAgent = async () => {
    try {
      const response = await apiRequest<AgentWithId[]>("/agent/all", "GET");

      console.log("response", response);

      dispatch(setAgents(response));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching agents:", error.message);
      }
    }
  };

  const fetchAgentById = async (id: number) => {
    try {
      const response = await apiRequest<AgentWithId>(`/agent/${id}`, "GET");
      dispatch(setAgent(response));
      console.log("response edit", response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  const addAgent = async ({
    firstname,
    lastname,
    documenttype,
    document,
    birthdate,
    leavingdate,
    isdeceased,
    file,
    address,
    phone,
    email,
  }: Agent) => {
    try {
      const response = await apiRequest("/agent/create", "POST", {
        firstname,
        lastname,
        documenttype,
        document,
        birthdate,
        leavingdate,
        isdeceased,
        file,
        address,
        phone,
        email,
      });

      dispatch(setAgent(response));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching agents:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const updateAgent = async (id: number, agent: Agent) => {
    try {
      const response = await apiRequest(`/agent/update/${id}`, "PUT", agent);
      dispatch(setAgent(response));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return {
    fetchAgentById,
    fetchAgent,
    addAgent,
    updateAgent,
  };
};

/* export const createAgent = ( {
  firstname,
  lastname,
  documenttype,
  document,
  birtdate,
  leavingdate,
  isdeceased,
  file,
  address,
  phone,
  email}) => {
  const controller = new AbortController();

  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiService.post("/agent/create", {
        firstname,
        lastname,
        documenttype,
        document,
        birtdate,
        leavingdate,
        isdeceased,
        file,
        address,
        phone,
        email}, {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });
      dispatch(setAgent(response.data));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating agent:", error.message);
      }
    }
  };
};
 */
