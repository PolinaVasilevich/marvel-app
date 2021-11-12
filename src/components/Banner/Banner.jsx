import React from "react";

import avengers from "../../assets/images/banner/Avengers.png";
import avengersLogo from "../../assets/images/banner/Avengers_logo.png";

import "./banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <img src={avengers} alt="Avengers" className="banner__img" />
      <div className="banner__text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={avengersLogo} alt="Avengers logo" className="banner__img" />
    </div>
  );
};

export default Banner;
