const Outreachy = require("../../models/main/outreachyModal");
const multer = require("multer");
const InterMileHtml = require("../../models/main/interMileHtmlModel");
exports.updateOutreachyTitle = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    outreachy.dateTitle = req.body.outreachyTitle;
    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterOneData = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const { name, organization, project, conclusion } = req.body;
    outreachy.inter1.name = name;
    outreachy.inter1.organization = organization;
    outreachy.inter1.project = project;
    outreachy.inter1.conclusion = conclusion;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter One data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterTwoData = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const { name, organization, project, conclusion } = req.body;
    outreachy.inter2.name = name;
    outreachy.inter2.organization = organization;
    outreachy.inter2.project = project;
    outreachy.inter2.conclusion = conclusion;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Two data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterThreeData = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const { name, organization, project, conclusion } = req.body;
    outreachy.inter3.name = name;
    outreachy.inter3.organization = organization;
    outreachy.inter3.project = project;
    outreachy.inter3.conclusion = conclusion;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Three data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getMile = async (req, res) => {
  try {
    const mile = await InterMileHtml.findById(req.params.mileId);

    res.status(201).json({
      status: "success",
      message: "get Mile  successfully",
      mile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.getOutreachy = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne().populate({
      path: "inter1",
      populate: {
        path: "mile",
        populate: {
          path: "htmlData",
          model: "InterMileHtml",
        },
      },
    });
    if (outreachy) {
      res.status(200).json({
        status: "success",
        message: "Outreachy data  successfully",
        outreachy,
      });
    } else {
      const outreachy = await Outreachy.create({
        dateTitle: "Outreachy 2022 (May - August)",
        inter1: {
          name: "Name",
          organization: "organization",
          project: "project",
          photo: "default.png",
          conclusion: "sad",
        },
        inter2: {
          name: "Name",
          organization: "organization",
          project: "project",
          photo: "default.png",
          conclusion: "sad",
        },
        inter3: {
          name: "Name",
          organization: "organization",
          project: "project",
          photo: "default.png",
          conclusion: "sad",
        },
      });
      res.status(201).json({
        status: "success",
        message: "Outreachy created   successfully",
        outreachy,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterOneImage = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    outreachy.inter1.photo = req.file.filename;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter one photo updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterTwoImage = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    outreachy.inter2.photo = req.file.filename;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter two photo updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.updateOutreachyInterThreeImage = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    outreachy.inter2.photo = req.file.filename;

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Three photo updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "public/uploads/user/image";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${Date.now().toLocaleString()}.${ext}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
});

exports.uploadImage = imageUpload.single("image");

exports.addOutreachyInterOneMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    const htmlData = await InterMileHtml.create({
      htmlData: req.body.htmlData,
    });
    outreachy.inter1.mile.push(htmlData._id);

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter One data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.addOutreachyInterTwoMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    const htmlData = await InterMileHtml.create({
      htmlData: req.body.htmlData,
    });
    outreachy.inter2.mile.push(htmlData._id);

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Two data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.addOutreachyInterThreeMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();

    const htmlData = await InterMileHtml.create({
      htmlData: req.body.htmlData,
    });
    outreachy.inter3.mile.push(htmlData._id);

    await outreachy.save();
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Three data updated successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

// delete html data
exports.removeOutreachyInterOneMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const htmlDataId = req.params.htmlDataId;
    const htmlData = await InterMileHtml.findById(htmlDataId);
    outreachy.inter1.mile.pull(htmlData._id);

    await outreachy.save();
    await InterMileHtml.findOneAndDelete(htmlDataId);
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter One data deleted successfully",
      outreachy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.removeOutreachyInterTwoMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const htmlDataId = req.params.htmlDataId;
    const htmlData = await InterMileHtml.findById(htmlDataId);
    outreachy.inter2.mile.pull(htmlData._id);

    await outreachy.save();
    await InterMileHtml.findOneAndDelete(htmlDataId);
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter two data deleted successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.removeOutreachyInterThreeMile = async (req, res) => {
  try {
    const outreachy = await Outreachy.findOne();
    const htmlDataId = req.params.htmlDataId;
    const htmlData = await InterMileHtml.findById(htmlDataId);
    outreachy.inter3.mile.pull(htmlData._id);

    await outreachy.save();
    await InterMileHtml.findOneAndDelete(htmlDataId);
    res.status(200).json({
      status: "success",
      message: "Outreachy Inter Three data deleted successfully",
      outreachy,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
