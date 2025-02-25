const express = require("express");
const fs = require("fs");
const path = require("path")
const router = express.Router();

//reading the information
fs.readFile(path.join(__dirname, "../JSON data/persons.json"), "Utf8", (err, data) => {
    if (err) {
        throw error;
    }
    personData = JSON.parse(data);
})



//GET users
router.get("/", (req, res) => {
    //GET limited users
    const limitedUsers = Number(req.query.limit);
    if (!isNaN(limitedUsers) && limitedUsers > 0) {
        return res.status(200).json(personData.slice(0, limitedUsers));
    }
    // GET all users 
    res.status(200).json(personData);
});

//GET particular user
router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const records = personData.find((record) => record.id === id)
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    res.status(200).json(records);
})

//POST add a new user
router.post("/", (req, res, next) => {
    const newPerson = {
        "id": personData.length + 1,
        "name": req.body.name || "",
        "age": req.body.age || "",
        "email": req.body.email || "",
        "phone": req.body.phone || "",
        "address": req.body.address || "",
        "experience": req.body.experience || "",
        "skills": req.body.skills || "",
        "education": req.body.education || "",
        "position": req.body.position || ""
    }
    if (newPerson.name === "" || newPerson.email === "" || newPerson.age === "" || newPerson.phone === "") {
        const error = new Error("required information is missing");
        error.status = 400;
        return next(error);
    }
    personData.push(newPerson);
    res.status(201).json(personData[personData.length - 1]);
})

// PUT updating the existing person
router.put("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const records = personData.find((record) => record.id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    for (let key in req.body) {
        records[key] = req.body[key];
    }
    res.status(200).json(personData)
})

//DELETE deleting the person
router.delete("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const records = personData.find((record) => record.id === id);
    if (!records) {
        const error = new Error("record not found");
        error.status = 404;
        return next(error);
    }
    personData = personData.filter(record => record.id !== id);
    res.status(200).json(personData);
})


module.exports = router;