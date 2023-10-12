import { useContext, useEffect, useState } from "react";
import { Ingredient } from "@/app/types";
import { PotContext } from "@/app/contexts/PotContext";
import { formatRecipe } from "../utils/formatRecipe";
import cookingPot from "/public/assets/images/pot-animated.gif";
import Image from "next/image";

export default function ResultComponent() {
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
    console.log("ingredientList :>> ", ingredientList);

    const promptText = `You are an expert culinary chef. Create a meal recipe by strictly following these rules:

  Rules:
- The recipe must have a title at the beginning;
- The recipe must have a list of ingredients with their measures;
- The recipe must have a list of instructions;
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

    console.log("promptText :>> ", promptText);

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
        temperature: 0.2,
        max_tokens: 300,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // stream: true,
        // n: 1,
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log("API Response:", responseText);
      const responseData = JSON.parse(responseText);
      const formattedRecipe = formatRecipe(
        responseData.choices[0].message.content
      );
      console.log("formattedRecipe :>> ", formattedRecipe);
      return formattedRecipe;
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-14 text-justify mx-2 md:mx-10 gap-10">
        <div className="p-4 border-4 bg-white border-slate-700 shadow-lg text-lg shadow-zinc-600 rounded-md">
          {generatedRecipe ? (
            <div
              dangerouslySetInnerHTML={{
                __html: generatedRecipe.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <div className="flex flex-col gap-3 justify-center items-center">
              <Image src={cookingPot} alt="Pot" width="250" height="250" />
              <p className="text-xl">
                Recipe is being generated. Thanks for your patience...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
