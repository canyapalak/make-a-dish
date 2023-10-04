import { ingredients } from "@/public/assets/data/Ingredients";
import Image from "next/image";

export default function CookPage({}) {
  console.log("ingredients :>> ", ingredients);

  return (
    <div className="flex flex-row flex-wrap gap-4 mx-auto justify-center">
      {ingredients.map((ing) => (
        <div
          key={ing.name}
          className="flex flex-col justify-center p-2 border-2 border-slate-800 shadow-md
           shadow-zinc-500 bg-white items-center cursor-pointer rounded-md"
        >
          <Image src={ing.src} alt={ing.name} width={70} height={70} />
          <p>{ing.name}</p>
        </div>
      ))}
    </div>
  );
}
