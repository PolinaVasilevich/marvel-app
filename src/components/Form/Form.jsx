import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

// const validate = (values) => {
//   const errors = {};
//   if (!values.name) {
//     errors.name = "Required field";
//   } else if (values.name.length < 2) {
//     errors.name = "Length must be more 2 characters";
//   }

//   if (!values.email) {
//     errors.email = "Required field";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      amount: 0,
      currency: "",
      text: "",
      terms: false,
    },

    validationSchema: Yup.object({
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
    }),
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Form</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? (
        <div className="error">{formik.errors.name}</div>
      ) : null}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.email && formik.touched.email ? (
        <div className="error">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.errors.amount && formik.touched.amount ? (
        <div className="error">{formik.errors.amount}</div>
      ) : null}

      <label htmlFor="currency">Currency</label>
      <select
        id="currency"
        name="currency"
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Choose currency</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="RUB">RUB</option>
      </select>

      {formik.errors.currency && formik.touched.currency ? (
        <div className="error">{formik.errors.currency}</div>
      ) : null}

      <label htmlFor="text">Your message</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.text && formik.touched.text ? (
        <div className="error">{formik.errors.text}</div>
      ) : null}

      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          value={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Do you agree with the privacy policy?
      </label>

      {formik.errors.terms && formik.touched.terms ? (
        <div className="error">{formik.errors.terms}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
