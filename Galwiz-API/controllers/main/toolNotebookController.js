const ToolNoteBook = require("../../models/main/toolNotebookModel");
const User = require("../../models/user/userModel");
const Discussion = require("../../models/main/discussionModel");

exports.createToolNotebook = async (req, res) => {
  try {
    const {
      noteBookLink,
      githubLink,
      repoLink,
      description,
      subTopic,
      topic,
      title,
    } = req.body;
    const user = req.user;
    const toolNotebook = await ToolNoteBook.create({
      noteBookLink,
      githubLink,
      repoLink,
      description,
      subTopic,
      topic,
      title,
      user: user._id,
    });
    res.status(201).json({
      status: "success",
      message: "Tool Notebook created successfully",
      toolNotebook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.searchToolNoteBook = async (req, res) => {
  try {
    const query1 = capitalizeFirstLetter(req.params.query);
    const query2 = req.params.query;
    // console.log(query);

    const toolNoteBook = await ToolNoteBook.find({
      $or: [
        { title: { $regex: `${query1}` } },
        { title: { $regex: `${query2}` } },
      ],
    }).limit(20);
    res
      .status(200)
      .json({ status: "success", message: "Search Data", toolNoteBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getSingleToolNoteBookMoreComment = async (req, res) => {
  try {
    const { toolNotebookId, limit, page } = req.params;
    const skip = page * limit - limit;
    const notebook = await NoteBook.findById(toolNotebookId)
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
      toolNotebook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.likeToolNotebook = async (req, res) => {
  try {
    const { toolNotebookId } = req.params;
    const user = req.user;
    const toolNotebook = await ToolNoteBook.findById(toolNotebookId);
    if (toolNotebook.like.some((e) => e.equals(user._id))) {
      toolNotebook.like.pull(user._id);
      await toolNotebook.save();
      res.status(200).json({
        status: "success",
        message: "ToolNotebook dislike successfully",
      });
    } else {
      toolNotebook.like.push(user._id);
      await toolNotebook.save();
      res.status(201).json({
        status: "success",
        message: "ToolNotebook like successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getToolNotebookWithLimit = async (req, res) => {
  try {
    // const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    // const toolNotebook = await ToolNoteBook.find({ approved: { $eq: true } })
    const toolNotebook = await ToolNoteBook.find({ approved: { $eq: true } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    // const totalToolNoteBook = await ToolNoteBook.count({
    //   approved: { $eq: true },
    // });
    const totalToolNoteBook = await ToolNoteBook.count({
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "ToolNotebook created success",
      toolNotebook,
      totalToolNoteBook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUserToolNotebookWithLimit = async (req, res) => {
  try {
    const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolNotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      user: { $eq: user._id },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      user: { $eq: user._id },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "ToolNotebook created success",
      toolNotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.commentOnToolNotebook = async (req, res) => {
  try {
    const user = req.user;
    const { comment, toolNotebookId } = req.body;
    const toolNotebook = await ToolNoteBook.findById(toolNotebookId);
    const newDiscussion = await Discussion.create({
      comment,
      user: user._id,
    });
    toolNotebook.discussion.push(newDiscussion._id);
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
    await toolNotebook.save();

    res.status(201).json({
      status: "created ",
      message: "Discussion created successfully",
      discussion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSingleToolNoteBook = async (req, res) => {
  try {
    const { toolNotebookId } = req.params;
    const toolNotebook = await ToolNoteBook.findById(toolNotebookId)
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
      message: "single ToolNoteBook",
      toolNotebook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getBiologyToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Biology" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Biology" },
      approved: { $eq: true },
      // approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getBiomedicalScienceToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Biomedical Science" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Biomedical Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getChemistryToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Chemistry" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Chemistry" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputationalBiologyToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Computational Biology" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Computational Biology" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputerScienceToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Computer Science" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Computer Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getExperimentalDesignAndStudiesToolNotebookWithLimit = async (
  req,
  res
) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Experimental design and studies" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Experimental design and studies" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getInformaticsToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      approved: { $eq: true },
      topic: { $eq: "Informatics" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Informatics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLaboratoryTechnqiuesToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Laboratory Technqiues" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Laboratory Technqiues" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLiteratureAndLanguageToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMathematicsToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMedicineToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getOmicsToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getPhysicsToolNotebookWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const toolnotebook = await ToolNoteBook.find({
      topic: { $eq: "Physics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Physics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "Toolnotebook created success",
      toolnotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.approveToolNotebook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const toolNoteBook = await ToolNoteBook.findById(id);
    toolNoteBook.approved = true;
    await toolNoteBook.save();
    res.status(200).json({
      status: "success",
      toolNoteBook,
      message: "ToolNoteBook approved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.getAllUnApprovedtoolNotebookList = async (req, res) => {
  try {
    const toolNotebook = await ToolNoteBook.find({
      approved: { $eq: false },
    }).sort({ _id: -1 });

    const totalUserToolNoteBook = await ToolNoteBook.count({
      topic: { $eq: "Physics" },
      approved: { $eq: false },
    });

    res.status(200).json({
      status: "success",
      toolNotebook,
      totalUserToolNoteBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
