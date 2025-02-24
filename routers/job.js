const express = require("express");
const fs = require("fs");
const path = require("path")
const router = express.Router();

fs.readFile(path.join(__dirname, "../JSON data/jobs.json"), "Utf8", (err, data) => {
    if (err) {
        throw error;
    }
    jobData = JSON.parse(data);
})

//GET jobs
router.get("/", (req, res) => {
    //GET limited users
    const limitedJobs = Number(req.query.limit);
    if (!isNaN(limitedJobs) && limitedJobs > 0) {
        return res.status(200).json(jobData.slice(0, limitedJobs));
    }
    // GET all users 
    res.status(200).json(jobData);
});

//GET particular user
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const records = jobData.filter((record) => record.job_id === id)
    if (records.length > 0) {
        res.status(200).json(records);
    }
    else {
        res.status(404).json({ message: "record not found" });
    }

})

//POST add a new user
router.post("/", (req, res) => {
    const newJob = {
        "job_id": jobData.length + 1,
        "title": req.body.title || "",
        "company": req.body.company || "",
        "location": req.body.location || "",
        "salary_range": req.body.salary_range || "",
        "job_level": req.body.job_level || "",
        "employment_type": req.body.employment_type || "",
        "requirements": req.body.requirements || "",
        "posted_date": req.body.posted_date || "",
        "application_deadline": req.body.application_deadline || ""
    }
    if (newJob.title === "" || newJob.company === "" || newJob.location === "") {
        return res.status(400).json({ message: "required information is missing" });
    }
    jobData.push(newJob);
    res.status(201).json(jobData[jobData.length - 1]);
})

module.exports = router;