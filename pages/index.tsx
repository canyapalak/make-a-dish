import { useState } from "react";
import WelcomeComponent from "@/app/components/WelcomeComponent";
import CookComponent from "@/app/components/CookComponent";

export default function Home() {
  const [showCookComponent, setShowCookComponent] = useState(false);

  const handleStartClick = () => {
    setShowCookComponent(true);
  };

  return (
    <div>
      {showCookComponent ? (
        <CookComponent />
      ) : (
        <WelcomeComponent onStartClick={handleStartClick} />
      )}
    </div>
  );
}
