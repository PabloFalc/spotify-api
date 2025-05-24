import type { FastifyInstance } from "fastify";
import type { UserCreateInput, UserUpdateInput } from "../../dtos/users.dto";
import { UsersService } from "./users.service";
import verifyToken from "../../middlewares/middleware";

export async function UsersRoutes(server: FastifyInstance) {
    const service = new UsersService();

    server.post<{ Body: UserCreateInput }>("/register", async (req, reply) => {
        const result = await service.create(req.body);

        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });

    // list & filter
    server.get("/search", { preHandler: verifyToken }, async (_, reply) => {
        const result = await service.list();
        return reply
            .code(result.code)
            .send({ msg: result.msg, data: result.data });
    });

    // find by id
    server.get<{ Params: { id: string } }>(
        "/find/:id",
        { preHandler: verifyToken },
        async (req, reply) => {
            const result = await service.findById(req.params.id);

            return reply
                .code(result.code)
                .send({ msg: result.msg, data: result.data });
        }
    );

    // Update
    server.put<{ Params: { id: string }; Body: UserUpdateInput }>(
        "/update",
        { preHandler: verifyToken },
        async (req, reply) => {
            const result = await service.update(req.params.id, req.body);

            return reply
                .code(result.code)
                .send({ msg: result.msg, data: result.data });
        }
    );

    // Delete
    server.delete<{ Params: { id: string } }>(
        "/delete",
        { preHandler: verifyToken },
        async (req, reply) => {
            const result = await service.delete(req.params.id);

            return reply
                .code(result.code)
                .send({ msg: result.msg, data: result.data });
        }
    );
}
