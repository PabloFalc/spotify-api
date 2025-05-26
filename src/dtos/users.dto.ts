import { z } from "zod";

// Schema base (sem follow)
export const UserBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(50),
    email: z.string().email(),
    img: z.string().url(),
    password: z.string().max(254),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

// Tipo inferido
export type UserBase = z.infer<typeof UserBaseSchema>;

// Para retorno público sem password
export const UserPublicSchema = UserBaseSchema.omit({ password: true });

export const UserCreateSchema = UserBaseSchema.omit({
    updatedAt: true,
    createdAt: true,
    id: true,
});

export const UserAuthSchema = UserBaseSchema.pick({
    email: true,
    password: true,
});
export const UserUpdateSchema = UserCreateSchema.partial();

export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserAuthInput = z.infer<typeof UserAuthSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserPublic = z.infer<typeof UserPublicSchema>;
