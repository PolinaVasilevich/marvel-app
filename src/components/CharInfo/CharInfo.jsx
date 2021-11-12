import React from "react";
import { Link } from "react-router-dom";

import "./charInfo.scss";
import { useState } from "react/cjs/react.development";
import useMarvelService from "../../services/useMarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId).then((data) => setChar(data));
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <errorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char-info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { id, name, thumbnail, description, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <div className="char-info__content-block">
      <div className="char-info__container">
        <img
          src={thumbnail}
          alt={name}
          style={imgStyle}
          className="char-info__img"
        />
        <div className="char-info__content">
          <h2 className="char-info__name">{name}</h2>
          <div className="char-info__btns">
            <button className="button button__white-brg">
              <Link to="/">homepage</Link>
            </button>
            <button className="button button__white-brg">
              <Link to={`/characters/${id}`}>wiki</Link>
            </button>
          </div>
        </div>
      </div>
      <p className="char-info__description">{description}</p>
      <div>
        <h3>Comics:</h3>
        <ul className="char-info__comics-list">
          {!(comics.length > 0) && "There is no comics with this character"}

          {comics.map((c) => (
            <li className="comics-list__item" key={c.resourceURI}>
              <Link to={`/comics/${c.resourceURI.split("/").pop()}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharInfo;
