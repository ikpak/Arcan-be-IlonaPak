const Event = require("../models/event");

exports.getAllEvents = async(req, res) => {
    const events = await Event.find(req.query)

    res.send(events)
}

exports.getEvent = async(req, res) => {
  const event = await Event.findOne(req.query)

  res.send(event)
}

exports.createEvent = async (req, res) => {
  const { date, title, category, description } = req.body;

  try {
    const event = await Event.create({ date, title, category, description });
    res.status(201).json({
        status: "success",
        data: { event }
    })
  } catch (err) {
      res.status(400).json({
          status: "fail",
          message: err
      })
  }
};
