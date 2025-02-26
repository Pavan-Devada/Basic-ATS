const express = require("express");
const router = express.Router();
const { getPersons, getSinglePerson, addPerson, updatePerson, deletePerson } = require("../controllers/personControllers")



//GET users
router.get("/", getPersons);

//GET particular user
router.get("/:id", getSinglePerson)

//POST add a new user
router.post("/", addPerson)

// PUT updating the existing person
router.put("/:id", updatePerson)

//DELETE deleting the person
router.delete("/:id", deletePerson)


module.exports = router;