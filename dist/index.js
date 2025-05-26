"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const users_routes_1 = require("./modules/users/users.routes");
const cookie_1 = __importDefault(require("@fastify/cookie"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const songs_routes_1 = require("./modules/songs/songs.routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.fastify)();
server.register(cookie_1.default, {
    secret: process.env.JWT_SECRET,
});
server.register(cors_1.default, {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
});
server.register(auth_routes_1.AuthRoutes, {
    prefix: "/",
});
server.register(users_routes_1.UsersRoutes, {
    prefix: "/users",
});
server.register(songs_routes_1.SongsRoutes, {
    prefix: "/songs",
});
server
    .listen({ port: 3100 })
    .then(() => {
    console.log("Server is running on: http://localhost:3100");
})
    .catch((err) => {
    console.error("erro", err);
    process.exit(1);
});
