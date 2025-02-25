const notFound = (req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
}

module.exports = notFound;