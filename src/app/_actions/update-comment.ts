"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface UpdateCommentParams {
  id: string;
  score?: number;
  content?: string;
}

const updateComment = async ({ id, score, content }: UpdateCommentParams) => {
  await db.comment.update({
    where: { id },
    data: {
      score: score ?? undefined,
      content: content ?? undefined,
    },
  });
  revalidatePath("/");
};

export default updateComment;
