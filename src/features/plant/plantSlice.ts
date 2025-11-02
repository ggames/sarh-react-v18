import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlantOfPositionDto, PlantPositionWithId } from "../../models/plant-position";

//import { addPlantPosition, fetchPlantPositions,
//         fetchPlantsOfPositionById, updatePlantPosition } from "./plantPositionThunk";

export interface PlantPositionState {
    plantDTOs: PlantOfPositionDto[];
    plants: PlantPositionWithId[];
    plant: PlantPositionWithId | null;
    loading: boolean;
    error: string | null;
}

const initialState: PlantPositionState = {
    plantDTOs: [] as PlantOfPositionDto[],
    plants: [] as PlantPositionWithId[],
    plant: null,
    loading: false,
    error: null
}


const plantSlice = createSlice({
    name: 'plant',
    initialState,
    reducers: {},
    
});

export const plantReducer = plantSlice.reducer;