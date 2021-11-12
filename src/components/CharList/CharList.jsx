import React, { useEffect, useState } from "react";

import "./charList.scss";
import useMarvelService from "../../services/useMarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CharList = ({ selectedChar, selectChar }) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllCharacters(offset).then((data) => onCharListLoaded(data));
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char-list">
      {spinner}
      {errorMessage}
      <div className="char-list__grid">
        {charList.map((character) => {
          return (
            <div
              key={character.id}
              onClick={() => {
                selectChar(character.id);
              }}
              className={
                selectedChar === character.id
                  ? "char-card char-card__selected"
                  : "char-card"
              }
            >
              <img
                src={character.thumbnail}
                alt={character.name}
                className="char-card__img"
              />
              <p className="char-card__name">{character.name}</p>
            </div>
          );
        })}
      </div>
      <button
        className="button button__secondary button__white-brg"
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
      >
        load more
      </button>
    </div>
  );
};

export default CharList;
