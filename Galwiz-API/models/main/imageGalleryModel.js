const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ImageGallerySchema = new mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ImageGallery = mongoose.model("ImageGallery", ImageGallerySchema);

module.exports = ImageGallery;
