import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useMarvelService from "../../services/useMarvelService";

import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./singleComic.scss";
import Banner from "../../components/Banner/Banner";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState({});

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    if (!comicId) {
      return;
    }

    clearError();
    getComics(comicId).then((data) => setComic(data));
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <div className="single-comic">
      <Banner />
      {spinner} {errorMessage} {content}
    </div>
  );
};

const View = ({ comic }) => {
  const { thumbnail, title, description, pageCount, language, price } = comic;

  return (
    <div className="single-comic__wrapper">
      <img className="single-comic__img" src={thumbnail} alt={title} />
      <div className="single-comic__content">
        <h2 className="single-comic__title">{title}</h2>
        <div className="single-comic__content">
          <p className="single-comic__text">{description}</p>
          <p className="single-comic__text">{pageCount}</p>
          <p className="single-comic__text">Language: {language}</p>
          <p className="single-comic__price">{price}</p>
        </div>
      </div>
      <Link className="single-comic__link" to="/comics">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
