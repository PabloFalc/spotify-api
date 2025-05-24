import { z } from "zod";

const SongBaseSchema = z.object({
	id: z.string().uuid(),
	title: z.string().max(150).nonempty(),
	imgUrl: z.string().max(254),
	likesCount: z.number(),

	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

const SongCreateSchema = SongBaseSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

const SongUpdateSchema = SongBaseSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
}).partial();

export type Song = z.infer<typeof SongBaseSchema>;

export type SongCreateInput = z.infer<typeof SongCreateSchema>;

export type SongUpdateInput = z.infer<typeof SongUpdateSchema>;

// model Song{
//     id String @id @default(uuid())
//     title   String @db.VarChar(150)
//     imgUrl String @db.VarChar(254)
//     likes Like[] @relation("Likes")

//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }
