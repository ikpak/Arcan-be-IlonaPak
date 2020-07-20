const express = require("express")
const router = express.Router()

const News = require("../models/news")

const { getAllNews, getNews, createNews } = require("../controllers/newsController")

router.route("/").get(getAllNews).post(createNews)

router.route("/:nid").get(getNews).delete(async(req, res) => {
    const result = await News.deleteOne({ _nid: req.params.id })
    res.send(result)
})

module.exports = router