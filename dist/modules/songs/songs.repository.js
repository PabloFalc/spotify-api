"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongsRepository = void 0;
const prisma_1 = require("../../database/prisma");
class SongsRepository {
    async create(data) {
        const song = await prisma_1.prisma.song.create({
            data,
            include: { _count: { select: { likes: true } } },
        });
        return {
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        };
    }
    async findById(id) {
        const song = await prisma_1.prisma.song.findUnique({
            where: { id },
            include: { _count: { select: { likes: true } } },
        });
        if (!song)
            return null;
        return {
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        };
    }
    async list() {
        const songs = await prisma_1.prisma.song.findMany({
            include: { _count: { select: { likes: true } } },
        });
        return songs.map((song) => ({
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        }));
    }
    async update(id, data) {
        const song = await prisma_1.prisma.song.findUnique({
            where: { id },
            include: { _count: { select: { likes: true } } },
        });
        if (!song)
            return null;
        return {
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        };
    }
    async delete(id) {
        try {
            const result = await prisma_1.prisma.song.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
}
exports.SongsRepository = SongsRepository;
