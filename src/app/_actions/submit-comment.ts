"use server";

import updateComment from "./update-comment";
import createComment from "./create-comment";

interface SubmitCommentParams {
  data: FormData;
  commentId?: string;
  userId?: string;
}

const submitComment = async ({
  data,
  commentId,
  userId,
}: SubmitCommentParams) => {
  if (!userId) return;

  const content = data.get("comment-content") as string;
  if (commentId) {
    await updateComment({ id: commentId, content });
  } else {
    await createComment({ userId, score: 0, content });
  }
};

export default submitComment;
