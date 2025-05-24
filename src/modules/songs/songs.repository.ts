import { prisma } from "../../database/prisma";
import type {
    SongCreateInput,
    Song,
    SongUpdateInput,
} from "../../dtos/songs.dto";

class SongsRepository {
    async create(data: SongCreateInput): Promise<Song | null> {
        const song = await prisma.song.create({
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

    async findById(id: string): Promise<Song | null> {
        const song = await prisma.song.findUnique({
            where: { id },
            include: { _count: { select: { likes: true } } },
        });

        if (!song) return null;

        return {
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        };
    }

    async list(): Promise<Song[]> {
        const songs = await prisma.song.findMany({
            include: { _count: { select: { likes: true } } },
        });

        return songs.map((song) => ({
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        }));
    }

    async update(id: string, data: SongUpdateInput): Promise<Song | null> {
        const song = await prisma.song.findUnique({
            where: { id },
            include: { _count: { select: { likes: true } } },
        });

        if (!song) return null;

        return {
            ...song,
            likesCount: song._count.likes,
            createdAt: song.createdAt.toISOString(),
            updatedAt: song.updatedAt.toISOString(),
        };
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await prisma.song.delete({ where: { id } });
            return true;
        } catch {
            return false;
        }
    }
}

export { SongsRepository };
