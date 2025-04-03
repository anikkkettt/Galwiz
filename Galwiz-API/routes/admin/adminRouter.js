const express = require("express");
const router = express.Router();
const adminAuthController = require("../../controllers/admin/adminAuthController");
const adminController = require("../../controllers/admin/adminController");

const feedbackController = require("../../controllers/main/feedbackController");
const subscribeController = require("../../controllers/main/subscribeController");

const useCaseCotroller = require("../../controllers/main/useCaseController");
const notebook = require("../../controllers/main/notebookController");
const tool_notebook = require("../../controllers/main/toolNotebookController");
const notebookController = require("../../controllers/main/notebookController");
const useCaseController = require("../../controllers/main/useCaseController");
const toolNotebookController = require("../../controllers/main/toolNotebookController");
router
  .route("/user/:limit/:page")
  .get(adminAuthController.protect, adminController.getUserWithLimit);

router
  .route("/totalUser")
  .get(adminAuthController.protect, adminController.getTotalUser);

router
  .route("/feedback/:limit/:page")
  .get(adminAuthController.protect, feedbackController.getFeedBackWithLimit);

router.route("/feedback").get(feedbackController.downloadFeedBack);
router.route("/subscribe").get(subscribeController.downloadSubscribe);

router
  .route("/subscribe/:limit/:page")
  .get(adminAuthController.protect, subscribeController.getSubscribeWithLimit);

router
  .route("/unaproved/usecase/:limit/:page")
  .get(adminAuthController.protect, useCaseCotroller.unaprovedUseCase);

router
  .route("/aprove/usecase/:useCaseId")
  .get(adminAuthController.protect, useCaseCotroller.aproveUseCaseList);

router
  .route("/unaproved/notebook/:limit/:page")
  .get(adminAuthController.protect, notebook.unaprovedNoteBook);

router
  .route("/aprove/noteBook/:notebookId")
  .get(adminAuthController.protect, notebook.aproveNoteBookList);

router
  .route("/get/notebook/:limit/:page")
  .get(adminAuthController.protect, notebookController.getNotebookWithLimit);

router
  .route("/get/UseCase/:limit/:page")
  .get(adminAuthController.protect, useCaseController.getUseCaseWithLimit);

router
  .route("/get/toolNotebook/:limit/:page")
  .get(
    adminAuthController.protect,
    toolNotebookController.getToolNotebookWithLimit
  );

router
  .route("/unaproved/unapproveToolNotebook/:limit/:page")
  .get(
    adminAuthController.protect,
    toolNotebookController.getAllUnApprovedtoolNotebookList
  );

router
  .route("/aprove/toolNotebook/:id")
  .get(adminAuthController.protect, toolNotebookController.approveToolNotebook);

module.exports = router;
