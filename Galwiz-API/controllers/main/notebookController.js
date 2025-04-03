const User = require("../../models/user/userModel");
const NoteBook = require("../../models/main/notebookModel");
const Discussion = require("../../models/main/discussionModel");
const DiscussionReply = require("../../models/main/discussionReplyModel");

exports.createNotebook = async (req, res) => {
  try {
    const { githubLink, notebookLink, description, subTopic, topic, title } =
      req.body;
    const user = req.user;
    const notebook = await NoteBook.create({
      githubLink,
      notebookLink,
      description,
      subTopic,
      topic,
      title,
      user: user._id,
    });
    res.status(201).json({
      status: "success",
      message: "notebook created successfully",
      notebook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.searchNoteBook = async (req, res) => {
  try {
    const query1 = capitalizeFirstLetter(req.params.query);
    const query2 = req.params.query;
    // console.log(query);

    const noteBook = await NoteBook.find({
      $or: [
        { title: { $regex: `${query1}` } },
        { title: { $regex: `${query2}` } },
      ],
    }).limit(20);
    res
      .status(200)
      .json({ status: "success", message: "Search Data", noteBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.likeNotebook = async (req, res) => {
  try {
    const { notebookId } = req.params;
    const user = req.user;
    const notebook = await NoteBook.findById(notebookId);
    if (notebook.like.some((e) => e.equals(user._id))) {
      notebook.like.pull(user._id);
      await notebook.save();
      res.status(200).json({
        status: "success",
        message: "notebook dislike successfully",
      });
    } else {
      notebook.like.push(user._id);
      await notebook.save();
      res.status(201).json({
        status: "success",
        message: "notebook like successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getNotebookWithLimit = async (req, res) => {
  try {
    // const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    // const notebook = await NoteBook.find({ approved: { $eq: true } })
    const notebook = await NoteBook.find({ approved: { $eq: true } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    // const totalNoteBook = await NoteBook.count({ approved: { $eq: true } });
    const totalNoteBook = await NoteBook.count({ approved: { $eq: true } });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalNoteBook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUserNotebookWithLimit = async (req, res) => {
  try {
    const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      user: { $eq: user._id },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({ user: { $eq: user._id } });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.commentOnNotebook = async (req, res) => {
  try {
    const user = req.user;
    const { comment, notebookId } = req.body;
    const notebook = await NoteBook.findById(notebookId);
    const newDiscussion = await Discussion.create({
      comment,
      user: user._id,
    });
    notebook.discussion.push(newDiscussion._id);
    const discussion = await Discussion.findById(newDiscussion._id)
      .populate({
        path: "user",
      })
      .populate({
        path: "reply",
        options: {
          sort: { _id: +1 },
          populate: {
            path: "user",
          },
        },
      });
    await notebook.save();

    res.status(201).json({
      status: "created ",
      message: "Discussion created successfully",
      discussion,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSingleNoteBook = async (req, res) => {
  try {
    const { notebookId } = req.params;
    const notebook = await NoteBook.findById(notebookId)
      .populate("user")
      .populate({
        path: "discussion",
        options: {
          limit: 2,
          sort: { _id: -1 },
          populate: {
            path: "user",
          },
        },
        populate: {
          path: "reply",
          options: {
            sort: { _id: +1 },
            populate: {
              path: "user",
            },
          },
        },
      });

    res.status(200).json({
      status: "success",
      message: "single NoteBook",
      notebook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSingleNoteBookMoreComment = async (req, res) => {
  try {
    const { notebookId, limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.findById(notebookId)
      .populate("user")
      .populate({
        path: "discussion",
        options: {
          limit: 2,
          skip: skip,
          sort: { _id: -1 },
          populate: {
            path: "user",
          },
        },
        populate: {
          path: "reply",
          options: {
            sort: { _id: +1 },
            populate: {
              path: "user",
            },
          },
        },
      });

    res.status(200).json({
      status: "success",
      message: "single NoteBook",
      notebook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getBiologyNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Biology" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Biology" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getBiomedicalScienceNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Biomedical Science" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Biomedical Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getChemistryNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Chemistry" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Chemistry" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputationalBiologyNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Computational Biology" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Computational Biology" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputerScienceNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Computer Science" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Computer Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getExperimentalDesignAndStudiesNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Experimental Design And Studies" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Experimental Design And Studies" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getInformaticsNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Informatics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Informatics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLaboratoryTechnqiuesNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Laboratory Techniques" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Laboratory Techniques" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLiteratureAndLanguageNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMathematicsNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMedicineNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getOmicsNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getPhysicsNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Physics" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserNoteBook = await NoteBook.count({
      topic: { $eq: "Physics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "notebook created success",
      notebook,
      totalUserNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.unaprovedNoteBook = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.find({
      approved: { $eq: false },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUnapprovedNotebook = await NoteBook.count({
      approved: { $eq: false },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      notebook,
      totalUnapprovedNotebook,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.aproveNoteBookList = async (req, res) => {
  try {
    const noteBook = await NoteBook.findById(req.params.notebookId);
    noteBook.approved = true;
    await noteBook.save();
    res.status(200).json({
      status: "success",
      noteBook,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
