import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useMarvelService from "../../services/useMarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset).then((data) => onComicsListLoaded(data));
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 8);
    setCharEnded((charEnded) => ended);
  };

  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics-list">
      {spinner}
      {errorMessage}
      <div className="comics-list__items">
        {comicsList.map(({ id, title, thumbnail, price }, index) => (
          <div className="comics-item__wrapper" key={index}>
            <Link to={`/comics/${id}`}>
              <img src={thumbnail} alt={title} className="comics-item__img" />
            </Link>
            <h3 className="comics-item__title">{title}</h3>
            <span className="comics-item__price">{price}</span>
          </div>
        ))}
      </div>
      <button
        className="button button__secondary button__white-brg "
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
      >
        load more
      </button>
    </div>
  );
};

export default ComicsList;
