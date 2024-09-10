/*
  Warnings:

  - You are about to drop the column `replyingToId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyingToId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyingToId",
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "rootCommentId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_rootCommentId_fkey" FOREIGN KEY ("rootCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
