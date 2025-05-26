"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongUpdateSchema = exports.SongCreateSchema = void 0;
const zod_1 = require("zod");
const SongBaseSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string().max(150).nonempty(),
    imgUrl: zod_1.z.string().max(254),
    songUrl: zod_1.z.string().max(254),
    likesCount: zod_1.z.number(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.SongCreateSchema = SongBaseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    likesCount: true,
});
exports.SongUpdateSchema = SongBaseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).partial();
// model Song{
//     id String @id @default(uuid())
//     title   String @db.VarChar(150)
//     imgUrl String @db.VarChar(254)
//     likes Like[] @relation("Likes")
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }
