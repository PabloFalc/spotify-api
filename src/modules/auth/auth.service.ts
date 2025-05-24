import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { type AuthResponseType, authReply } from "./auth.reply";
import type { UserAuthInput } from "../../dtos/users.dto";
import { UsersService } from "../users/users.service";
import type { FastifyReply } from "fastify";

dotenv.config();

export default async function createToken(
    data: UserAuthInput
): Promise<AuthResponseType> {
    const user = await UsersService.getUserForAuth(data.email);

    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
        return authReply.error({ msg: "Erro interno do seridor" });
    }

    if (!user) {
        return authReply.unauthorized({ msg: "Email ou senha incorretos" });
    }

    // fazer com o bcryptjs em produção
    if (user.password !== data.password) {
        return authReply.unauthorized({ msg: "Email ou senha incorretas" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        SECRET,
        {
            expiresIn: "8h",
        }
    );

    return authReply.success({ token: token });
}

export function clearAuthCookie(reply: FastifyReply) {
    reply.clearCookie("token", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true, // true em produção com HTTPS
    });
}

export function setAuthCookie(reply: FastifyReply, token: string): void {
    reply.setCookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
}
