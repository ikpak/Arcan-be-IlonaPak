const express = require("express");
const router = express.Router();

const Media = require("../models/media");

const {
  getAllMedia,
  getMedia,
  createMedia,
  deleteMedia,
  updateMedia
} = require("../controllers/mediaController");

router.route("/").get(getAllMedia).post(createMedia);

router
  .route("/:mid")
  .get(getMedia)
  .delete(deleteMedia)
  .patch(updateMedia)

module.exports = router