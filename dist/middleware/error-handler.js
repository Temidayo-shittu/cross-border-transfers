"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.handleTokenExpiredError = exports.handleJWTError = void 0;
const http_status_codes_1 = require("http-status-codes");
const main_1 = require("../errors/main");
const handleJWTError = () => {
    throw new main_1.CustomAPIError('Invalid Token, Please Login Again', http_status_codes_1.StatusCodes.UNAUTHORIZED);
};
exports.handleJWTError = handleJWTError;
const handleTokenExpiredError = () => {
    throw new main_1.CustomAPIError('Your Token has expired, Please Login Again', http_status_codes_1.StatusCodes.UNAUTHORIZED);
};
exports.handleTokenExpiredError = handleTokenExpiredError;
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later',
    };
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    ;
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)[0]} field, please choose another value`;
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    ;
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    ;
    if (err.name === 'JsonWebTokenError') {
        try {
            (0, exports.handleJWTError)();
        }
        catch (jwtErr) {
            customError.statusCode = jwtErr.statusCode;
            customError.msg = jwtErr.message;
        }
    }
    ;
    if (err.name === 'TokenExpiredError') {
        try {
            (0, exports.handleTokenExpiredError)();
        }
        catch (tokenExpiredErr) {
            customError.statusCode = tokenExpiredErr.statusCode;
            customError.msg = tokenExpiredErr.message;
        }
    }
    ;
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//export default errorHandlerMiddleware;
