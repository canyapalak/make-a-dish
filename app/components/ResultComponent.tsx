import { generateRecipe } from "@/app/utils/gpt3";
// import { useState } from "react";

export default function ResultComponent() {
  //   const [recipe, setRecipe] = useState("");

  generateRecipe();

  return (
    <div>
      <h1>Here is Your Recipe:</h1>
      <div>fdfdfdfdsf</div>
    </div>
  );
}
