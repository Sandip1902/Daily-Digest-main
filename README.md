# Daily Digest News App

Welcome to the Daily Digest News App! This application is built using the MERN stack (MongoDB, Express, React, and Node.js) and provides a platform to fetch the latest and live news from various sources using the News API. The app offers several features to enhance your news reading experience.

## Features

### 1. Fetch Latest and Live News

The Daily Digest utilizes the News API to fetch the most up-to-date news articles from reliable sources. It provides real-time access to news articles from around the world.

### 2. Categories

The app offers a wide range of news categories to cater to different interests. You can explore news articles from the following categories:

- General
- Business
- Entertainment
- Health
- Science
- Sports
- Technology

Simply select a category, and the app will display relevant news articles.

### 3. Login and Sign Up

To access personalized features and enhance your experience, the app includes a login and sign-up page. Users can create an account, log in securely, and enjoy additional functionalities.

### 4. Bookmark News

Found an interesting article that you want to read later? No problem! The Daily Digest App allows you to bookmark your favorite news articles. You can easily save them and access them later from your bookmarks section.

### 5. Light and Dark Mode

Customize your reading experience with the light and dark mode options. Whether you prefer a light background for a clean look or a dark background for better readability at night, the app has you covered. Switch between modes effortlessly to suit your preferences.

## Prerequisites

To run the Daily Digest App locally, you need to have the following software installed on your machine:

- Node.js
- MongoDB

## Installation

Follow these steps to install and run the Daily Digest News App:

1. Clone the repository:

```
git clone https://github.com/Sandip1902/Daily-Digest-main.git
```

2. Change into the project directory:

```
cd Daily-Digest
```

3. Install the dependencies for both the server and client:

```
npm install
cd backend && npm install
```

4. Configure the environment variables:

- Create a `.env` file in the `root` directory.
- Obtain an API key from [News API](https://newsapi.org/) by signing up for an account.
- Add the following variables to the `.env` file:

  - `REACT_APP_NEWS_API` - Your API key obtained from the News API.
  - `REACT_APP_URL` - The URI for your backend calls.

- Create a `.env` file in the backend directory.
- Add the following variables to the `.env` file:

  - `PORT` - The port on which your your server will run.
  - `SECRET` - Your secret key for JWT authentication.
  - `CONNECTION_STRING` - The URI for your MongoDB database.

5. Start the development server:

In the `root` directory, run `npm start` to start the Node.js server.
In the `backend` directory, run `npm start` to start the React development server.
Open your browser and navigate to `http://localhost:3000` to access the News App.

 
## Acknowledgments

The News App extends its gratitude to the following resources and individuals:

- [CodeWithHarry](https://codewithharry.com/): For their comprehensive tutorials and guidance on frontend development. Their educational content was instrumental in building the frontend of the News App.

- [Bootstrap](https://getbootstrap.com/): For providing an extensive collection of CSS and JavaScript components. Bootstrap played a crucial role in designing and styling the News App, making it visually appealing and responsive.

- The developers of the News API: For providing a reliable and efficient API that allows the News App to fetch the latest news articles from various sources. The app's functionality heavily relies on the News API's robust infrastructure.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
