"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reply = void 0;
exports.reply = {
    badRequest(msg, data) {
        return {
            success: false,
            code: 404,
            msg,
            data,
        };
    },
    internalServerError(msg, data) {
        return {
            success: false,
            code: 500,
            msg,
            data,
        };
    },
    success(msg, data) {
        return {
            success: true,
            code: 200,
            msg,
            data,
        };
    },
    created(msg, data) {
        return {
            success: true,
            code: 201,
            msg,
            data,
        };
    },
    notFound(msg, data) {
        return {
            success: false,
            code: 404,
            msg,
            data,
        };
    },
    unauthorized(msg, data) {
        return {
            success: false,
            code: 401,
            msg,
            data,
        };
    },
};
