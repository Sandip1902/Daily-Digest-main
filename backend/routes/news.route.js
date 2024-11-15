const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser.middleware");
const { body } = require("express-validator");
const {
  fetchAllNews,
  addNews,
  deleteNews,
} = require("../controllers/news.controller");

// Route 1: Get all bookmarked news
router.get("/fetchallnews", fetchuser, fetchAllNews);

// Route 2: Add a news
router.post(
  "/addnews",
  fetchuser,
  [body("title", "Title cannot be blank").exists()],
  addNews
);

router.delete("/deletenews/:id", fetchuser, deleteNews);

module.exports = router;
