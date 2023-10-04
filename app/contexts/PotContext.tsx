import React, { createContext, useState } from "react";
import { Ingredient, PotContextType, PotProviderProps } from "../types";

export const PotContext = createContext<PotContextType | undefined>(undefined);

export const PotProvider: React.FC<PotProviderProps> = ({ children }) => {
  const [pot, setPot] = useState<Ingredient[]>([]);

  const addToPot = (ingredient: Ingredient) => {
    setPot([...pot, ingredient]);
  };

  return (
    <PotContext.Provider value={{ pot, addToPot }}>
      {children}
    </PotContext.Provider>
  );
};
