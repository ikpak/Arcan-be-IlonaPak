const express = require("express");
const router = express.Router();

const Event = require("../models/event")

const {
  getAllEvents,
  getEvent,
  createEvent
} = require("../controllers/eventController");

router.route("/").get(getAllEvents).post(createEvent);

router.route(":eid").get(getEvent).delete(async(req, res) => {
    const result = await Event.deleteOne({ _eid: req.params.id })
    res.send(result)
});

module.exports = router;
