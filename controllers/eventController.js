const Event = require("../models/event");
const { deleteOne, updateOne } = require("./handlerFactory");

exports.getAllEvents = async (req, res) => {
  const events = await Event.find(req.query);

  res.send(events);
};

exports.getUpcomingEvents = async (req, res) => {
  const events = await Event.find({
    date: { $gt: new Date() },
  });
  res.send(events);
  // "OrderDate" : { "$gt" : { "$date" : "2015-01-01"}}
};

exports.getPastEvents = async (req, res) => {
  const events = await Event.find({
    date: { $lt: new Date() },
  });
  res.send(events);
};

exports.getEvent = async (req, res) => {
  let filterObj = {};

  filterObj = req.params.eid;

  try {
    const event = await Event.findOne(filterObj);
    res.status(201).json({
      status: "success",
      data: { event },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createEvent = async (req, res) => {
  const {
    date,
    startTime,
    endTime,
    title,
    category,
    entrance,
    artists,
    genres,
    description,
    imageUrl,
  } = req.body;

  try {
    const event = await Event.create({
      date,
      startTime,
      endTime,
      title,
      category,
      entrance,
      artists,
      genres,
      description,
      imageUrl,
    });
    res.status(201).json({
      status: "success",
      data: { event },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateEvent = updateOne(Event);
exports.deleteEvent = deleteOne(Event);
