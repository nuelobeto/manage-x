import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Machine, MachineType } from "../types/types";

// initial state
const initialState: InitialState = {
  machineTypes: [],
};

// reducer
const machineSlice = createSlice({
  name: "machne",
  initialState,
  reducers: {
    createMachineType: (state, action: PayloadAction<MachineType>) => {
      state.machineTypes = [...state.machineTypes, action.payload];
    },
    createMachine: (state, action: PayloadAction<Machine>) => {
      const machineType = state.machineTypes.find(
        (item) => item.id === action.payload.machineTypeId
      );

      if (machineType) {
        machineType.machines = [...machineType.machines, action.payload];
      }
    },
    incMachineQuantity: (state, action: PayloadAction<Machine>) => {
      const machineType = state.machineTypes.find(
        (item) => item.id === action.payload.machineTypeId
      );
      if (machineType) {
        const machine = machineType.machines.find(
          (item) => item.name === action.payload.name
        );

        if (machine) {
          machine.quantity++;
        }
      }
    },
    decMachineQuantity: (state, action: PayloadAction<Machine>) => {
      const machineType = state.machineTypes.find(
        (item) => item.id === action.payload.machineTypeId
      );
      if (machineType) {
        const machine = machineType.machines.find(
          (item) => item.name === action.payload.name
        );

        if (machine) {
          machine.quantity > 1 && machine.quantity--;
        }
      }
    },
    removeMachine: (state, action: PayloadAction<Machine>) => {
      const machineType = state.machineTypes.find(
        (item) => item.id === action.payload.machineTypeId
      );
      if (machineType) {
        machineType.machines = machineType.machines.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    removeMachineType: (state, action: PayloadAction<MachineType>) => {
      state.machineTypes = state.machineTypes.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export default machineSlice.reducer;
export const {
  createMachineType,
  createMachine,
  incMachineQuantity,
  decMachineQuantity,
  removeMachine,
  removeMachineType,
} = machineSlice.actions;
