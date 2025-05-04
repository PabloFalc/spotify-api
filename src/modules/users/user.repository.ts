import { prisma } from "../../database/prisma";
import type { UserCreateInput } from "../../dtos/users.dto";

export class UsersRepository {
	async create(data: UserCreateInput) {
		const result = await prisma.user.create({
			data: data,
		});

		return result;
	}
}
