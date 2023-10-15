import { useContext, useEffect, useState } from "react";
import { Ingredient, ResultComponentProps } from "@/app/types";
import { PotContext } from "@/app/contexts/PotContext";
import { formatRecipe } from "../utils/formatRecipe";
import waiting from "/public/assets/images/waiting.gif";
import button01 from "/public/assets/images/button01.png";
import button02 from "/public/assets/images/button02.png";
import Image from "next/image";

export default function ResultComponent({
  onStartClick,
}: ResultComponentProps) {
  const [buttonState, setButtonState] = useState(button01);
  const potContext = useContext(PotContext);
  const { pot } = potContext || { pot: [] };

  const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null);

  useEffect(() => {
    if (pot.length > 0) {
      generateRecipe(pot).then((recipe) => {
        setGeneratedRecipe(recipe);
      });
    }
  }, [pot]);

  const generateRecipe = async (pot: Ingredient[]) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const ingredientList = pot.map((ingre) => `· ${ingre.name}`).join("\n");

    const promptText = `You are an expert culinary chef. Create a meal recipe by strictly following these rules:

  Rules:
- The recipe must have a title at the beginning;
- The recipe must have a list of ingredients with their measures;
- The recipe must have a list of instructions;
- The recipe must include all of the available ingredients;
- Ingredients available:
${ingredientList}

Example with ingredients: Mince, Mushroom, Pasta:

Mince and Mushroom Pasta

Ingredients:
- Mince
- Mushroom
- Pasta

Instructions:
1. Put pasta in boiling water
2. Fry mince and mushroom`;

    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: promptText }],
        temperature: 0.3,
        max_tokens: 400,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();
      const responseData = JSON.parse(responseText);
      const formattedRecipe = formatRecipe(
        responseData.choices[0].message.content
      );
      return formattedRecipe;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-14 text-justify mx-2 md:mx-10 gap-10">
        <div>
          {generatedRecipe ? (
            <div className="flex flex-col gap-8">
              <div className="p-4 border-4 bg-white border-slate-700 shadow-lg text-lg shadow-zinc-600 rounded-md">
                <div
                  dangerouslySetInnerHTML={{
                    __html: generatedRecipe.replace(/\n/g, "<br />"),
                  }}
                ></div>
              </div>
              <div
                onMouseEnter={() => setButtonState(button02)}
                onMouseLeave={() => setButtonState(button01)}
                onClick={onStartClick}
                className="relative flex flex-col items-center mx-auto"
              >
                <Image src={buttonState} alt="Logo" width="200" height="100" />
                <span
                  className="absolute inset-0 flex items-center justify-center text-3xl 
          font-semibold cursor-pointer hover:text-stone-600"
                >
                  ONE MORE
                </span>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col gap-3 justify-center items-center p-4 border-4
             bg-white border-slate-700 shadow-lg text-lg shadow-zinc-600 rounded-md"
            >
              <div
                className="relative mx-auto bg-gradient-to-b
          from-slate-500 rounded-full w-60 h-60 overflow-hidden
          shadow-xl mb-5 mt-6 border-zinc-600 border-2"
              >
                <Image
                  src={waiting}
                  alt="Pot"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="text-xl text-center">
                Recipe is being generated. This takes approx. 10-15 seconds.
                <br />
                Thanks for your patience...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
