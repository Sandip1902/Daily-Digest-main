const News = require("../models/news.model");
const { validationResult } = require("express-validator");

const fetchAllNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.user.id });
    res.json({ success: true, data: news });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const addNews = async (req, res) => {
  try {
    const { title, description, imageUrl, newsUrl, author, newsDate, source } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() });
    }

    const news = new News({
      title,
      description,
      urlToImage: imageUrl,
      url: newsUrl,
      author,
      publishedAt: newsDate,
      source: { name: source },
      user: req.user.id,
    });

    const savedNews = await news.save();
    res.json({ success: true, msg: "News added to bookmark" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

const deleteNews = async (req, res) => {
  try {
    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, msg: "Not found" });
    }

    if (news.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, msg: "Not Allowed" });
    }

    news = await News.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "News removed from bookmark" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  fetchAllNews,
  addNews,
  deleteNews,
};
