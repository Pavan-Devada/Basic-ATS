const { Console } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path")

const PORT = process.env.PORT || 5000;

const logger = require("./middleware/logger")
const errorHandler = require("./middleware/error")
const notFound = require("./middleware/notFound")
const person = require("./routers/person")
const job = require("./routers/job")
const workflow = require("./routers/workflow")


const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use("/customers/CustomerID/person", person);
app.use("/customers/CustomerID/job", job);
app.use("/customers/CustomerID/workflow", workflow);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) {
        console.log("501- Internal server error");
        return
    }
    console.log(`Server running on http://localhost:${PORT}`);
})