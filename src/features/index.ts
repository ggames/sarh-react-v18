import { configureStore } from "@reduxjs/toolkit";

import agentReducer  from "./agent/agentSlice";
import userReducer  from "./user/userSlice";
import sidebarReducer from "./sidebar/sidebarSlice";


export const store = configureStore({
    reducer: {
        agents: agentReducer,
        users: userReducer,
        isSideBarOpen: sidebarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;