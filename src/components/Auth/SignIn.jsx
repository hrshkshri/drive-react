import React, { useState } from "react";
import CenteredContainer from "../../styled-components/CenteredContainer";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { useAuth } from "../../context/AuthContextProvider";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

const Link = styled(NavLink)`
  text-decoration: none;
  color: #254e8b;

  :hover {
    color: #171e2e;
    text-decoration: underline #254e8b;
  }
`;

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { currentUser, signin } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (values) => {
    console.log("Form Data: ", values);

    const { email, password } = values;
    setMessage("");

    setLoading(true);
    signin(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/wrong-password") {
          setMessage("Sorry, wrong Password!");
        } else if ((err.code = "auth/user-not-found")) {
          setMessage("Sorry, you don't have an account!");
        } else {
          setMessage("Something went wrong. Try again!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validate = () => {
  // Return an empty object to indicate no validation errors
  return {};
  };

  const formik = useFormik({
    //set initial values
    initialValues,
    //onsubmit will get an callback func with values as arguments
    onSubmit,
    validate,
  });

  if (currentUser) {
    return <Redirect path="/" />;
  }

  return (
    <CenteredContainer>
      <div>
        <h1>Sign in</h1>
        <div>
          New here? <Link to="/signup">Click here to Sign up</Link>
        </div>
        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
            }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              id="email"
              // helperText="Invalid"
              error={formik.touched.email && formik.errors.email}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""
              }
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password must be at least 6 characters"
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#0c163d",
                color: "#fff",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Sign In"
              )}
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {message && <p>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default SignIn;
