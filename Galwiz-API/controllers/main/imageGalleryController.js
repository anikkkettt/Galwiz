const ImageGallery = require("../../models/main/imageGalleryModel");
const multer = require("multer");

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

exports.createImageGallery = async (req, res) => {
  try {
    const name = JSON.stringify(req.body.name);
    const alt = JSON.stringify(req.body.alt);
    const tag = JSON.stringify(req.body.tag);
    const imageGallery = await ImageGallery.create({
      name,
      alt,
      tag,
      src: `/api/v1/user/image/${req.file.filename}`,
    });
    res.status(201).json({
      status: "success",
      message: "imageGallery created successfully",
      imageGallery,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

exports.getImageGallery = async (req, res) => {
  try {
    const result = await ImageGallery.find();
    res.status(200).json({
      status: "success",
      message: "imageGallery created successfully",
      result,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
