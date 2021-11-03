"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
function ErrorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'The user is not authorized',
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(401).json({
            message: err,
        });
    }
    return res.status(500).json({
        message: err,
    });
}
exports.ErrorHandler = ErrorHandler;
