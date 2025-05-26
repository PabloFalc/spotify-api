/*
  Warnings:

  - Added the required column `songUrl` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "songUrl" VARCHAR(254) NOT NULL;
