import { useContext, useState } from "react";
import WelcomeComponent from "@/app/components/WelcomeComponent";
import CookComponent from "@/app/components/CookComponent";
import ResultComponent from "@/app/components/ResultComponent";
import { PotContext } from "../app/contexts/PotContext";

export default function Home() {
  const [showCookComponent, setShowCookComponent] = useState(false);
  const [showResultComponent, setShowResultComponent] = useState(false);
  const potContext = useContext(PotContext);

  const handleStartClick = () => {
    const { clearPot } = potContext || {
      clearPot: () => {},
    };
    clearPot();
    setShowCookComponent(true);
  };

  const handleResultClick = () => {
    setShowResultComponent(true);
    setShowCookComponent(false);
    console.log("test");
  };

  return (
    <div>
      {showCookComponent ? (
        <CookComponent onResultClick={handleResultClick} />
      ) : showResultComponent ? (
        <ResultComponent onStartClick={handleStartClick} />
      ) : (
        <WelcomeComponent onStartClick={handleStartClick} />
      )}
    </div>
  );
}
