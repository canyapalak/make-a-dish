// utils/gpt3.js
const API_KEY = process.env.OPENAI_API_KEY;

async function generateRecipe(prompt: string) {
  const apiUrl = "https://api.openai.com/v1/engines/davinci/completions";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData.choices[0].text;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

export { generateRecipe };