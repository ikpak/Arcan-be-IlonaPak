const News = require("../models/news");
const { deleteOne, updateOne } = require("./handlerFactory")

exports.getAllNews = async (req, res) => {
  const news = await News.find(req.query);

  const sortedByDate = news.sort((a, b) => b.createdAt - a.createdAt);

  res.send(sortedByDate);
};

exports.getNews = async (req, res) => {
  let filterObj = {};

  try {
    filterObj._id = req.params.nid;
    const news = await News.findOne(filterObj);
    res.status(201).json({
      status: "success",
      data: { news },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNews = async (req, res) => {
  const { title, category, description, imageUrl } = req.body;

  try {
    const news = await News.create({ title, category, description, imageUrl });
    res.status(201).json({
      status: "success",
      data: { news },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateNews = updateOne(News)
exports.deleteNews = deleteOne(News)