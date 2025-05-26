"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsRoutes = SongsRoutes;
const songs_service_1 = require("./songs.service");
async function SongsRoutes(server) {
    const service = new songs_service_1.SongsService();
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
    server.delete("/delete/:id", async (req, reply) => {
        const result = await service.delete(req.params.id);
        console.log(result.msg);
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
}
