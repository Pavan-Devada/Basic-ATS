const express = require("express");
const { getJobs, getSingleJob, addJob, updateJob, deleteJob } = require("../controllers/jobControllers");

const router = express.Router();



//GET jobs
router.get("/", getJobs);

//GET particular job
router.get("/:id", getSingleJob)

//POST add a new job
router.post("/", addJob)

// PUT updating the existing jobs
router.put("/:id", updateJob)

//DELETE deleting the job
router.delete("/:id", deleteJob)

module.exports = router;