"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface UpdateCommentParams {
  id: string;
}

const deleteComment = async ({ id }: UpdateCommentParams) => {
  await db.comment.delete({
    where: { id },
  });
  revalidatePath("/");
};

export default deleteComment;
