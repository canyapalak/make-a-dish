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

export default function CookPage() {
  const [shuffledIngredients, setShuffledIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    setShuffledIngredients(shuffleArray(ingredients));
  }, []);

  return (
    <div className="flex flex-row flex-wrap gap-4 mx-auto justify-center">
      {shuffledIngredients.map((ingre) => (
        <div
          key={ingre.name}
          className="flex flex-col justify-center p-2 border-2 border-slate-800 shadow-md
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
            <div
              className="absolute inset-0 flex justify-center opacity-0 group-hover:opacity-100 
            transition-opacity duration-500"
            >
              <p className="text-center my-auto">{ingre.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
