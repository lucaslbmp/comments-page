import { User } from "@prisma/client";
import { FullComment, FullCommentWithReplies } from "../_types";
import CommentBox from "./comment-box";

type CommentSectionProps = {
  comments: FullCommentWithReplies[] | FullComment[];
  user: User | null;
  className?: string;
};

const CommentSection = ({ comments, className, user }: CommentSectionProps) => {
  return (
    <div className={"flex flex-col gap-4 " + (className ?? "")}>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <CommentBox
            comment={comment}
            isFromUser={comment.user.id === user?.id}
          />

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
