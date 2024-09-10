import { Prisma } from "@prisma/client";

export type FullCommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    user: { include: { image: true } };
    rootReplies: { include: { user: { include: { image: true } } } };
  };
}>;

export type FullComment = Prisma.CommentGetPayload<{
  include: {
    user: { include: { image: true } };
  };
}>;
