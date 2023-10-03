import { useState } from "react";
import "tailwindcss/tailwind.css";
import "../app/globals.css";
import Image from "next/image";
import button01 from "/public/assets/images/button01.png";
import button02 from "/public/assets/images/button02.png";

export default function Home() {
  const [buttonState, setButtonState] = useState(button01);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-20 text-xl text-justify mx-10 gap-16">
        <p>
          You got a fridge with edible enigmas but no clue what to cook? Then
          this is your lucky day!
        </p>
        <div
          onMouseEnter={() => setButtonState(button02)}
          onMouseLeave={() => setButtonState(button01)}
          className="relative flex items-center"
        >
          <Image src={buttonState} alt="Logo" width="200" height="100" />
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-semibold cursor-pointer hover:text-stone-600">
            START
          </span>
        </div>
      </div>
    </div>
  );
}
