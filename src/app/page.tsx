import Image from "next/image";
import { db } from "./_lib/prisma";
import { User } from "lucide-react";
// import Reply from "../../public/reply.svg";

export default async function Home() {
  const comments = await db.comment.findMany({
    include: { user: { include: { image: true } } },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {comments.map((comment) => (
        <div key={comment.id} className="flex">
          <div>{comment.score}</div>
          <div>
            {/* Header */}
            <div className="flex">
              {/* Profile pic */}
              {/* {comment.user.image?.png ? (
                <Image
                  alt="profile-pic"
                  src={comment.user.image?.png}
                  className="rounded-full"
                  width={32}
                  height={32}
                />
              ) : (
                <User />
              )} */}

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
      ))}
    </main>
  );
}
