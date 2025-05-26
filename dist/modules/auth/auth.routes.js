"use strict";
// src/modules/auth/auth.routes.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = AuthRoutes;
const auth_service_1 = __importStar(require("./auth.service"));
const middleware_1 = __importDefault(require("../../middlewares/middleware"));
async function AuthRoutes(fastify) {
    // login do usuário
    fastify.post("/login", async (req, reply) => {
        const data = req.body;
        const tokenResponse = await (0, auth_service_1.default)(data);
        switch (tokenResponse.code) {
            case 200:
                if (!tokenResponse.token) {
                    return reply
                        .code(500)
                        .send({ message: "Token ausente na resposta" });
                }
                (0, auth_service_1.setAuthCookie)(reply, tokenResponse.token);
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
    fastify.get("/me", { preHandler: middleware_1.default }, async (req, reply) => {
        return reply.send(req.user); // req.user já preenchido pelo verifyToken
    });
    fastify.post("/logout", async (req, reply) => {
        (0, auth_service_1.clearAuthCookie)(reply);
        return reply
            .code(200)
            .send({ message: "Logout realizado com sucesso" });
    });
}
