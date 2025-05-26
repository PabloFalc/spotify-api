"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateSchema = exports.UserAuthSchema = exports.UserCreateSchema = exports.UserPublicSchema = exports.UserBaseSchema = void 0;
const zod_1 = require("zod");
// Schema base (sem follow)
exports.UserBaseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(3).max(50),
    email: zod_1.z.string().email(),
    img: zod_1.z.string().url(),
    password: zod_1.z.string().max(254),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
// Para retorno público sem password
exports.UserPublicSchema = exports.UserBaseSchema.omit({ password: true });
exports.UserCreateSchema = exports.UserBaseSchema.omit({
    updatedAt: true,
    createdAt: true,
    id: true,
});
exports.UserAuthSchema = exports.UserBaseSchema.pick({
    email: true,
    password: true,
});
exports.UserUpdateSchema = exports.UserCreateSchema.partial();
