import React, { useEffect, useState } from "react";
import greenTick from "../assets/images/greenTick.svg";
import redWrong from "../assets/images/redWrong.png";
import "../css/email/Email.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/common/Spinner";

const Verified = (props) => {
  const { id, code } = useParams();

  const [res, setRes] = useState({
    success: "",
    msg: "",
  });

  let response;

  const verifyEmail = async () => {
    try {
      const body = {};

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      response = await axios.get(
        process.env.REACT_APP_URL + "/api/auth/verify/" + id + "/" + code,
        body,
        config
      );
    } catch (error) {
      response = error.response;
    }
    setRes({
      success: response.data.success,
      msg: response.data.msg,
    });
    console.log(response);
  };

  useEffect(() => {
    if (id && code) {
      verifyEmail();
    }
    // eslint-disable-next-line
  }, [id, code]);

  return (
    <div
      className={`${
        props.darkMode === true ? "bg-dark text-light" : ""
      } verify-container`}
    >
      {res.success === "" ? (
        <Spinner />
      ) : (
        <>
          <img
            src={res?.success === true ? greenTick : redWrong}
            alt="Email sent"
            className="emailImg"
          />

          {res.msg && <h4>{res?.msg}</h4>}
        </>
      )}
    </div>
  );
};

export default Verified;
