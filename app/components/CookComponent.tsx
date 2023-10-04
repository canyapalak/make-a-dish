import { useEffect, useState } from "react";
import { ingredients } from "@/public/assets/data/Ingredients";
import Image from "next/image";
import { Ingredient } from "@/app/types";

// SHUFFLE INGREDIENTS ARRAY
function shuffleArray(array: Ingredient[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function CookComponent() {
  const [shuffledIngredients, setShuffledIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    setShuffledIngredients(shuffleArray(ingredients));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-14 text-justify mx-10 gap-10">
      <div className="p-3 border-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 text-xl ">
        <p>Drag the ingredients in your fridge and drop them into the pot!</p>
      </div>
      <div className="flex flex-row flex-wrap gap-6 mx-8 justify-center ">
        {shuffledIngredients.map((ingre) => (
          <div
            key={ingre.name}
            className="flex flex-col justify-center p-2 border-4 border-slate-700 shadow-md
             shadow-zinc-500 bg-white items-center cursor-pointer rounded-md relative overflow-hidden"
          >
            <div className="group">
              <Image
                src={ingre.src}
                alt={ingre.name}
                width={70}
                height={70}
                title={ingre.name}
                className="group-hover:opacity-25"
              />
              <div className="absolute inset-0 flex justify-center opacity-0 group-hover:opacity-100">
                <p className="text-center my-auto">{ingre.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="p-2 border-4 border-slate-700 shadow-md
             shadow-zinc-500 bg-white rounded-md"
      >
        <Image
          src="/assets/images/cooking-pot.png"
          alt="Pot"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
