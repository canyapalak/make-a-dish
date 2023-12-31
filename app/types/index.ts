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

export interface InstructionProviderProps {
  children: ReactNode;
}

export interface PotContextType {
  pot: Ingredient[];
  addToPot: (ingredient: Ingredient) => void;
  removeFromPot: (ingredient: Ingredient) => void;
  clearPot: () => void;
}

export interface InstructionContextType {
  selectVegan: (isVegan: boolean) => void;
  isVegan: boolean;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  handleDurationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ModalInterface {
  open: boolean;
  setOpen: (bool: boolean) => void;
}
