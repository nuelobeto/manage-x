import React, { createContext, useState } from "react";
import { MachineType } from "../types/types";
import { useAppSelector } from "./../app/hooks";

// context API is used to send states around the app without passing props.

// all these shalaye are required by typeScript
type ProviderProps = {
  children: React.ReactNode;
};

type ContextType = {
  showTypeModal: boolean;
  showMachineModal: boolean;
  machineTypes: MachineType[];
  currentMachineType: MachineType | null;
  setShowTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMachineModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentMachineType: React.Dispatch<
    React.SetStateAction<MachineType | null>
  >;
};

export const GlobalContext = createContext<ContextType>({} as ContextType);

export const GlobalProvider = ({ children }: ProviderProps) => {
  // here we get the machineType state from the store so we can use it anywhere in the app
  const { machineTypes } = useAppSelector((state) => state.persistedReducer);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [currentMachineType, setCurrentMachineType] =
    useState<MachineType | null>(null);

  // this how actually pass the states and functions down to the components that need them. so everything in the value object below is available anywhere in the app.
  return (
    <GlobalContext.Provider
      value={{
        showTypeModal,
        showMachineModal,
        currentMachineType,
        setShowMachineModal,
        setShowTypeModal,
        machineTypes,
        setCurrentMachineType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
