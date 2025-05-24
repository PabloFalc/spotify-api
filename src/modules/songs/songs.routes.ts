import type { FastifyInstance } from "fastify";
import type { SongCreateInput, SongUpdateInput } from "../../dtos/songs.dto";
import { SongsService } from "./songs.service";

export async function SongsRoutes(server: FastifyInstance) {
    const service = new SongsService();

    server.post<{ Body: SongCreateInput }>("/register", async (req, reply) => {
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
    server.get<{ Params: { id: string } }>("/find/:id", async (req, reply) => {
        const result = await service.findById(req.params.id);

        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });

    // Update
    server.put<{ Params: { id: string }; Body: SongUpdateInput }>(
        "/update",
        async (req, reply) => {
            const result = await service.update(req.params.id, req.body);

            return reply
                .code(result.code)
                .send({ msg: result.msg, data: result.data });
        }
    );

    // Delete
    server.delete<{ Params: { id: string } }>("/delete", async (req, reply) => {
        const result = await service.delete(req.params.id);

        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });
}
