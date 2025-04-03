const express = require("express");
const router = express.Router();
const userAuthController = require("../../controllers/user/userAuthController");

router
  .route("/signup")
  .post(userAuthController.userSignUp)
  .patch(userAuthController.verifyEmail)
  .put(userAuthController.resendOtp);
router
  .route("/login")
  .post(userAuthController.userLogin)
  .put(userAuthController.resendOtp)
  .patch(userAuthController.verifyEmail);

router
  .route("/profile/update/photo")
  .post(
    userAuthController.protect,
    userAuthController.uploadImage,
    userAuthController.uploadUserImage
  );

router
  .route("/profile/update/name")
  .post(userAuthController.protect, userAuthController.updateName);

router
  .route("/logout")
  .get(userAuthController.protect, userAuthController.logOut);

router
  .route("/profile/update/password")
  .post(userAuthController.protect, userAuthController.updatePassword);

router
  .route("/forget/password")
  .post(userAuthController.forgetPassword)
  .put(userAuthController.changePasswordOTP)
  .patch(userAuthController.changePassword);

router
  .route("/dashboard")
  .get(userAuthController.protect, userAuthController.dashboard);
module.exports = router;
