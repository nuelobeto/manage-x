import { Button, Form, Input, Modal, ModalWrapper } from "../styles/styles";
import { GrFormClose } from "react-icons/gr";
import { SetStateAction, useContext, useState } from "react";
import { GlobalContext } from "./../context/GlobalState";
import { Machine } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import { createMachine, incMachineQuantity } from "../features/machineSlice";

// this component is the modal for adding a new machine.
const AddNewMachineModal = () => {
  // we get this states from global context. check GlobalContext file in context folder.
  //Basically, we open this modal, it means we want to add a new machine to a machineType, hence we need to know the machine type that the machine would go to.
  //therefore we save this machineType in "currentMachineType".
  const { setShowMachineModal, currentMachineType } = useContext(GlobalContext);
  const [quantity, setQuantity] = useState(1);
  const [model, setModel] = useState("");

  // dispatch is used to trigger actions from our machineSlice (machineReducer).
  const dispatch = useAppDispatch();

  // this function adds a new machine
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentMachineType) {
      const newMachine: Machine = {
        id: Date.now(),
        machineTypeId: currentMachineType.id,
        machineTypeName: currentMachineType.name,
        name: model,
        quantity,
      };
      //this condition prevents creating double machines with the same name. So if you enter a machine name that already exists, it will simply increase the quantity of that machine.
      if (
        currentMachineType.machines.some(
          (item) => item.name === newMachine.name
        )
      ) {
        dispatch(incMachineQuantity(newMachine));
      } else {
        // this action dispatches (triggers) an action that creates a new machine for a particular machine type.
        dispatch(createMachine(newMachine));
      }
    }
    // this function closes the modal after adding a machine.
    setShowMachineModal(false);
  };

  return (
    <ModalWrapper>
      <Modal>
        <Button modalBtn onClick={() => setShowMachineModal(false)}>
          <GrFormClose />
        </Button>
        <Form modalForm col onSubmit={handleSubmit}>
          <Input
            modalInput
            type="text"
            defaultValue={currentMachineType?.name}
          />
          <Input
            modalInput
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setModel(e.target.value)
            }
          />
          <Input
            modalInput
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e: { target: { value: SetStateAction<number> } }) =>
              setQuantity(e.target.value)
            }
          />
          {currentMachineType?.fields.map((item, index) => (
            <Input
              key={index}
              type={item.fieldType}
              placeholder={item.label}
              modalInput
            />
          ))}

          <Button w="150px" p=".8rem 1.5rem" radius="rounded">
            Submit
          </Button>
        </Form>
      </Modal>
    </ModalWrapper>
  );
};

export default AddNewMachineModal;
