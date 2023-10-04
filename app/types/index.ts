import { ReactNode } from "react";

export interface Ingredient {
  id: number;
  name: string;
  src: string;
}

export type WelcomeComponentProps = {
  onStartClick: () => void;
};

export interface PotProviderProps {
  children: ReactNode;
}

export interface PotContextType {
  pot: Ingredient[];
  addToPot: (ingredient: Ingredient) => void;
}
