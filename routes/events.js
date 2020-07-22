const express = require("express");
const router = express.Router();

const Event = require("../models/event");

const {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getUpcomingEvents,
  getPastEvents
} = require("../controllers/eventController");

router.route("/").get(getAllEvents).post(createEvent);

router.route("/upcoming").get(getUpcomingEvents)
router.route("/past").get(getPastEvents)

router.route(":eid").get(getEvent).delete(deleteEvent).patch(updateEvent);

module.exports = router;
