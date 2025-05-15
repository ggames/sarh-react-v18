import { createSlice } from '@reduxjs/toolkit';
import { AgentWithId } from '../../models/agent.d';

const initialState = {
    agent : <AgentWithId>{},
    agents: <AgentWithId[]>[]
}


const agentSlice = createSlice({
    name: 'agent',
    initialState: initialState,
    reducers: {
        setAgent (state, action) {
            state.agent = action.payload;
        },
        setAgents (state, action) {
            state.agents = action.payload;
        }
    }
});


export default agentSlice.reducer;
export const { setAgent, setAgents } = agentSlice.actions;