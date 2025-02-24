const express = require("express");
const fs = require("fs");
const path = require("path")
const router = express.Router();

fs.readFile(path.join(__dirname, "../JSON data/applications.json"), "Utf8", (err, data) => {
    if (err) {
        throw error;
    }
    applicationData = JSON.parse(data);
})

//GET jobs
router.get("/", (req, res) => {
    //GET limited users
    const limitedApplications = Number(req.query.limit);
    if (!isNaN(limitedApplications) && limitedApplications > 0) {
        return res.status(200).json(applicationData.slice(0, limitedApplications));
    }
    // GET all users 
    res.status(200).json(applicationData);
});

//GET particular user
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const records = applicationData.filter((record) => record.application_id === id)
    if (records.length > 0) {
        res.status(200).json(records);
    }
    else {
        res.status(404).json({ message: "record not found" });
    }

})

//POST add a new user
router.post("/", (req, res) => {
    const newApplication = {
        "applicant_id": applicationData.length + 1,
        "candidate_id": req.body.candidate_id || "",
        "job_position": req.body.job_position || "",
        "job_type": req.body.job_type || "",
        "application_status": req.body.application_status || "",
        "submission_method": req.body.submission_method || "",
        "submission_date": req.body.submission_date || ""
    }
    if (newApplication.candidate_id === "" || newApplication.job_position === "") {
        return res.status(400).json({ message: "required information is missing" });
    }
    applicationData.push(newApplication);
    res.status(201).json(applicationData[applicationData.length - 1]);
})

module.exports = router;