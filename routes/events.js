const express = require("express");
const router = express.Router();

const Event = require("../models/event")

const {
  getEvents,
  createEvent,
} = require("../controllers/eventController");

router.route("/").get(getEvents).post(createEvent);

router.delete("/:eid", async(req, res) => {
    const result = await Event.deleteOne({ _eid: req.params.id })
    res.send(result)
});
module.exports = router;
