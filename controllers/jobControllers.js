const fs = require("fs");
const path = require("path")

//reading the job file
fs.readFile(path.join(__dirname, "../JSON data/jobs.json"), "Utf8", (err, data) => {
    if (err) {
        throw error;
    }
    jobData = JSON.parse(data);
})

//@desc get all jobs
//@route GET /customers/CustomerID/job
const getJobs = (req, res) => {
    //GET limited jobs
    const limitedJobs = Number(req.query.limit);
    if (!isNaN(limitedJobs) && limitedJobs > 0) {
        return res.status(200).json(jobData.slice(0, limitedJobs));
    }
    // GET all jobs 
    res.status(200).json(jobData);
}

//@desc get single job
//@route GET /customers/CustomerID/job/id
const getSingleJob = (req, res, next) => {
    const id = Number(req.params.id);
    const records = jobData.filter((record) => record.job_id === id)
    if (records.length > 0) {
        return res.status(200).json(records);
    }
    const error = new Error("record not found");
    error.status = 404;
    return next(error);;
}

//@desc create new job
//@route POST /customers/CustomerID/job/id
const addJob = (req, res, next) => {
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
        const error = new Error("required information is missing");
        error.status = 400;
        return next(error);
    }
    jobData.push(newJob);
    res.status(201).json(jobData[jobData.length - 1]);
}

//@desc update job
//@route PUT /customers/CustomerID/job/id
const updateJob = (req, res, next) => {
    const id = Number(req.params.id);
    const records = jobData.find((record) => record.job_id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    for (let key in req.body) {
        records[key] = req.body[key];
    }
    res.status(200).json(jobData)
}

//@desc delete job
//@route DELETE /customers/CustomerID/job/id
const deleteJob = (req, res, next) => {
    const id = Number(req.params.id);
    const records = jobData.find((record) => record.job_id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    jobData = jobData.filter(record => record.job_id !== id);
    res.status(200).json(jobData);
}

module.exports = { getJobs, getSingleJob, addJob, updateJob, deleteJob }