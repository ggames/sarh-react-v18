import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransformationWithId } from "../../models/transformation";



interface TransformationState {
    transformations: TransformationWithId[];
    transformation: TransformationWithId | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransformationState = {
    transformations: [],
    transformation: null,
    loading: false,
    error: null}


const transformationSlice = createSlice({
    name: 'transformation',
    initialState,
    reducers: {
        fetchStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(state, action ) {
            state.transformations = action.payload;
            state.loading = false;
        },

        setTransformation(state, action: PayloadAction<TransformationWithId | null>) {
            state.transformation = action.payload;
        },
        setTransformations(state, action: PayloadAction<TransformationWithId[]>) {
            state.transformations = action.payload; 
        }
    }
})

export default transformationSlice.reducer;
export const { fetchStart, fetchSuccess, setTransformation, setTransformations } = transformationSlice.actions;