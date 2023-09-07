"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
    static NotFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
    static ServerError(message, errors = []) {
        return new ApiError(500, message, errors);
    }
}
exports.default = ApiError;
