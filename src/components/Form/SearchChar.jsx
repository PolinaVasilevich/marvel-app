import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import * as Yup from "yup";
import useMarvelService from "../../services/useMarvelService";

const SearchChar = () => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;

  const result = !char ? null : char.length ? (
    <div className="search-success">
      <p>There is! Visit {char[0].name} page?</p>
      <button className="button button__white-brg" type="submit">
        <Link to={`/characters/${char[0].id}`}>page to</Link>
      </button>
    </div>
  ) : (
    <div className="search-error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="find-char">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("This field is required"),
        })}
        onSubmit={(values) => {
          updateChar(values.name);
          values.name = "";
        }}
      >
        <Form>
          <label htmlFor="name">Or find a character by name:</label>
          <div className="find-char__container">
            <Field id="name" name="name" placeholder="Enter name" />
            <button
              className="button button__secondary button__white-brg"
              type="submit"
              disabled={loading}
            >
              find
            </button>
          </div>
          <FormikErrorMessage className="error" name="name" component="div" />
        </Form>
      </Formik>
      {result}
      {errorMessage}
    </div>
  );
};

export default SearchChar;
