import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useMarvelService from "../../services/useMarvelService";

import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./singleCharPage.scss";

import Formik from "../../components/Form/Formik";

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
    <div>
      {spinner} {errorMessage} {content}
    </div>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, description } = char;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharPage;
