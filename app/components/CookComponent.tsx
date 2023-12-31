import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ingredients } from "@/public/assets/data/Ingredients";
import { CookComponentProps, Ingredient } from "@/app/types";
import button01 from "/public/assets/images/button01.png";
import button02 from "/public/assets/images/button02.png";
import tick from "/public/assets/images/tick-icon.png";
import checkbox1 from "/public/assets/images/checkbox-empty.png";
import checkbox2 from "/public/assets/images/checkbox-full.png";
import { PotContext } from "@/app/contexts/PotContext";
import BasicModal from "./Modal";
import { InstructionContext } from "../contexts/InstructionContext";
import { veganIngredients } from "@/public/assets/data/VeganIngredients";

export default function CookComponent({ onResultClick }: CookComponentProps) {
  const [open, setOpen] = useState(false);
  const [shuffledIngredients, setShuffledIngredients] = useState<Ingredient[]>(
    []
  );
  const [buttonState, setButtonState] = useState(button01);
  const [ingredientRemoveName, setIngredientRemoveName] = useState<{
    [key: string]: boolean;
  }>({});

  const instructionContext = useContext(InstructionContext);

  const {
    isVegan,
    selectVegan,
    selectedDuration,
    setSelectedDuration,
    handleDurationChange,
  } = instructionContext || {
    isVegan: false,
    selectVegan: () => {},
    selectedDuration: "20-40",
    setSelectedDuration: () => {},
    handleDurationChange: (event) => {
      setSelectedDuration(event.target.value);
    },
  };

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    handleDurationChange(event);
  }

  const potContext = useContext(PotContext);
  const { pot, addToPot, removeFromPot, clearPot } = potContext || {
    pot: [],
    addToPot: () => {},
    removeFromPot: () => {},
    clearPot: () => {},
  };

  function handleVeganBox() {
    selectVegan(!isVegan);
    clearPot();
  }

  const handleIngredientClick = (ingredient: Ingredient) => {
    const isAlreadyInPot = pot.includes(ingredient);
    if (isAlreadyInPot) {
      handleRemoveFromPot(ingredient);
    } else {
      addToPot(ingredient);
    }

    setIngredientRemoveName((prevState) => ({
      ...prevState,
      [ingredient.name]: !prevState[ingredient.name],
    }));
  };

  const handleRemoveFromPot = (ingredient: Ingredient) => {
    removeFromPot(ingredient);
  };

  useEffect(() => {
    let ingredientsToDisplay = isVegan ? veganIngredients : ingredients;
    setShuffledIngredients(shuffleArray(ingredientsToDisplay));
  }, [isVegan]);

  const handleContinueClick = () => {
    if (pot.length < 2 || pot.length > 8) {
      setOpen(true);
    } else {
      onResultClick();
    }
  };

  return (
    <main className="flex flex-col justify-center items-center mt-14 text-justify mx-2 md:mx-10 gap-10">
      {open ? <BasicModal open={open} setOpen={setOpen} /> : null}
      <div className="p-3 border-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 text-xl rounded-md">
        <p>Pick the ingredients in your fridge and let the magic happen!</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div
          className="p-3 border-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 text-xl
        rounded-md flex flex-row gap-2"
        >
          {isVegan ? (
            <Image
              src={checkbox2}
              alt="Not Selected"
              height={28}
              className="cursor-pointer"
              onClick={handleVeganBox}
            />
          ) : (
            <Image
              src={checkbox1}
              alt="Selected"
              height={28}
              className="cursor-pointer"
              onClick={handleVeganBox}
            />
          )}
          <p>I am vegan</p>
        </div>
        <div className="p-3 border-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 text-xl rounded-md flex flex-row gap-2">
          <p>I have</p>
          <select
            name="durations"
            value={selectedDuration}
            onChange={handleSelectChange}
            className="border-2 border-zinc-500 rounded-md"
          >
            <option value="20">20</option>
            <option value="20-40">20-40</option>
            <option value="40-60">40-60</option>
          </select>
          <p>minutes</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-3 md:gap-6 mx-4 lg:mx-8 justify-center ">
        {shuffledIngredients.map((ingre) => (
          <div
            key={ingre.name}
            className="flex flex-col justify-center p-2 border-4 border-slate-700 shadow-md
    shadow-zinc-500 bg-white items-center cursor-pointer rounded-md relative overflow-hidden"
            onClick={() => handleIngredientClick(ingre)}
          >
            <div className="group">
              <Image
                src={ingre.src}
                alt={ingre.name}
                width={70}
                height={70}
                title={ingre.name}
                className={`${
                  pot.includes(ingre) ? "opacity-25" : ""
                } group-hover:opacity-25`}
              />
              {pot.includes(ingre) && (
                <div className="absolute inset-4 flex justify-center opacity-100">
                  <Image src={tick} alt="Tick" width={60} height={60} />
                </div>
              )}
              <div
                className={`absolute inset-0 flex justify-center opacity-0 group-hover:opacity-100 ${
                  pot.includes(ingre) ? "group-hover:opacity-0" : ""
                }`}
              >
                <p
                  className={`${
                    ingredientRemoveName[ingre.name] ? "opacity-0" : ""
                  } text-center my-auto`}
                >
                  {ingre.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        onMouseEnter={() => setButtonState(button02)}
        onMouseLeave={() => setButtonState(button01)}
        className="relative flex items-center"
        onClick={handleContinueClick}
      >
        <Image src={buttonState} alt="Logo" width="200" height="100" />
        <span
          className="absolute inset-0 flex items-center justify-center text-3xl 
        font-semibold cursor-pointer hover:text-stone-600"
        >
          LET'S GO!
        </span>
      </div>
    </main>
  );
}

// SHUFFLE INGREDIENTS ARRAY
function shuffleArray(array: Ingredient[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
