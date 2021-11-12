import React from "react";
import Banner from "../components/Banner/Banner";
import ComicsList from "../components/ComicsList/ComicsList";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const Comics = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </div>
  );
};

export default Comics;
