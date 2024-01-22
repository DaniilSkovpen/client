import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then(() => console.log(data));
  };

  //let navigate = useNavigate();

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="h1" />
          <Field id="Login" name="username" placeholder="(Ex. Name...)" />
          <label>Password: </label>
          <ErrorMessage name="password" component="h1" />
          <Field
            id="Login"
            type="password"
            name="password"
            placeholder="Your password..."
          />
          <button type="submit">Sign in</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
