/*
  Warnings:

  - Added the required column `posterimageurl` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "posterimageurl" TEXT NOT NULL;
