import { useState } from "react";
import "tailwindcss/tailwind.css";
import "@/app/globals.css";
import Image from "next/image";
import button01 from "/public/assets/images/button01.png";
import button02 from "/public/assets/images/button02.png";
import { WelcomeComponentProps } from "../types";

export default function WelcomeComponent({
  onStartClick,
}: WelcomeComponentProps) {
  const [buttonState, setButtonState] = useState(button01);

  return (
    <div>
      <div className="flex flex-col items-center mt-14 text-xl text-justify mx-2 md:mx-10 gap-16 min-h-screen">
        <div className="p-3 border-4 bg-white border-slate-700 shadow-lg shadow-zinc-600 rounded-md">
          <p>
            You got a fridge with edible enigmas but no clue what to cook? Then
            this is your lucky day!
          </p>
        </div>
        <div
          onMouseEnter={() => setButtonState(button02)}
          onMouseLeave={() => setButtonState(button01)}
          onClick={onStartClick}
          className="relative flex items-center"
        >
          <Image src={buttonState} alt="Logo" width="200" height="100" />
          <span
            className="absolute inset-0 flex items-center justify-center text-3xl 
          font-semibold cursor-pointer hover:text-stone-600"
          >
            START
          </span>
        </div>
      </div>
    </div>
  );
}
