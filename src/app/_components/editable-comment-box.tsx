"use client";

import { Prisma } from "@prisma/client";
import { getImageUrl } from "../_utils";
import Button from "./button";
import Image from "next/image";
import TextArea from "./text-area";
import createComment from "../_actions/create-comment";

interface EditableCommentBoxProps {
  //user: Prisma.UserGetPayload<{ include: { image: true } }> | null;
  userId?: string;
  parentUsername?: string;
  parentId?: string;
  rootCommentId?: string;
  userImage?: Buffer;
  onSubmit?: () => void;
  className?: string;
}

const EditableCommentBox = ({
  parentId,
  rootCommentId,
  userId,
  parentUsername,
  userImage,
  onSubmit,
  className,
}: EditableCommentBoxProps) => {
  const commentPrefix = "@" + parentUsername + " ";
  return (
    <div className={"flex bg-cardBg p-6 gap-6 w-full " + className}>
      {userImage && (
        <div className="basis-[42px] flex flex-col">
          <Image
            alt="profile-pic"
            src={getImageUrl(userImage)}
            className="rounded-full"
            width={32}
            height={32}
          />
        </div>
      )}

      {/* <div className="flex-1 flex"> */}
      <form
        className="flex-1 flex gap-6"
        action={async (data) => {
          //await submitComment({ data, commentId, userId: userId });
          if (!userId) return;

          let content = data.get("comment-content") as string;
          content = content.replace(commentPrefix, "");
          await createComment({
            userId,
            score: 0,
            content,
            parentId,
            rootCommentId,
          });
        }}
        onSubmit={onSubmit}
      >
        <TextArea
          name="comment-content"
          defaultValue={parentUsername ? commentPrefix : ""}
        />

        <div className="flex-grow-0 flex-shrink-1">
          <Button type="submit" className="w-[5.6rem] py-3">
            {parentUsername ? "Reply" : "Send"}
          </Button>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default EditableCommentBox;
