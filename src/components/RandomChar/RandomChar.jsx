import React, { useEffect, useState } from "react";

import decoration from "../../assets/images/randomCharacher/Decoration.png";

import "./randomChar.scss";
import { NavLink } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useMarvelService from "../../services/useMarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then((char) => setChar(char));
  };

  useEffect(() => {
    updateChar();
  }, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="random-char">
      {errorMessage}
      {spinner}
      {content}
      <div className="random-char__static">
        <p className="random-char__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="random-char__title">Or choose another one</p>
        <button
          className="button button__secondary button__dark-brg"
          onClick={updateChar}
        >
          try it
        </button>

        <img
          src={decoration}
          alt="decoration"
          className="random-char__decoration"
        />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, id } = char;

  const imgStyle =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "unset" }
      : null;

  return (
    <div className="random-char__container">
      <img
        src={thumbnail}
        alt={name}
        className="random-char__img"
        style={imgStyle}
      />
      <div className="random-char__info">
        <div>
          <h2 className="random-char__name">{name}</h2>
          <p className="random-char__description">{description}</p>
        </div>
        <div className="random-char__btns">
          <button className="button button__white-brg">
            <NavLink to="/">homepage</NavLink>
          </button>
          <button className="button button__white-brg">
            <NavLink to={`/characters/${id}`}>wiki</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
