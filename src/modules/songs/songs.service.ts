import {
    SongCreateSchema,
    SongUpdateSchema,
    type Song,
    type SongCreateInput,
    type SongUpdateInput,
} from "../../dtos/songs.dto";
import { SongsRepository } from "./songs.repository";
import ZodErroFormat from "../../utils/zod.error.format";
import { reply, type ReplyType } from "../../utils/BaseReply";

class SongsService {
    private repository: SongsRepository;

    constructor() {
        this.repository = new SongsRepository();
    }

    async create(rawData: SongCreateInput): Promise<ReplyType<Song>> {
        const data = SongCreateSchema.safeParse(rawData);

        if (!data.success) {
            const message = ZodErroFormat(data.error.message);
            return reply.badRequest(message);
        }

        const result = await this.repository.create(data.data);

        if (!result) {
            return reply.internalServerError("Erro interno do servidor");
        }

        return reply.created("Música criada com sucesso", result);
    }

    async findById(id: string): Promise<ReplyType<Song>> {
        const result = await this.repository.findById(id);

        if (!result) {
            return reply.notFound("Usuário não encontrado");
        }

        return reply.success("Usuário encontrado com sucesso", result);
    }

    async list(): Promise<ReplyType<Song[]>> {
        const result = await this.repository.list();
        return reply.success("Músicas listas com sucesso", result);
    }

    async update(
        id: string,
        rawData: SongUpdateInput
    ): Promise<ReplyType<Song>> {
        const data = SongUpdateSchema.safeParse(rawData);

        if (!data.success) {
            const message = ZodErroFormat(data.error.message);
            return reply.badRequest(message);
        }

        const result = await this.repository.update(id, data.data);

        if (!result) {
            return reply.notFound("Música não encontrada");
        }

        return reply.success("Música não encontrada", result);
    }

    async delete(id: string): Promise<ReplyType<null>> {
        const result = await this.repository.delete(id);

        if (!result) {
            return reply.notFound("Música não encontrada");
        }
        return reply.success("Música deletada com sucesso");
    }
}

export { SongsService };
