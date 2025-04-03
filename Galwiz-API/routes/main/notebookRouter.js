const express = require("express");
const router = express.Router();
const notebookController = require("../../controllers/main/notebookController");
const userAuthController = require("../../controllers/user/userAuthController");

router
  .route("/create/notebook")
  .post(userAuthController.protect, notebookController.createNotebook);

router
  .route("/get/notebook/:limit/:page")
  .get(notebookController.getNotebookWithLimit);

router.route("/search/notebook/:query").get(notebookController.searchNoteBook);

router
  .route("/get/user/notebook/:limit/:page")
  .get(userAuthController.protect, notebookController.getUserNotebookWithLimit);

router
  .route("/comment/notebook")
  .post(userAuthController.protect, notebookController.commentOnNotebook);

router
  .route("/get/notebook/:notebookId")
  .get(notebookController.getSingleNoteBook);
router
  .route("/like/notebook/:notebookId")
  .get(userAuthController.protect, notebookController.likeNotebook);

router
  .route("/get/Biology/notebook/:limit/:page")
  .get(notebookController.getBiologyNotebookWithLimit);

router

  .route("/get/notebook/comment/:notebookId/:limit/:page")
  .get(notebookController.getSingleNoteBookMoreComment);

router
  .route("/get/BiomedicalScience/notebook/:limit/:page")
  .get(notebookController.getBiomedicalScienceNotebookWithLimit);
router
  .route("/get/Chemistry/notebook/:limit/:page")
  .get(notebookController.getChemistryNotebookWithLimit);
router
  .route("/get/ComputationalBiology/notebook/:limit/:page")
  .get(notebookController.getComputationalBiologyNotebookWithLimit);
router
  .route("/get/ComputerScience/notebook/:limit/:page")
  .get(notebookController.getComputerScienceNotebookWithLimit);
router
  .route("/get/ExperimentalDesignAndStudies/notebook/:limit/:page")
  .get(notebookController.getExperimentalDesignAndStudiesNotebookWithLimit);
router
  .route("/get/Informatics/notebook/:limit/:page")
  .get(notebookController.getInformaticsNotebookWithLimit);
router
  .route("/get/LaboratoryTechnqiues/notebook/:limit/:page")
  .get(notebookController.getLaboratoryTechnqiuesNotebookWithLimit);
router
  .route("/get/LiteratureAndLanguage/notebook/:limit/:page")
  .get(notebookController.getLiteratureAndLanguageNotebookWithLimit);
router
  .route("/get/Mathematics/notebook/:limit/:page")
  .get(notebookController.getMathematicsNotebookWithLimit);
router
  .route("/get/Medicine/notebook/:limit/:page")
  .get(notebookController.getMedicineNotebookWithLimit);
router
  .route("/get/Omics/notebook/:limit/:page")
  .get(notebookController.getOmicsNotebookWithLimit);
router
  .route("/get/Physics/notebook/:limit/:page")
  .get(notebookController.getPhysicsNotebookWithLimit);

module.exports = router;
