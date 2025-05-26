/*
  Warnings:

  - Added the required column `img` to the `Users_TB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users_TB" ADD COLUMN     "img" VARCHAR(254) NOT NULL;
