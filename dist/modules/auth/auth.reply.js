"use strict";
// src/modules/auth/auth.response.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReply = void 0;
exports.authReply = {
    success: ({ token, msg }) => ({
        token,
        msg,
        code: 200,
    }),
    unauthorized: ({ token, msg }) => ({
        token,
        msg,
        code: 401,
    }),
    error: ({ token, msg }) => ({
        token,
        msg,
        code: 500,
    }),
};
