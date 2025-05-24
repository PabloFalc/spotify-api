import { z } from "zod";

export const JWTPayloadSchema = z.object({
    id: z.string().uuid(),
    email: z.string(),
    name: z.string(),
    iat: z.number().optional(),
    exp: z.number().optional(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
