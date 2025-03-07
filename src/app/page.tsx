import { db } from "./_lib/prisma";
import CommentSection from "./_components/comment-section";
import EditableCommentBox from "./_components/editable-comment-box";
import { convertToObject } from "./_utils";

export default async function Home() {
  const comments = await db.comment.findMany({
    include: {
      user: { include: { image: true } },
      rootReplies: {
        include: {
          user: { include: { image: true } },
          parent: { include: { user: true } },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    where: {
      parentId: null,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const user = await db.user.findFirst({
    where: { username: "juliusomo" },
    include: { image: true },
  });
  let _userImage = JSON.stringify(user?.image?.png);
  const userImage = JSON.stringify(_userImage);

  return (
    <main className="flex min-h-screen max-w-[100vw] flex-col gap-4 justify-between py-24 px-12 w-full items-center">
      <CommentSection
        comments={comments.map((comm) => convertToObject(comm))}
        user={convertToObject(user)}
        className="max-w-[743px]"
      />
      <EditableCommentBox
        userId={user?.id}
        userImage={convertToObject(user?.image?.png)}
      />
    </main>
  );
}
