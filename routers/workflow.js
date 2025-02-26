const express = require("express");
const { getApplications, getSingleApplication, addWorkflow, updateWorkflow, deleteWorkflow } = require("../controllers/workflowControllers");
const router = express.Router();

//GET applications
router.get("/", getApplications);

//GET particular application
router.get("/:id", getSingleApplication)

//POST add a new application
router.post("/", addWorkflow)

// PUT updating the existing applications
router.put("/:id", updateWorkflow)

//DELETE deleting the application
router.delete("/:id", deleteWorkflow)

module.exports = router;