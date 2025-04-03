const express = require("express");
const router = express.Router();
const outreachyController = require("../../controllers/main/outreachyController");
const adminAuthController = require("../../controllers/admin/adminAuthController");

router.route("/outreachy").get(outreachyController.getOutreachy);

router
  .route("/outreachy/update/title")
  .post(adminAuthController.protect, outreachyController.updateOutreachyTitle);

router
  .route("/outreachy/update/inter1")
  .post(
    adminAuthController.protect,
    outreachyController.updateOutreachyInterOneData
  );

router
  .route("/outreachy/update/inter2")
  .post(
    adminAuthController.protect,
    outreachyController.updateOutreachyInterTwoData
  );

router
  .route("/outreachy/update/inter3")
  .post(
    adminAuthController.protect,
    outreachyController.updateOutreachyInterThreeData
  );

router
  .route("/outreachy/update/inter1/image")
  .post(
    adminAuthController.protect,
    outreachyController.uploadImage,
    outreachyController.updateOutreachyInterOneImage
  );

router
  .route("/outreachy/update/inter2/image")
  .post(
    adminAuthController.protect,
    outreachyController.uploadImage,
    outreachyController.updateOutreachyInterTwoImage
  );

router
  .route("/outreachy/update/inter3/image")
  .post(
    adminAuthController.protect,
    outreachyController.uploadImage,
    outreachyController.updateOutreachyInterThreeImage
  );

router.route("/outreachy/add/inter1/mile").post(
  // adminAuthController.protect,
  outreachyController.addOutreachyInterOneMile
);

router
  .route("/outreachy/add/inter2/mile")
  .post(
    adminAuthController.protect,
    outreachyController.addOutreachyInterTwoMile
  );

router
  .route("/outreachy/add/inter3/mile")
  .post(
    adminAuthController.protect,
    outreachyController.addOutreachyInterThreeMile
  );

router
  .route("/outreachy/remove/inter1/mile/:htmlDataId")
  .post(
    adminAuthController.protect,
    outreachyController.removeOutreachyInterOneMile
  );

router
  .route("/outreachy/remove/inter2/mile/:htmlDataId")
  .post(
    adminAuthController.protect,
    outreachyController.removeOutreachyInterTwoMile
  );

router
  .route("/outreachy/remove/inter3/mile/:htmlDataId")
  .post(
    adminAuthController.protect,
    outreachyController.removeOutreachyInterThreeMile
  );

router
  .route("/mile/:mileId")
  .get(adminAuthController.protect, outreachyController.getMile);

module.exports = router;
