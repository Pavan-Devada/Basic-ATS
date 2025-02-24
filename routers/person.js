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
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const records = personData.filter((record) => record.id === id)
    if (records.length > 0) {
        res.status(200).json(records);
    }
    else {
        res.status(404).json({ message: "record not found" });
    }

})

//POST add a new user
router.post("/", (req, res) => {
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
        return res.status(400).json({ message: "required information is missing" });
    }
    personData.push(newPerson);
    res.status(201).json(personData[personData.length - 1]);
})

//PATCH update a existing record
// router.patch("/")


module.exports = router;