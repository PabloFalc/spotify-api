"use strict";
// src/middlewares/middlewares.ts (backend)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../database/prisma");
dotenv_1.default.config();
async function verifyToken(req, reply) {
    const SECRET = process.env.JWT_SECRET;
    if (!SECRET) {
        return reply.code(500).send({ message: "Erro interno do servidor" });
    }
    // pega o token dos headers
    const rawToken = req.headers.authorization;
    // verifica se o token existe e é valido
    if (!rawToken || !rawToken.startsWith("Bearer ")) {
        return reply.code(401).send({ message: "Sessão inválida" });
    }
    // pega a segunda parte do token
    const token = rawToken.split(" ")[1];
    try {
        // Valida se o token é original
        const tokenDecoded = jsonwebtoken_1.default.verify(token, SECRET);
        // Valida se o usuário é real
        const userValidate = await verifyUserExist(tokenDecoded.id, tokenDecoded.email, tokenDecoded.name);
        if (!userValidate) {
            return reply.code(401).send({ message: "Token inválido" });
        }
        req.user = tokenDecoded;
    }
    catch (err) {
        console.error("Erro ao verificar token:", err);
        return reply.code(401).send({ message: "Token inválido ou expirado" });
    }
}
async function verifyUserExist(id, email, name) {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { id },
            select: {
                email: true,
                name: true,
            },
        });
        if (!user) {
            return false;
        }
        if (email !== user.email) {
            return false;
        }
        if (name !== user.name) {
            return false;
        }
        return true;
    }
    catch (err) {
        console.error("Erro do banco de dados: ", err);
        return false;
    }
}
