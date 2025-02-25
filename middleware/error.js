const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ message: `${err.message}` });
    }
    else {
        res.status(505).json({ message: "Server Error" });
    }
}

module.exports = errorHandler;