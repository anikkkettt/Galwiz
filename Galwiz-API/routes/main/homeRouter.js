const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/main/homeController");

const feedbackController = require("../../controllers/main/feedbackController");
const subscribeController = require("../../controllers/main/subscribeController");

router.route("/home/total/topic").get(homeController.totalTopic);
router.route("/subscribe").post(subscribeController.createSubscribe);
router.route("/feedback").post(feedbackController.createFeedBack);

module.exports = router;
