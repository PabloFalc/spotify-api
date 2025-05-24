import { prisma } from "../../database/prisma";
import type {
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
}
