import { ReactNode } from "react";

export interface Ingredient {
  id: number;
  name: string;
  src: string;
}

export type WelcomeComponentProps = {
  onStartClick: () => void;
};
export interface CookComponentProps {
  onResultClick: () => void;
}
export type ResultComponentProps = {
  onStartClick: () => void;
};

export interface PotProviderProps {
  children: ReactNode;
}

export interface PotContextType {
  pot: Ingredient[];
  addToPot: (ingredient: Ingredient) => void;
  removeFromPot: (ingredient: Ingredient) => void;
  clearPot: () => void;
}
