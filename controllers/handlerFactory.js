exports.deleteOne = (Model) => async (req, res) => {
  let filterObj = {};

  if (Model.modelName === "News") {
    filterObj._id = req.params.nid;
  } else if (Model.modelName === "Event") {
    filterObj._id = req.params.eid;
  } else if (Model.modelName === "Media") {
    filterObj._id = req.params.mid;
  }

  try {
    const doc = await Model.findOneAndDelete(filterObj);

    if (!doc) {
      res.status(404).json({
        message: "This item was not found",
      });
    } else {
      res.send({
        message: "Deleted",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOne = (Model) => async (req, res) => {
  let filterObj = {};
  let allows = [];

  if (Model.modelName === "News") {
    filterObj._id = req.params.nid;

    allows = ["title", "category", "description", "imageUrl"];
  } else if (Model.modelName === "Event") {
    filterObj._id = req.params.eid;

    allows = [
      "date",
      "startTime",
      "endTime",
      "title",
      "category",
      "entrance",
      "artists",
      "genres",
      "description",
      "imageUrl",
    ];
  } else if (Model.modelName === "Media") {
    filterObj._id = req.params.mid;

    allows = ["title", "videoId"];
  }
  try {
    const doc = await Model.findOne(filterObj);

    for (const key in req.body) {
      if (allows.includes(key)) {
        doc[key] = req.body[key];
      }
    }
    await doc.save();

    if (!doc) {
      res.status(404).json({
        message: "This item was not found",
      });
    } else {
      res.status(200).json({
        status: "ok",
        data: doc,
      });
    }
  } catch (err) {
    console.log("khoakhoa", err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
