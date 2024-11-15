import React, { useEffect, useState } from "react";
import heart from "../../assets/images/heart.svg";
import heartFill from "../../assets/images/heart-fill.svg";
import heartLight from "../../assets/images/heart-light.svg";
import heartFillLight from "../../assets/images/heart-fill-light.svg";
import "../../css/common/NewsItem.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewsItem = (props) => {
  let {
    id,
    title,
    description,
    imageUrl,
    newsUrl,
    author,
    date,
    source,
    darkMode,
    bookmarked,
    loggedIn,
    changed,
    setChanged,
  } = props;

  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleAddBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      toast.error("log in first");
      return;
    }

    let body = JSON.stringify({
      //body of the request
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      newsDate: date,
      source,
    });

    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    try {
      const response = await axios.post(
        //post request to the backend
        process.env.REACT_APP_URL + "/api/news/addnews",
        body,
        config
      );
      if (response.data.success === true) {
        setIsBookmarked(true);
        setChanged(!changed);
        // console.log(response.data.msg);
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const fetchId = () => {
    if (bookmarked) {
      const matchingObject = bookmarked.find((item) => item.title === title);
      if (matchingObject) {
        setIsBookmarked(true);
        if (!id) {
          return (id = matchingObject._id);
        }
      }
    }
  };

  const handleRemoveBookmark = async (id) => {
    if (!id) {
      id = fetchId();
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      alert("log in first");
      return;
    }

    let body = {};

    let config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    try {
      const response = await axios.delete(
        //post request to the backend
        process.env.REACT_APP_URL + "/api/news/deletenews/" + id,
        config,
        body
      );
      if (response.data.success === true) {
        setIsBookmarked(false);
        setChanged(!changed);
        // console.log(response.data.msg);
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchId();
    // eslint-disable-next-line
  }, [bookmarked]);

  return (
    <div className="my-3">
      <div
        className={`card ${
          darkMode ? "bg-dark text-light border border-secondary" : ""
        }`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={!imageUrl ? "http://via.placeholder.com/640x360" : imageUrl}
          className="card-img-top"
          style={{
            maxHeight: "200px",
          }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <div className="d-flex align-items-center justify-content-between">
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className={`btn btn-sm ${
                darkMode === true ? "btn-light" : "btn-dark"
              }`}
            >
              Read More
            </a>
            {loggedIn && (
              <button
                className="btn btn-sm"
                onClick={
                  !isBookmarked
                    ? handleAddBookmark
                    : () => {
                        handleRemoveBookmark(id);
                      }
                }
              >
                {darkMode ? (
                  <img
                    src={isBookmarked ? heartFillLight : heartLight}
                    className="heartImg"
                    alt=""
                  />
                ) : (
                  <img
                    src={isBookmarked ? heartFill : heart}
                    className="heartImg"
                    alt=""
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
