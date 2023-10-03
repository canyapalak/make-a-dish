import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../app/globals.css";
import Image from "next/image";
import logo01 from "@/public/assets/images/logo-nobg01.png";
import logo02 from "@/public/assets/images/logo-nobg02.png";
import logo03 from "@/public/assets/images/logo-nobg03.png";
import logo04 from "@/public/assets/images/logo-nobg04.png";

const logos = [logo01, logo02, logo03, logo04];

export default function Home() {
  const [currentLogo, setCurrentLogo] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLogo((prevIndex) => (prevIndex + 1) % logos.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Image
        src={logos[currentLogo]}
        alt="Logo"
        width="400"
        height="100"
        className="mx-auto"
      />
      <p className="text-3xl">Make a Dish</p>
      <p className="text-lg">fdsfdsfsdf fsfsf s fsfs..</p>
    </div>
  );
}
