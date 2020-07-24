const Media = require("../models/media");
const { deleteOne, updateOne } = require("./handlerFactory");

exports.getAllMedia = async (req, res) => {
  const media = await Media.find(req.query);
  const sortedByDate = media.sort((a, b) => b.createdAt - a.createdAt);

  res.send(sortedByDate);
};

exports.getMedia = async (req, res) => {
  let filterObj = {};

  filterObj = req.params.mid;

  try {
    const media = await Media.findOne(filterObj);
    res.status(201).json({
      status: "success",
      data: { media },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createMedia = async (req, res) => {
  const { title, videoId } = req.body;

  try {
    const media = await Media.create({ title, videoId });
    res.status(201).json({
      status: "success",
      data: { media },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateMedia = updateOne(Media);
exports.deleteMedia = deleteOne(Media);
