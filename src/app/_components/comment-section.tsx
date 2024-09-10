import { FullComment, FullCommentWithReplies } from "../_types";
import CommentCard from "./comment-card";

type CommentSectionProps = {
  comments: FullCommentWithReplies[] | FullComment[];
  className?: string;
};

const CommentSection = ({ comments, className }: CommentSectionProps) => {
  return (
    <div className={"flex flex-col gap-4 " + className}>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} />

          {"rootReplies" in comment && !!comment.rootReplies?.length && (
            <div className="mt-4">
              <CommentSection comments={comment.rootReplies} className="ml-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
