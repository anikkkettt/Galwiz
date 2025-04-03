const express = require("express");
const router = express.Router();
const workFlowController = require("../../controllers/main/workFlowController");

router.route("/create/workflow").post(workFlowController.createWorkFlow);
router
  .route("/get/workFlow/:limit/:page")
  .get(workFlowController.getWorkFlowWithLimit);

router.route("/search/workFlow/:query").get(workFlowController.searchWorkFlow);

module.exports = router;
