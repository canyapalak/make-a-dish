import React, { createContext, useState } from "react";
import { InstructionContextType, InstructionProviderProps } from "../types";

export const InstructionContext = createContext<
  InstructionContextType | undefined
>(undefined);

export const InstructionProvider: React.FC<InstructionProviderProps> = ({
  children,
}) => {
  const [isVegan, setIsVegan] = useState<boolean>(false);

  const selectVegan = (value: boolean) => {
    setIsVegan(value);
  };

  const [selectedDuration, setSelectedDuration] = useState("20-40");

  const handleDurationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDuration(event.target.value);
  };

  return (
    <InstructionContext.Provider
      value={{
        isVegan,
        selectVegan,
        selectedDuration,
        setSelectedDuration,
        handleDurationChange,
      }}
    >
      {children}
    </InstructionContext.Provider>
  );
};
