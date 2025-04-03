const express = require("express");
const router = express.Router();
const imageGalleryController = require("../../controllers/main/imageGalleryController");

router
  .route("/create/gallery")
  .post(
    imageGalleryController.uploadImage,
    imageGalleryController.createImageGallery
  );
router.route("/get/gallery").get(imageGalleryController.getImageGallery);
module.exports = router;
