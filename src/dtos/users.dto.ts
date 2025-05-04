import { z } from "zod";

const UserBaseSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(3).max(50),
	email: z.string().email().nonempty(),
	password: z.string().max(254).nonempty(),

	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const UserCreateSchema = UserBaseSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const UserUpdateSchema = UserCreateSchema.partial();

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserCreateInput = z.infer<typeof UserCreateSchema>;

// id        String       @id @default(uuid())
// name      String       @db.VarChar(50)
// email     String       @db.VarChar(254)
// password  String       @db.VarChar(254)

// followedBy Follow[]    @relation("FollowedBy") // seguindo por
// following  Follow[]    @relation("Following")  // seguindo
// likedSongs Like[]      @relation("LikedSongs")

// createdAt DateTime     @default(now())
// updatedAt DateTime     @updatedAt
