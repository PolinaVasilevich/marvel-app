import React from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

import "../styles/noMatch.scss";

const NoMatch = () => {
  return (
    <div>
      <ErrorMessage />
      <p className="no-match__title">Page doesn't exist</p>
      <Link className="no-match__link" to="/">
        Back to main page
      </Link>
    </div>
  );
};

export default NoMatch;
