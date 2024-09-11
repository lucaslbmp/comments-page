"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface CreateCommentParams {
  //user: Prisma.UserGetPayload<{include: {image: true}}>;
  userId: string;
  score: number;
  content: string;
}

const createComment = async ({
  userId,
  score,
  content,
}: CreateCommentParams) => {
  await db.comment.create({
    data: {
      score,
      content,
      userId,
    },
  });
  revalidatePath("/");
};

export default createComment;
