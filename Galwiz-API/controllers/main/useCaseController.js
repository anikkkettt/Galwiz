const UseCase = require("../../models/main/useCaseModel");
const Discussion = require("../../models/main/discussionModel");

const multer = require("multer");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "public/uploads/useCase/image";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `useCase-${req.params.useCaseId}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
});

exports.uploadImage = imageUpload.single("image");

exports.uploadUseCaseImage = async (req, res) => {
  try {
    const useCase = await UseCase.findById(req.params.useCaseId);
    useCase.photo = req.file.filename;
    await useCase.save();
    res
      .status(200)
      .json({ status: "success", message: "Use Case is submit successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.createUseCase = async (req, res) => {
  try {
    const {
      workflowLink,
      historyLink,
      repoLink,
      notebookLink,
      invForDiscussion,
      description,
      subTopic,
      topic,
      title,
    } = req.body;
    const user = req.user;
    const useCase = await UseCase.create({
      workflowLink,
      historyLink,
      repoLink,
      notebookLink,
      invForDiscussion,
      description,
      subTopic,
      topic,
      title,
      user: user._id,
    });
    res.status(201).json({
      status: "success",
      message: "useCase created successfully",
      useCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.searchUseCase = async (req, res) => {
  try {
    const query1 = capitalizeFirstLetter(req.params.query);
    const query2 = req.params.query;
    // console.log(query);

    const useCase = await UseCase.find({
      $or: [
        { title: { $regex: `${query1}` } },
        { title: { $regex: `${query2}` } },
      ],
    }).limit(20);
    res
      .status(200)
      .json({ status: "success", message: "Search Data", useCase });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

exports.getSingleUseCaseMoreComment = async (req, res) => {
  try {
    const { useCaseId, limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.findById(useCaseId)
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
      message: "useCase",
      useCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getTopicCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const { useCaseTopic, useCaseSubTopic } = req.body;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: useCaseTopic },
      approved: { $eq: true },
      subTopic: { $eq: useCaseSubTopic },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: useCaseTopic },
      subTopic: { $eq: useCaseSubTopic },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.commentOnUseCase = async (req, res) => {
  try {
    const user = req.user;
    const { comment, useCaseId } = req.body;
    const useCase = await UseCase.findById(useCaseId);
    const newDiscussion = await Discussion.create({
      comment,
      user: user._id,
    });
    useCase.discussion.push(newDiscussion._id);
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
    await useCase.save();

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

exports.likeUseCase = async (req, res) => {
  try {
    const { useCaseId } = req.params;
    const user = req.user;
    const useCase = await UseCase.findById(useCaseId);
    if (useCase.like.some((e) => e.equals(user._id))) {
      useCase.like.pull(user._id);
      await useCase.save();
      res.status(200).json({
        status: "success",
        message: "UseCase dislike successfully",
      });
    } else {
      useCase.like.push(user._id);
      await useCase.save();
      res.status(201).json({
        status: "success",
        message: "UseCase like successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUseCaseWithLimit = async (req, res) => {
  try {
    // const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({ approved: { $eq: true } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUseCase = await UseCase.count({ approved: { $eq: true } });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUseCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getUserUseCaseWithLimit = async (req, res) => {
  try {
    const user = req.user;
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      user: { $eq: user._id },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({ user: { $eq: user._id } });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getSingleUseCase = async (req, res) => {
  try {
    const { useCaseId } = req.params;
    const useCase = await UseCase.findById(useCaseId)
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
      message: "single UseCase",
      useCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getAllUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getBiologyUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      approved: { $eq: true },
      topic: { $eq: "Biology" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Biology" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getBiomedicalScienceUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Biomedical Science" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Biomedical Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getChemistryUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Chemistry" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Chemistry" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputationalBiologyUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Computational Biology" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Computational Biology" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getComputerScienceUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Computer Science" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Computer Science" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getExperimentalDesignAndStudiesUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Experimental design and studies" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Experimental design and studies" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getInformaticsUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Informatics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Informatics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLaboratoryTechnqiuesUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Laboratory Technqiues" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Laboratory Technqiues" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getLiteratureAndLanguageUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Literature and language" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMathematicsUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Mathematics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getMedicineUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Medicine" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getOmicsUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Omics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.getPhysicsUseCaseWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      topic: { $eq: "Physics" },
      approved: { $eq: true },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      topic: { $eq: "Physics" },
      approved: { $eq: true },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
exports.unaprovedUseCase = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const useCase = await UseCase.find({
      approved: { $eq: false },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user");
    const totalUserUseCase = await UseCase.count({
      approved: { $eq: false },
    });
    res.status(200).json({
      status: "success",
      message: "UseCase created success",
      useCase,
      totalUserUseCase,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.aproveUseCaseList = async (req, res) => {
  try {
    const useCase = await UseCase.findById(req.params.useCaseId);
    useCase.approved = true;
    await useCase.save();
    res.status(200).json({
      status: "success",
      useCase,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.getAllUnApprovedUseCaseList = async (req, res) => {
  try {
    const useCase = await UseCase.find({ approved: { $eq: false } }).sort({
      _id: -1,
    });
    res.status(200).json({
      status: "success",
      useCase,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
