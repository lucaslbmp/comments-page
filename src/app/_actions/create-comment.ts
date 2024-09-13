"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface CreateCommentParams {
  //user: Prisma.UserGetPayload<{include: {image: true}}>;
  userId: string;
  score: number;
  content: string;
  parentId?: string;
  rootCommentId?: string;
}

const createComment = async ({
  userId,
  score,
  content,
  parentId,
  rootCommentId,
}: CreateCommentParams) => {
  await db.comment.create({
    data: {
      score,
      content,
      userId,
      parentId: parentId ?? null,
      rootCommentId,
    },
  });

  revalidatePath("/");
};

export default createComment;
