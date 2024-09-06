/*
  Warnings:

  - Changed the type of `png` on the `UserImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `webp` on the `UserImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserImage" DROP COLUMN "png",
ADD COLUMN     "png" BYTEA NOT NULL,
DROP COLUMN "webp",
ADD COLUMN     "webp" BYTEA NOT NULL;
