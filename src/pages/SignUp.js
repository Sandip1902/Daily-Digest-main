import React, { useState } from "react";
import "../css/signup/SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const { darkMode, setLoggedIn } = props;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confPassword } = credentials;
    if (!name || !email || !password || !confPassword) {
      toast.error("Enter all fields!");
      return;
    }

    if (password !== confPassword) {
      toast.error("Password and Confirm Password are not same");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name: name,
      email: email,
      password: password,
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/createuser",
        body,
        config
      );
      if (response.data.success === true) {
        //if the login is successful
        // toast.success(response.data.msg);
        // localStorage.setItem("token", response.data.authtoken); //store the token in the local storage
        // setLoggedIn(true);
        navigate("/email"); //navigate to the domain page
      } else {
        //if the login is unsuccessful
        // alert(response.data.msg);
        // toast.error(response.data.msg);
        // console.log(response);
      }
    } catch (err) {
      const errors = err.response.data.msg;
      if (typeof errors == "string") {
        toast.error(errors);
      } else if (typeof errors == "object") {
        const message = errors.map((obj) => obj.msg);
        toast.error(message.join("\n"));
      }
    }
  };

  return (
    <div
      className={`signUpPage ${darkMode === true ? "bg-dark text-light" : ""}`}
    >
      <form className="container signUpForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleChange}
            value={credentials.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="confPassword"
            name="confPassword"
            onChange={handleChange}
            value={credentials.confPassword}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
