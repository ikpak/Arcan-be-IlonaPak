const express = require("express");
const router = express.Router();

const News = require("../models/news");

const {
  getAllNews,
  getNews,
  createNews,
  deleteNews,
  updateNews,
} = require("../controllers/newsController");

router.route("/").get(getAllNews).post(createNews);

router.route("/:nid").get(getNews).delete(deleteNews).patch(updateNews);

module.exports = router;
