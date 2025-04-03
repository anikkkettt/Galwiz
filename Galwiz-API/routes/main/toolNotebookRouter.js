const express = require("express");
const router = express.Router();
const toolNotebookController = require("../../controllers/main/toolNotebookController");
const userAuthController = require("../../controllers/user/userAuthController");

router
  .route("/create/toolNotebook")
  .post(userAuthController.protect, toolNotebookController.createToolNotebook);

router
  .route("/search/toolNotebook/:query")
  .get(toolNotebookController.searchToolNoteBook);

router
  .route("/get/toolNotebook/comment/:toolNotebookId/:limit/:page")
  .get(toolNotebookController.getSingleToolNoteBookMoreComment);

router
  .route("/comment/toolNotebook")
  .post(
    userAuthController.protect,
    toolNotebookController.commentOnToolNotebook
  );

router
  .route("/get/toolNotebook/:limit/:page")
  .get(toolNotebookController.getToolNotebookWithLimit);

router
  .route("/get/user/toolNotebook/:limit/:page")
  .get(
    userAuthController.protect,
    toolNotebookController.getUserToolNotebookWithLimit
  );
router
  .route("/get/toolNotebook/:toolNotebookId")
  .get(toolNotebookController.getSingleToolNoteBook);

router
  .route("/like/toolNotebook/:toolNotebookId")
  .get(userAuthController.protect, toolNotebookController.likeToolNotebook);

router
  .route("/get/Biology/toolNotebook/:limit/:page")
  .get(toolNotebookController.getBiologyToolNotebookWithLimit);

router
  .route("/get/BiomedicalScience/toolNotebook/:limit/:page")
  .get(toolNotebookController.getBiomedicalScienceToolNotebookWithLimit);
router
  .route("/get/Chemistry/toolNotebook/:limit/:page")
  .get(toolNotebookController.getChemistryToolNotebookWithLimit);
router
  .route("/get/ComputationalBiology/toolNotebook/:limit/:page")
  .get(toolNotebookController.getComputationalBiologyToolNotebookWithLimit);
router
  .route("/get/ComputerScience/toolNotebook/:limit/:page")
  .get(toolNotebookController.getComputerScienceToolNotebookWithLimit);
router
  .route("/get/ExperimentalDesignAndStudies/toolNotebook/:limit/:page")
  .get(
    toolNotebookController.getExperimentalDesignAndStudiesToolNotebookWithLimit
  );
router
  .route("/get/Informatics/toolNotebook/:limit/:page")
  .get(toolNotebookController.getInformaticsToolNotebookWithLimit);
router
  .route("/get/LaboratoryTechnqiues/toolNotebook/:limit/:page")
  .get(toolNotebookController.getLaboratoryTechnqiuesToolNotebookWithLimit);
router
  .route("/get/LiteratureAndLanguage/toolNotebook/:limit/:page")
  .get(toolNotebookController.getLiteratureAndLanguageToolNotebookWithLimit);
router
  .route("/get/Mathematics/toolNotebook/:limit/:page")
  .get(toolNotebookController.getMathematicsToolNotebookWithLimit);
router
  .route("/get/Medicine/toolNotebook/:limit/:page")
  .get(toolNotebookController.getMedicineToolNotebookWithLimit);
router
  .route("/get/Omics/toolNotebook/:limit/:page")
  .get(toolNotebookController.getOmicsToolNotebookWithLimit);
router
  .route("/get/Physics/toolNotebook/:limit/:page")
  .get(toolNotebookController.getPhysicsToolNotebookWithLimit);

module.exports = router;
