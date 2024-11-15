const express = require("express");
const connectToMongo = require("./database/db");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

connectToMongo();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/news", require("./routes/news.route"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
