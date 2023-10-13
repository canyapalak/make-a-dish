import React, { createContext, useState } from "react";
import { Ingredient, PotContextType, PotProviderProps } from "../types";
import { ingredients } from "@/public/assets/data/Ingredients";

export const PotContext = createContext<PotContextType | undefined>(undefined);

export const PotProvider: React.FC<PotProviderProps> = ({ children }) => {
  const [pot, setPot] = useState<Ingredient[]>([]);

  const addToPot = (ingredient: Ingredient) => {
    if (!pot.some((item) => item.name === ingredient.name)) {
      setPot([...pot, ingredient]);
    }
  };

  const removeFromPot = (ingredient: Ingredient) => {
    const updatedPot = pot.filter((item) => item.name !== ingredient.name);
    setPot(updatedPot);
  };

  const clearPot = () => {
    setPot([]);
  };

  return (
    <PotContext.Provider value={{ pot, addToPot, removeFromPot, clearPot }}>
      {children}
    </PotContext.Provider>
  );
};
