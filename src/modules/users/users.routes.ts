import type { FastifyInstance } from "fastify";

export async function UsersRoutes(server: FastifyInstance) {
	server.post("/register", async (req, reply) => {});

	// list & filter
	server.get("/search", async (req, reply) => {});

	// find by id
	server.get("/find/:id", async (req, reply) => {});

	// Update
	server.put("/update", async (req, reply) => {});

	// Delete
	server.delete("/delete", async (req, reply) => {});
}
