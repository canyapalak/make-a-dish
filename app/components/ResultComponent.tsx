import { useContext, useEffect, useState } from "react";
import { Ingredient } from "@/app/types";
import { PotContext } from "@/app/contexts/PotContext";

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
    console.log("API_KEY :>> ", API_KEY);

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
        Authorization:
          //   "Bearer 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",
          `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: promptText }],
        temperature: 0.6,
        max_tokens: 400,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
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
      return responseData.choices[0].text;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  };

  return (
    <div>
      {generatedRecipe ? (
        <div>
          <h2>Generated Recipe</h2>
          <p>{generatedRecipe}</p>
        </div>
      ) : (
        <p>
          No recipe generated yet. Add ingredients to your pot and wait for the
          magic to happen!
        </p>
      )}
    </div>
  );
}
