const express = require("express");
const router = express.Router();
const { getAllNews } = require("../controllers/data.controller");

router.get("/fetchallnews", getAllNews);

module.exports = router;
