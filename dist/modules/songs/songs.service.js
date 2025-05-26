"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsService = void 0;
const songs_dto_1 = require("../../dtos/songs.dto");
const songs_repository_1 = require("./songs.repository");
const zod_error_format_1 = __importDefault(require("../../utils/zod.error.format"));
const BaseReply_1 = require("../../utils/BaseReply");
class SongsService {
    constructor() {
        this.repository = new songs_repository_1.SongsRepository();
    }
    async create(rawData) {
        const data = songs_dto_1.SongCreateSchema.safeParse(rawData);
        if (!data.success) {
            const message = (0, zod_error_format_1.default)(data.error.message);
            return BaseReply_1.reply.badRequest(message);
        }
        const result = await this.repository.create(data.data);
        if (!result) {
            return BaseReply_1.reply.internalServerError("Erro interno do servidor");
        }
        return BaseReply_1.reply.created("Música criada com sucesso", result);
    }
    async findById(id) {
        const result = await this.repository.findById(id);
        if (!result) {
            return BaseReply_1.reply.notFound("Usuário não encontrado");
        }
        return BaseReply_1.reply.success("Usuário encontrado com sucesso", result);
    }
    async list() {
        const result = await this.repository.list();
        return BaseReply_1.reply.success("Músicas listas com sucesso", result);
    }
    async update(id, rawData) {
        const data = songs_dto_1.SongUpdateSchema.safeParse(rawData);
        if (!data.success) {
            const message = (0, zod_error_format_1.default)(data.error.message);
            return BaseReply_1.reply.badRequest(message);
        }
        const result = await this.repository.update(id, data.data);
        if (!result) {
            return BaseReply_1.reply.notFound("Música não encontrada");
        }
        return BaseReply_1.reply.success("Música não encontrada", result);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        if (!result) {
            return BaseReply_1.reply.notFound("Música não encontrada");
        }
        return BaseReply_1.reply.success("Música deletada com sucesso");
    }
}
exports.SongsService = SongsService;
