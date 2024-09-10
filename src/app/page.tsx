import { db } from "./_lib/prisma";
import CommentSection from "./_components/comment-section";

export default async function Home() {
  const comments = await db.comment.findMany({
    include: {
      user: { include: { image: true } },
      rootReplies: { include: { user: { include: { image: true } } } },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-24 w-max">
      <CommentSection comments={comments} />
    </main>
  );
}
