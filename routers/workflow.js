const express = require("express");
const fs = require("fs");
const path = require("path")
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("workflow file responding");
})

module.exports = router;