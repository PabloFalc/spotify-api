"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = UsersRoutes;
const users_service_1 = require("./users.service");
async function UsersRoutes(server) {
    const service = new users_service_1.UsersService();
    // Infelizmente eu não vou poder testar o middlware pq apanhei pra fazer a auth no front
    server.post("/register", async (req, reply) => {
        const result = await service.create(req.body);
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
    // list & filter
    server.get("/search", async (_, reply) => {
        const result = await service.list();
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
    // find by id
    server.get("/find/:id", async (req, reply) => {
        const result = await service.findById(req.params.id);
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
    // Update
    server.put("/update", async (req, reply) => {
        const result = await service.update(req.params.id, req.body);
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
    // Delete
    server.delete("/delete", async (req, reply) => {
        const result = await service.delete(req.params.id);
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
}
