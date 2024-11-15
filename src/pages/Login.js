import React, { useState } from "react";
import "../css/login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { darkMode, setLoggedIn } = props;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    if (!email || !password) {
      toast.error("Enter all fields!");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(credentials);

    try {
      const response = await axios.post(
        process.env.REACT_APP_URL + "/api/auth/login",
        body,
        config
      );
      if (response.data.success === true) {
        //if the login is successful
        toast.success(response.data.msg);
        localStorage.setItem("token", response.data.authtoken); //store the token in the local storage
        setLoggedIn(true);
        navigate("/"); //navigate to the domain page
      } else {
        //if the login is unsuccessful
        toast.error(response.data.msg); //display the error message
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
      className={`loginPage ${darkMode === true ? "bg-dark text-light" : ""}`}
    >
      <form className="container loginForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control form-control-sm ${
              darkMode ? "bg-dark text-light" : ""
            }`}
            id="exampleInputPassword1"
            name="password"
            onChange={handleChange}
            value={credentials.password}
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
