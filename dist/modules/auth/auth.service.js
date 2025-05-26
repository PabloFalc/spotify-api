"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createToken;
exports.clearAuthCookie = clearAuthCookie;
exports.setAuthCookie = setAuthCookie;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_reply_1 = require("./auth.reply");
const users_service_1 = require("../users/users.service");
dotenv_1.default.config();
async function createToken(data) {
    const user = await users_service_1.UsersService.getUserForAuth(data.email);
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
        return auth_reply_1.authReply.error({ msg: "Erro interno do seridor" });
    }
    if (!user) {
        return auth_reply_1.authReply.unauthorized({ msg: "Email ou senha incorretos" });
    }
    // fazer com o bcryptjs em produção
    if (user.password !== data.password) {
        return auth_reply_1.authReply.unauthorized({ msg: "Email ou senha incorretas" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, SECRET, {
        expiresIn: "8h",
    });
    return auth_reply_1.authReply.success({ token: token });
}
function clearAuthCookie(reply) {
    reply.clearCookie("token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true, // true em produção com HTTPS
    });
}
function setAuthCookie(reply, token) {
    reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
}
