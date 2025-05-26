"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_1 = require("../../database/prisma");
class UsersRepository {
    async create(data) {
        const result = await prisma_1.prisma.user.create({
            data: data,
        });
        return result;
    }
    async findById(id) {
        const result = await prisma_1.prisma.user.findUnique({ where: { id } });
        return result;
    }
    async list() {
        const result = await prisma_1.prisma.user.findMany();
        return result;
    }
    async update(id, data) {
        const result = await prisma_1.prisma.user.update({ where: { id }, data: data });
        return result;
    }
    async delete(id) {
        try {
            const result = await prisma_1.prisma.user.delete({ where: { id } });
            return result;
        }
        catch {
            return null;
        }
    }
    static async getUserForAuth(email) {
        try {
            const result = await prisma_1.prisma.user.findFirst({ where: { email } });
            if (!result) {
                return null;
            }
            return result;
        }
        catch (err) {
            throw new Error("Erro interno do servidor");
        }
    }
}
exports.UsersRepository = UsersRepository;
