import { Prisma } from "@prisma/client";

export type FullCommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    user: { include: { image: true } };
    rootReplies: {
      include: {
        user: { include: { image: true } };
        parent: { include: { user: true } };
      };
    };
    parent: { include: { user: true } };
  };
}>;

export type FullComment = Prisma.CommentGetPayload<{
  include: {
    user: { include: { image: true } };
    parent: { include: { user: true } };
  };
}>;
