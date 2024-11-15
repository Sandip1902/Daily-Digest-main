import React, { useEffect, useState } from "react";
import NavBar from "./components/common/NavBar";
import News from "./pages/News";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Bookmarked from "./pages/Bookmarked";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Email from "./pages/Email";
import Verified from "./pages/Verified";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div
      className={darkMode === true ? "bg-dark" : ""}
      style={{ minHeight: "100vh" }}
    >
      <NavBar
        loggedIn={loggedIn}
        darkMode={darkMode}
        setLoggedIn={setLoggedIn}
        setDarkMode={setDarkMode}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="general"
              key="general"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/business"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="business"
              key="business"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="entertainment"
              key="entertainment"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/general"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="general"
              key="general"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/health"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="health"
              key="health"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/science"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="science"
              key="science"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="sports"
              key="sports"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              darkMode={darkMode}
              category="technology"
              key="technology"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/bookmark"
          element={
            <Bookmarked
              setProgress={setProgress}
              darkMode={darkMode}
              category="Bookmark"
              key="Bookmark"
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<Login darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
        <Route
          exact
          path="/signup"
          element={<SignUp darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
        <Route
          exact
          path="/email"
          element={<Email darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
        <Route
          exact
          path="/verify/:id/:code"
          element={<Verified darkMode={darkMode} setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </div>
  );
};

export default App;
