import { db } from "./_lib/prisma";
import CommentSection from "./_components/comment-section";

export default async function Home() {
  const comments = await db.comment.findMany({
    include: {
      user: { include: { image: true } },
      rootReplies: { include: { user: { include: { image: true } } } },
    },
    where: {
      parentId: null,
    },
  });

  const user = await db.user.findFirst({ where: { username: "juliusomo" } });

  return (
    <main className="flex min-h-screen max-w-[100vw] flex-col justify-between py-24 px-12 w-full items-center">
      <CommentSection
        comments={comments}
        user={user}
        className="max-w-[743px]"
      />
    </main>
  );
}
