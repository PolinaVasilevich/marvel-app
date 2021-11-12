import React from "react";

import "./skeleton.scss";

const Skeleton = () => {
  return (
    <div className="skeleton">
      <h2 className="skeleton__title">
        Please select a character to see information
      </h2>
      <div>
        <div className="pulse skeleton__header">
          <div className="pulse skeleton__circle"></div>
          <div className="pulse skeleton__mini"></div>
        </div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
      </div>
    </div>
  );
};

export default Skeleton;
