import { FullComment, FullCommentWithReplies } from "../_types";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";

type CommentCardProps = {
  comment: FullCommentWithReplies | FullComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const getImageUrl = (image: Buffer) => {
    // const blob = new Blob([image]);
    // const url = URL.createObjectURL(blob);
    const base64String = image.toString("base64");
    const url = `data:image/jpeg;base64,${base64String}`;
    return url;
  };

  return (
    <div className="flex bg-slate-300">
      <div>{comment.score}</div>
      <div>
        {/* Header */}
        <div className="flex">
          {/* Profile pic */}
          {comment.user.image?.png ? (
            <div>
              <Image
                alt="profile-pic"
                src={getImageUrl(comment.user.image?.png)}
                className="rounded-full"
                width={32}
                height={32}
              />
            </div>
          ) : (
            <UserIcon />
          )}

          {/* Username */}
          <div>{comment.user.username}</div>

          {/* Comment date */}
          <div>{new Date(comment.createdAt).toLocaleDateString()}</div>

          {/* Reply button */}
          <button>
            <Image width={14} height={14} alt="reply" src="/reply.svg" />
            Reply
          </button>
        </div>

        {/* Content */}
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

export default CommentCard;
