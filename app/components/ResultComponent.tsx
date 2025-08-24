import { useContext, useEffect, useState } from "react";
import { Ingredient, ResultComponentProps } from "@/app/types";
import { PotContext } from "@/app/contexts/PotContext";
import { formatRecipe } from "../utils/formatRecipe";
import waiting from "/public/assets/images/waiting.gif";
import button01 from "/public/assets/images/button01.png";
import button02 from "/public/assets/images/button02.png";
import { Copy, CopyCheck } from "lucide-react";
import Image from "next/image";
import { InstructionContext } from "../contexts/InstructionContext";

export default function ResultComponent({
  onStartClick,
}: ResultComponentProps) {
  const [buttonState, setButtonState] = useState(button01);
  const instructionContext = useContext(InstructionContext);
  const potContext = useContext(PotContext);
  const { pot } = potContext || { pot: [] };
  const [isCopied, setIsCopied] = useState(false);
  const [showCopiedText, setShowCopiedText] = useState(false);

  let isVegan = false;
  let duration = "20-40";
  if (instructionContext) {
    isVegan = instructionContext.isVegan;
    if (instructionContext.selectedDuration) {
      duration = instructionContext.selectedDuration;
    }
  }

  const [generatedRecipe, setGeneratedRecipe] = useState<string | null>(null);

  useEffect(() => {
    if (pot.length > 0) {
      generateRecipe(pot).then((recipe) => {
        setGeneratedRecipe(recipe);
      });
    }
    console.log("generatedRecipe", generatedRecipe);
  }, [pot]);

  const generateRecipe = async (pot: Ingredient[]) => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const ingredientList = pot.map((ingre) => `· ${ingre.name}`).join("\n");

    const veganPrompt = isVegan
      ? `- The recipe must include only vegan ingredients;\n`
      : "";

    const promptText = `You are an expert culinary chef. Create a meal recipe by strictly following these rules:

  Rules:
- The recipe must have a title at the beginning;
- The recipe must have a list of ingredients with their measures;
- The recipe must have a list of instructions;
- The recipe must include all of the available ingredients;
- The recipe can be made in ${duration} minutes;
${veganPrompt}
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

  const handleCopyLink = () => {
    if (generatedRecipe !== null) {
      navigator.clipboard.writeText(generatedRecipe);
      setIsCopied(true);
      setShowCopiedText(true);
    }

    setTimeout(() => {
      setShowCopiedText(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-14 text-justify mx-2 md:mx-10 gap-10">
        <div>
          {generatedRecipe ? (
            <div className="flex flex-col gap-8">
              <div className="p-4 border-4 bg-white border-slate-700 shadow-lg text-lg shadow-zinc-600 rounded-md relative">
                {isCopied ? (
                  <div className="flex flex-row gap-2 absolute top-2 right-2">
                    {showCopiedText ? (
                      <p className="text-green-600"> Copied!</p>
                    ) : null}
                    <CopyCheck className="w-7 h-7" />
                  </div>
                ) : (
                  <Copy
                    onClick={handleCopyLink}
                    className="absolute top-2 right-2 cursor-pointer w-7 h-7 hover:text-red-500"
                  />
                )}
                <div
                  className="p-7"
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
                Recipe is being generated. This can take a few seconds.
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
