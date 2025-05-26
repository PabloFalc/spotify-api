"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const users_dto_1 = require("../../dtos/users.dto");
const BaseReply_1 = require("../../utils/BaseReply");
const zod_error_format_1 = __importDefault(require("../../utils/zod.error.format"));
const user_repository_1 = require("./user.repository");
class UsersService {
    constructor() {
        this.repository = new user_repository_1.UsersRepository();
    }
    async create(rawData) {
        const data = users_dto_1.UserCreateSchema.safeParse(rawData);
        if (!data.success) {
            const message = (0, zod_error_format_1.default)(data.error.message);
            return BaseReply_1.reply.badRequest(message);
        }
        const alredyExist = await user_repository_1.UsersRepository.getUserForAuth(data.data.email);
        if (alredyExist) {
            return BaseReply_1.reply.badRequest("usuário já cadastrado");
        }
        const result = await this.repository.create(data.data);
        if (!result) {
            return BaseReply_1.reply.internalServerError("Erro interno do servidor");
        }
        return BaseReply_1.reply.created("Usuário criado com sucesso", result);
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
        return BaseReply_1.reply.success("Usuários encontrados com sucesso", result);
    }
    async update(id, rawData) {
        const data = users_dto_1.UserUpdateSchema.safeParse(rawData);
        if (!data.success) {
            const message = (0, zod_error_format_1.default)(data.error.message);
            return BaseReply_1.reply.badRequest(message);
        }
        const result = await this.repository.update(id, data.data);
        if (!result) {
            return BaseReply_1.reply.notFound("Usuário não encontrado");
        }
        return BaseReply_1.reply.success("Usuário encontrado e atualizado com sucesso", result);
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return BaseReply_1.reply.success("Usuário deletado com sucesso");
    }
    static async getUserForAuth(email) {
        try {
            const result = await user_repository_1.UsersRepository.getUserForAuth(email);
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            return null;
        }
    }
}
exports.UsersService = UsersService;
