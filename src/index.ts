import { fastify } from "fastify";
import { UsersRoutes } from "./modules/users/users.routes";
import fastifyCookie from "@fastify/cookie";
import { AuthRoutes } from "./modules/auth/auth.routes";
import { SongsRoutes } from "./modules/songs/songs.routes";

const server = fastify({ logger: true });

server.register(fastifyCookie, {
    secret: process.env.JWT_SECRET,
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

server.listen({ port: 3000 }, (port, err) => {
    if (err) {
        console.error(err);
        process.exit();
    }

    console.log(`Server is running on port: http://localhost:${port}`);
});
