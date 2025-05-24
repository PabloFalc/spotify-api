import { z } from "zod";

// Schema base (sem follow)
export const UserBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().max(254),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

// Tipo inferido
export type UserBase = z.infer<typeof UserBaseSchema>;

// Para retorno público sem password
export const UserPublicSchema = UserBaseSchema.omit({ password: true });

// Para uso em relacionamentos de Follow
const UserSummarySchema = UserPublicSchema.pick({
    id: true,
    name: true,
    email: true,
});

// Schema de Follow simplificado
export const FollowSchema = z.object({
    follower: UserSummarySchema,
    followed: UserSummarySchema,
});

// User com follows (limitado)
export const UserWithFollowsSchema = UserPublicSchema.extend({
    followedBy: z.array(FollowSchema),
    following: z.array(FollowSchema),
});

export const UserCreateSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email().max(254),
    password: z.string().min(6).max(254),
});

export const UserUpdateSchema = UserCreateSchema.partial();

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserPublic = z.infer<typeof UserPublicSchema>;
