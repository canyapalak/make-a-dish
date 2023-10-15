export const formatRecipe = (text: string) => {
  const lines = text.split("\n");
  const title = lines[0];
  const ingredientsIndex = lines.indexOf("Ingredients:");
  const instructionsIndex = lines.indexOf("Instructions:");

  const ingredients = lines
    .slice(ingredientsIndex + 1, instructionsIndex)
    .join("\n");

  const instructions = lines.slice(instructionsIndex + 1).join("\n");

  return `${title}\n\n${ingredients}\n${instructions}`;
};
