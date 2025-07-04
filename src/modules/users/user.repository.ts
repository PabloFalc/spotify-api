import { prisma } from "../../database/prisma";
import type {
    UserBase,
    UserCreateInput,
    UserPublic,
    UserUpdateInput,
} from "../../dtos/users.dto";

export class UsersRepository {
    async create(data: UserCreateInput): Promise<UserPublic | null> {
        const result = await prisma.user.create({
            data: data,
        });

        return result;
    }

    async findById(id: string): Promise<UserPublic | null> {
        const result = await prisma.user.findUnique({ where: { id } });
        return result;
    }

    async list(): Promise<UserPublic[]> {
        const result = await prisma.user.findMany();
        return result;
    }

    async update(
        id: string,
        data: UserUpdateInput
    ): Promise<UserPublic | null> {
        const result = await prisma.user.update({ where: { id }, data: data });
        return result;
    }

    async delete(id: string): Promise<UserPublic | null> {
        try {
            const result = await prisma.user.delete({ where: { id } });
            return result;
        } catch {
            return null;
        }
    }

    static async getUserForAuth(email: string): Promise<UserBase | null> {
        try {
            const result = await prisma.user.findFirst({ where: { email } });

            if (!result) {
                return null;
            }

            return result;
        } catch (err) {
            throw new Error("Erro interno do servidor");
        }
    }
}
