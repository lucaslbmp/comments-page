import { Prisma, User } from "@prisma/client";
import { FullComment, FullCommentWithReplies } from "../_types";
import CommentBox from "./comment-box";

type CommentSectionProps = {
  comments: FullCommentWithReplies[] | FullComment[];
  user: Prisma.UserGetPayload<{ include: { image: true } }> | null;
  className?: string;
};

const CommentSection = ({ comments, className, user }: CommentSectionProps) => {
  return (
    <div className={"flex flex-col gap-4 " + (className ?? "")}>
      {user &&
        comments?.map((comment) => (
          <div key={comment.id}>
            <CommentBox comment={comment} user={user} />

            {"rootReplies" in comment && !!comment.rootReplies?.length && (
              <div className="mt-4">
                <CommentSection
                  comments={comment.rootReplies}
                  user={user}
                  className="ml-[5.375rem]"
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentSection;
