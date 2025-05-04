import { fastify } from "fastify";
import { UsersRoutes } from "./modules/users.routes";

const server = fastify({ logger: true });

server.register(UsersRoutes, {
	prefix: "/users",
});

server.listen({ port: 3000 }, (port, err) => {
	if (err) {
		console.error(err);
		process.exit();
	}

	console.log(`Server is running on port: http://localhost:${port}`);
});
