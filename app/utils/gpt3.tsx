// import { PotContext } from "@/app/contexts/PotContext";
// import { useContext } from "react";

// async function generateRecipe() {
//   const potContext = useContext(PotContext);
//   const { pot } = potContext || {
//     pot: [],
//   };

//   const API_KEY = process.env.OPENAI_API_KEY;

//   const ingredientList = pot.map((ingre) => `${ingre.name}, `).join("\n");

//   const promptText = `You are an expert culinary chef. Create a meal recipe by strictly following these rules:

//   Rules:
// - The recipe must have a title at the beginning;
// - The recipe must have a list of ingredients with their measures;
// - The recipe must have a list of instructions;
// - Ingredients available:
// ${ingredientList}

// Example with ingredients: Mince, Mushroom, Pasta:

// Mince and Mushroom Pasta

// Ingredients:
// - Mince
// - Mushroom
// - Pasta

// Instructions:
// 1. Put pasta in boiling water
// 2. Fry mince and mushroom`;

//   const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: promptText }],
//       temperature: 0.5,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//       max_tokens: 500,
//       stream: true,
//       n: 1,
//     }),
//   };

//   try {
//     const response = await fetch(apiUrl, requestOptions);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     return responseData.choices[0].text;
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     throw error;
//   }
// }

// export { generateRecipe };
