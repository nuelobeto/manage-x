import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, Machine, MachineType } from "../types/types";

// this is were actually manage our states. here, we can modify our states and do whatever we want to them cuz we are powerful!!!!

// initial state
const initialState: InitialState = {
  machineTypes: [],
};

// reducer
const machineSlice = createSlice({
  // all these things are just conventional, na so we dey write am
  name: "machne",
  initialState,
  // the reducer below is where we create actions that update the states.
  reducers: {
    // here, we are simply adding the new machine type to the array of machine types.
    createMachineType: (state, action: PayloadAction<MachineType>) => {
      state.machineTypes = [...state.machineTypes, action.payload];
    },
    // here we are creating new machines based on which machine type they are under.
    createMachine: (state, action: PayloadAction<Machine>) => {
      //find the machine type or machine category
      const machineType = state.machineTypes.find(
        (item) => item.id === action.payload.machineTypeId
      );
      // add the new machine to it
      if (machineType) {
        machineType.machines = [...machineType.machines, action.payload];
      }
    },
    // this action increments the quantity of machines in a machine type
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
    // this action decreases the quantity of machines in a machine type
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
    // delete a machine from a machine type
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
    // delete a machine type
    removeMachineType: (state, action: PayloadAction<MachineType>) => {
      state.machineTypes = state.machineTypes.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// we export the machine slice reducer so we can import in the store, from the store to main.tsx
export default machineSlice.reducer;

// here we export the actions so we can trigger them anywhere in the app
export const {
  createMachineType,
  createMachine,
  incMachineQuantity,
  decMachineQuantity,
  removeMachine,
  removeMachineType,
} = machineSlice.actions;
