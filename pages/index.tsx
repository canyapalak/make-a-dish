import { useState } from "react";
import WelcomeComponent from "@/app/components/WelcomeComponent";
import CookComponent from "@/app/components/CookComponent";
import ResultComponent from "@/app/components/ResultComponent";

export default function Home() {
  const [showCookComponent, setShowCookComponent] = useState(false);
  const [showResultComponent, setShowResultComponent] = useState(false);

  const handleStartClick = () => {
    setShowCookComponent(true);
  };

  const handleResultClick = () => {
    setShowResultComponent(true);
  };

  return (
    <div>
      {showCookComponent ? (
        <CookComponent onResultClick={handleResultClick} />
      ) : showResultComponent ? (
        <ResultComponent />
      ) : (
        <WelcomeComponent onStartClick={handleStartClick} />
      )}
    </div>
  );
}
