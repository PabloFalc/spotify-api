import {
    UserCreateSchema,
    type UserUpdateInput,
    type UserCreateInput,
    type UserPublic,
    UserUpdateSchema,
} from "../../dtos/users.dto";
import { reply, type ReplyType } from "../../utils/BaseReply";
import ZodErroFormat from "../../utils/zod.error.format";
import { UsersRepository } from "./user.repository";

class UsersService {
    private repository: UsersRepository;

    constructor() {
        this.repository = new UsersRepository();
    }

    async create(rawData: UserCreateInput): Promise<ReplyType<UserPublic>> {
        const data = UserCreateSchema.safeParse(rawData);

        if (!data.success) {
            const message = ZodErroFormat(data.error.message);
            return reply.badRequest(message);
        }

        const result = await this.repository.create(data.data);

        if (!result) {
            return reply.internalServerError("Erro interno do servidor");
        }

        return reply.created("Usuário criado com sucesso", result);
    }

    async findById(id: string): Promise<ReplyType<UserPublic>> {
        const result = await this.repository.findById(id);

        if (!result) {
            return reply.notFound("Usuário não encontrado");
        }

        return reply.success("Usuário encontrado com sucesso", result);
    }

    async list(): Promise<ReplyType<UserPublic[]>> {
        const result = await this.repository.list();

        return reply.success("Usuários encontrados com sucesso", result);
    }

    async update(
        id: string,
        rawData: UserUpdateInput
    ): Promise<ReplyType<UserPublic>> {
        const data = UserUpdateSchema.safeParse(rawData);

        if (!data.success) {
            const message = ZodErroFormat(data.error.message);
            return reply.badRequest(message);
        }

        const result = await this.repository.update(id, data.data);

        if (!result) {
            return reply.notFound("Usuário não encontrado");
        }

        return reply.success(
            "Usuário encontrado e atualizado com sucesso",
            result
        );
    }

    async delete(id: string): Promise<ReplyType<null>> {
        const result = await this.repository.delete(id);
        return reply.success("Usuário deletado com sucesso");
    }
}

export { UsersService };
