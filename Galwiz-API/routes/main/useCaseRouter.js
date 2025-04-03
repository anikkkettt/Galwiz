const express = require("express");
const router = express.Router();
const useCaseController = require("../../controllers/main/useCaseController");
const userAuthController = require("../../controllers/user/userAuthController");

router
  .route("/create/useCase")
  .post(userAuthController.protect, useCaseController.createUseCase);

router.route("/search/useCase/:query").get(useCaseController.searchUseCase);

router
  .route("/create/useCase/:useCaseId")
  .patch(
    userAuthController.protect,
    useCaseController.uploadImage,
    useCaseController.uploadUseCaseImage
  );

router
  .route("/get/useCase/comment/:useCaseId/:limit/:page")
  .get(useCaseController.getSingleUseCaseMoreComment);

router
  .route("/comment/useCase")
  .post(userAuthController.protect, useCaseController.commentOnUseCase);

router
  .route("/get/topic/useCase/:limit/:page")
  .post(useCaseController.getTopicCaseWithLimit);

router
  .route("/get/UseCase/:limit/:page")
  .get(useCaseController.getUseCaseWithLimit);

router
  .route("/get/user/UseCase/:limit/:page")
  .get(userAuthController.protect, useCaseController.getUserUseCaseWithLimit);
router.route("/get/UseCase/:useCaseId").get(useCaseController.getSingleUseCase);

router
  .route("/like/UseCase/:useCaseId")
  .get(userAuthController.protect, useCaseController.likeUseCase);

router
  .route("/get/Biology/UseCase/:limit/:page")
  .get(useCaseController.getBiologyUseCaseWithLimit);

router
  .route("/get/BiomedicalScience/UseCase/:limit/:page")
  .get(useCaseController.getBiomedicalScienceUseCaseWithLimit);
router
  .route("/get/Chemistry/UseCase/:limit/:page")
  .get(useCaseController.getChemistryUseCaseWithLimit);
router
  .route("/get/ComputationalBiology/UseCase/:limit/:page")
  .get(useCaseController.getComputationalBiologyUseCaseWithLimit);
router
  .route("/get/ComputerScience/UseCase/:limit/:page")
  .get(useCaseController.getComputerScienceUseCaseWithLimit);
router
  .route("/get/ExperimentalDesignAndStudies/UseCase/:limit/:page")
  .get(useCaseController.getExperimentalDesignAndStudiesUseCaseWithLimit);
router
  .route("/get/Informatics/UseCase/:limit/:page")
  .get(useCaseController.getInformaticsUseCaseWithLimit);
router
  .route("/get/LaboratoryTechnqiues/UseCase/:limit/:page")
  .get(useCaseController.getLaboratoryTechnqiuesUseCaseWithLimit);
router
  .route("/get/LiteratureAndLanguage/UseCase/:limit/:page")
  .get(useCaseController.getLiteratureAndLanguageUseCaseWithLimit);
router
  .route("/get/Mathematics/UseCase/:limit/:page")
  .get(useCaseController.getMathematicsUseCaseWithLimit);
router
  .route("/get/Medicine/UseCase/:limit/:page")
  .get(useCaseController.getMedicineUseCaseWithLimit);
router
  .route("/get/Omics/UseCase/:limit/:page")
  .get(useCaseController.getOmicsUseCaseWithLimit);
router
  .route("/get/Physics/UseCase/:limit/:page")
  .get(useCaseController.getPhysicsUseCaseWithLimit);
module.exports = router;

module.exports = router;
