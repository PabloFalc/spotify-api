"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTPayloadSchema = void 0;
const zod_1 = require("zod");
exports.JWTPayloadSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string(),
    name: zod_1.z.string(),
    iat: zod_1.z.number().optional(),
    exp: zod_1.z.number().optional(),
});
