// src/middlewares/middlewares.ts (backend)

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { JWTPayload } from "../lib/jwt.types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma";

dotenv.config();

export default async function verifyToken(
    req: FastifyRequest,
    reply: FastifyReply
) {
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
        const tokenDecoded = jwt.verify(token, SECRET) as JWTPayload;

        // Valida se o usuário é real
        const userValidate = await verifyUserExist(
            tokenDecoded.id,
            tokenDecoded.email,
            tokenDecoded.name
        );

        if (!userValidate) {
            return reply.code(401).send({ message: "Token inválido" });
        }

        req.user = tokenDecoded;
    } catch (err) {
        console.error("Erro ao verificar token:", err);
        return reply.code(401).send({ message: "Token inválido ou expirado" });
    }
}

async function verifyUserExist(
    id: string,
    email: string,
    name: string
): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
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
    } catch (err) {
        console.error("Erro do banco de dados: ", err);
        return false;
    }
}
