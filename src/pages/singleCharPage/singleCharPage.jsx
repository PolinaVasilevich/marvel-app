import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useMarvelService from "../../services/useMarvelService";

import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./singleCharPage.scss";

const SingleCharPage = () => {
  const { charId } = useParams();

  const [char, setChar] = useState({});

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

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="single-char">
      {spinner} {errorMessage} {content}
    </div>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, description } = char;

  return (
    <div className="single-char__wrapper">
      <img className="single-char__img" src={thumbnail} alt={name} />
      <div className="single-char__content">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__text">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharPage;
