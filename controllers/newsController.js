const News = require("../models/news")

exports.getAllNews = async(req, res) => {
    const news = await News.find(req.query)

    res.send(news)
}

exports.getNews = async(req, res) => {
    const news = await News.findOne(req.query)

    res.send(news)
}

exports.createNews = async(req, res) => {
    const { title, category, description, imageUrl } = req.body

    try {
        const news = await News.create({ title, category, description, imageUrl })
        res.status(201).json({
            status: "success",
            data: { news }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}