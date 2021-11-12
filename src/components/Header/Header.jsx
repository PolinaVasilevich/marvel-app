import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title title">
        <Link to="/">
          <span className="title__strong-word ">Marvel </span>
        </Link>{" "}
        information portal
      </h1>
      <nav className="header__menu menu">
        <NavLink to="/" className="menu__link">
          Characters
        </NavLink>
        <span>/</span>
        <NavLink to="/comics" className="menu__link">
          Comics
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
