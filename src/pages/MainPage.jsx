import React, { useState } from "react";
import CharInfo from "../components/CharInfo/CharInfo";
import CharList from "../components/CharList/CharList";
import RandomChar from "../components/RandomChar/RandomChar";

import decoration from "../assets/images/vision.png";

import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import FindChar from "../components/Form/SearchChar";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState();

  const selectChar = (char) => {
    setSelectedChar(char);
  };

  return (
    <div className="characters">
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char-content">
        <ErrorBoundary>
          <CharList selectedChar={selectedChar} selectChar={selectChar} />
        </ErrorBoundary>

        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <FindChar />
        </div>
      </div>

      <img src={decoration} alt="vision" className="bg-decoration" />
    </div>
  );
};

export default MainPage;
