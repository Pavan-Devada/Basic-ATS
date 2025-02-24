const { Console } = require("console");
const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

const logger = require("./middleware/logger")
const person = require("./routers/person")
const job = require("./routers/job")
const workflow = require("./routers/workflow")


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
app.use("/customers/CustomerID/person", person);
app.use("/customers/CustomerID/job", job);
app.use("/customers/CustomerID/workflow", workflow);


app.listen(PORT, (err) => {
    if (err) {
        console.log("501- Internal server error");
        return
    }
    console.log(`Server running on http://localhost:${PORT}`);
})