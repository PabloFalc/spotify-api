import { fastify } from "fastify";
import { UsersRoutes } from "./modules/users/users.routes";
import fastifyCookie from "@fastify/cookie";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { SongsRoutes } from "./modules/songs/songs.routes";

import cors from "@fastify/cors";

const server = fastify();

server.register(fastifyCookie, {
    secret: process.env.JWT_SECRET,
});

server.register(cors, {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
});

server.register(AuthRoutes, {
    prefix: "/",
});

server.register(UsersRoutes, {
    prefix: "/users",
});

server.register(SongsRoutes, {
    prefix: "/songs",
});

const port = Number(process.env.PORT) || 3100;

server
    .listen({ port, host: "0.0.0.0" })
    .then(() => {
        console.log(`Server is running on: http://localhost:${port}`);
    })
    .catch((err) => {
        console.error("erro", err);
        process.exit(1);
    });
