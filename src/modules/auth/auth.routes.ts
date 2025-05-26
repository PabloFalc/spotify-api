// src/modules/auth/auth.routes.ts

import type { FastifyInstance } from "fastify";
import type { UserAuthInput } from "../../dtos/users.dto";
import createToken, { clearAuthCookie, setAuthCookie } from "./auth.service";
import verifyToken from "../../middlewares/middleware";

export async function AuthRoutes(fastify: FastifyInstance) {
    // login do usuário
    fastify.post<{ Body: UserAuthInput }>("/login", async (req, reply) => {
        const data = req.body;

        const tokenResponse = await createToken(data);

        switch (tokenResponse.code) {
            case 200:
                if (!tokenResponse.token) {
                    return reply
                        .code(500)
                        .send({ message: "Token ausente na resposta" });
                }

                setAuthCookie(reply, tokenResponse.token);
                return reply.code(200).send({
                    message: "Login realizado com sucesso",
                    data: tokenResponse.token,
                });
            default:
                return reply
                    .code(tokenResponse.code)
                    .send({ message: tokenResponse.msg });
        }
    });

    fastify.get("/me", { preHandler: verifyToken }, async (req, reply) => {
        return reply.send(req.user); // req.user já preenchido pelo verifyToken
    });

    fastify.post("/logout", async (req, reply) => {
        clearAuthCookie(reply);
        return reply
            .code(200)
            .send({ message: "Logout realizado com sucesso" });
    });
}
