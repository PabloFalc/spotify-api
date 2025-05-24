import "fastify";
import type { JWTPayload } from "./jwt.types"; // Ajuste o caminho para o arquivo de tipos do JWT

declare module "fastify" {
    interface FastifyRequest {
        user?: JWTPayload; // Adiciona a propriedade `user` com tipagem personalizada
    }
}
