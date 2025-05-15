import { createSlice } from '@reduxjs/toolkit';

export interface SidebarState {
    value: boolean;
}

const initialState: SidebarState = {
    value: false 
}

export const SidebarSlice = createSlice({
   name: 'sideBar',
   initialState,
   reducers: {
      openSidebar: (state) => {
        state.value = !state.value
       }
   }
});
// Action creators are generated for each case reducer function
export const { openSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;