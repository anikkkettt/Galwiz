const User = require("../../models/user/userModel");
const NoteBook = require("../../models/main/notebookModel");
const Discussion = require("../../models/main/discussionModel");
const DiscussionReply = require("../../models/main/discussionReplyModel");

exports.replyOnDiscussion = async (req, res) => {
  try {
    const user = req.user;
    const { reply, discussionId } = req.body;
    const discussion = await Discussion.findById(discussionId);
    const newDiscussionReply = await DiscussionReply.create({
      reply,
      user: user._id,
    });

    discussion.reply.push(newDiscussionReply._id);

    const discussionReply = await DiscussionReply.findById(
      newDiscussionReply._id
    ).populate({
      path: "user",
    });
    await discussion.save();

    res.status(201).json({
      status: "created ",
      message: "Discussion created successfully",
      discussionReply,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.likeReplyOnDiscussion = async (req, res) => {
  try {
    const user = req.user;
    const { replyId } = req.params;

    const discussionReply = await DiscussionReply.findById(replyId);
    // discussionReply.like, push(user._id);
    // await discussionReply.save();
    // res
    //   .status(200)
    //   .json({ status: "success", message: "Reply liked successfully" });
    if (discussionReply.like.some((e) => e.equals(user._id))) {
      discussionReply.like.pull(user._id);
      await discussionReply.save();
      res.status(200).json({
        status: "success",
        message: "discussionReply dislike successfully",
      });
    } else {
      discussionReply.like.push(user._id);
      await discussionReply.save();
      res.status(201).json({
        status: "success",
        message: "discussionReply like successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.likeOnDiscussion = async (req, res) => {
  try {
    const user = req.user;
    const { discussionId } = req.params;

    const discussion = await Discussion.findById(discussionId);
    // discussion.like, push(user._id);
    // await discussion.save();
    // res
    //   .status(200)
    //   .json({ status: "success", message: "Reply liked successfully" });

    if (discussion.like.some((e) => e.equals(user._id))) {
      discussion.like.pull(user._id);
      await discussion.save();
      res.status(200).json({
        status: "success",
        message: "discussion dislike successfully",
      });
    } else {
      discussion.like.push(user._id);
      await discussion.save();
      res.status(201).json({
        status: "success",
        message: "discussion like successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
