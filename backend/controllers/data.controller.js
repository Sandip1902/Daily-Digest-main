const fs = require("fs");

const getAllNews = async (req, res) => {
  try {
    let count = 0;
    const news = fs.readFileSync(
      `./data/${req.query.category}.json`,
      "utf8",
      (err, data) => {
        if (err) throw err;
        return data;
      }
    );
    if (req.query.count) {
      count = Number(req.query.count);
    }
    const parsedData = JSON.parse(news);
    const fiveData = parsedData.articles.slice(count * 5, count * 5 + 5);
    parsedData.articles = fiveData;
    res.json(parsedData);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  getAllNews,
};
