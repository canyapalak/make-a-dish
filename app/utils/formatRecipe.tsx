export const formatRecipe = (text: string) => {
  const lines = text.split("\n");

  // Extract the title from the first line
  const title = lines[0];

  // Find the index where the ingredients section starts
  const ingredientsIndex = lines.indexOf("Ingredients:");

  // Find the index where the instructions section starts
  const instructionsIndex = lines.indexOf("Instructions:");

  // Extract the ingredients section
  const ingredients = lines
    .slice(ingredientsIndex + 1, instructionsIndex)
    .join("\n");

  // Extract the instructions section
  const instructions = lines.slice(instructionsIndex + 1).join("\n");

  return `${title}\n\n${ingredients}\n${instructions}`;
};
