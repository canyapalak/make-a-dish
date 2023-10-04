export interface Ingredient {
  id: number;
  name: string;
  src: string;
}

export type WelcomeComponentProps = {
  onStartClick: () => void;
};
