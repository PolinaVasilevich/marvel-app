import React from "react";

import { Formik, Form, Field, ErrorMessage, useField } from "formik";

import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const FormComponent = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(2, "Length must be more 2 characters")
          .required("Required field"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Required field"),
        amount: Yup.number()
          .min(5, "Min 5 characters")
          .required("Required field"),
        currency: Yup.string().required("Choose currency"),
        text: Yup.string().min(10, "Min 10 characters"),
        terms: Yup.boolean()
          .required("Required accept")
          .oneOf([true], "Required accept"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Form</h2>

        <MyTextInput id="name" name="name" type="text" label="Name" />
        <MyTextInput id="email" name="email" type="email" label="Email" />

        <label htmlFor="amount">Amount</label>
        <Field id="amount" name="amount" type="number" />

        <ErrorMessage className="error" name="amount" component="div" />

        <label htmlFor="currency">Currency</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Choose currency</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>

        <ErrorMessage className="error" name="currency" component="div" />

        <label htmlFor="text">Your message</label>
        <Field as="textarea" id="text" name="text" />
        <ErrorMessage className="error" name="text" component="div" />

        <label className="checkbox">
          <Field name="terms" type="checkbox" />
          Do you agree with the privacy policy?
        </label>
        <ErrorMessage className="error" name="currency" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormComponent;
