-- CreateEnum
CREATE TYPE "Stream" AS ENUM ('HD', 'HDTS');

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "Quality" "Stream" NOT NULL DEFAULT 'HD';
