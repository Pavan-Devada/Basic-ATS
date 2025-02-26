const fs = require("fs");
const path = require("path")

// reading the applications
fs.readFile(path.join(__dirname, "../JSON data/applications.json"), "Utf8", (err, data) => {
    if (err) {
        throw error;
    }
    applicationData = JSON.parse(data);
})

//@desc get all applications
//@route GET /customers/CustomerID/workflow
const getApplications = (req, res) => {
    //GET limited applications
    const limitedApplications = Number(req.query.limit);
    if (!isNaN(limitedApplications) && limitedApplications > 0) {
        return res.status(200).json(applicationData.slice(0, limitedApplications));
    }
    // GET all applications 
    res.status(200).json(applicationData);
}

//@desc get single application
//@route GET /customers/CustomerID/workflow/id
const getSingleApplication = (req, res, next) => {
    const id = Number(req.params.id);
    const records = applicationData.filter((record) => record.application_id === id)
    if (records.length > 0) {
        return res.status(200).json(records);
    }
    const error = new Error("record not found");
    error.status = 404;
    return next(error);
}

//@desc add new application
//@route POST /customers/CustomerID/workflow/
const addWorkflow = (req, res, next) => {
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
        const error = new Error("required information is missing");
        error.status = 400;
        return next(error);
    }
    applicationData.push(newApplication);
    res.status(201).json(applicationData[applicationData.length - 1]);
}

//@desc update the existing workflow
//@route PUT /customers/CustomerID/workflow/id
const updateWorkflow = (req, res, next) => {
    const id = Number(req.params.id);
    const records = applicationData.find((record) => record.applicant_id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    for (let key in req.body) {
        records[key] = req.body[key];
    }
    res.status(200).json(applicationData)
}

//@desc delete workflow
//@route DELETE /customers/CustomerID/workflow/id
const deleteWorkflow = (req, res, next) => {
    const id = Number(req.params.id);
    const records = applicationData.find((record) => record.applicant_id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    applicationData = applicationData.filter(record => record.applicant_id !== id);
    res.status(200).json(applicationData);
}

module.exports = { getApplications, getSingleApplication, addWorkflow, updateWorkflow, deleteWorkflow }