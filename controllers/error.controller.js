
export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

export const asyncErrorHandler = (fun) => {
    return (req, res, next) => {
        fun(req, res, next).catch(err => next(err));
    }
}