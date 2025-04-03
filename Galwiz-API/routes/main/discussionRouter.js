const express = require("express");
const router = express.Router();
const discussionController = require("../../controllers/main/discussionController");
const userAuthController = require("../../controllers/user/userAuthController");

router
  .route("/reply/comment")
  .post(userAuthController.protect, discussionController.replyOnDiscussion);

router
  .route("/like/comment/:discussionId")
  .get(userAuthController.protect, discussionController.likeOnDiscussion);

router
  .route("/like/reply/comment/:replyId")
  .get(userAuthController.protect, discussionController.likeReplyOnDiscussion);

module.exports = router;
