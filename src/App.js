import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import {
  Comics,
  MainPage,
  SingleComicPage,
  NoMatch,
  SingleCharPage,
} from "./pages";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/characters/:charId" element={<SingleCharPage />} />

          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:comicId" element={<SingleComicPage />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
