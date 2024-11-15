import React, { useEffect, useState } from "react";
import NewsItem from "../components/common/NewsItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";

const Bookmarked = (props) => {
  const [articles, setArticles] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changed, setChanged] = useState(false);

  const navigate = useNavigate();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Daily Digest`;
    fetchallnews();
    // eslint-disable-next-line
  }, []);

  const fetchallnews = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("log in first");
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
      const response = await axios.get(
        //post request to the backend
        process.env.REACT_APP_URL + "/api/news/fetchallnews",
        config,
        body
      );
      if (response.data.success === true) {
        setArticles(response.data.data);
        const allBookmarked = response.data.data;
        const titles = allBookmarked.map(({ title, _id }) => ({ title, _id }));
        setBookmarked(titles);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      // console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchallnews();
    // eslint-disable-next-line
  }, [changed]);

  return (
    <div className={`${props.darkMode === true ? "bg-dark text-light" : ""}`}>
      <h1
        className="text-center"
        style={{ padding: "35px 0px", paddingTop: "90px" }}
      >
        Daily Digest - {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <div className="container ">
        <div className="row">
          {articles.length > 0 ? (
            articles.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    id={element._id}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    darkMode={props.darkMode}
                    bookmarked={bookmarked}
                    loggedIn={props.loggedIn}
                    changed={changed}
                    setChanged={setChanged}
                  />
                </div>
              );
            })
          ) : (
            <div className="container text-center">Nothing to display!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
