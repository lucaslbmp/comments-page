"use client";

import { Prisma } from "@prisma/client";
import { getImageUrl } from "../_utils";
import Button from "./button";
import Image from "next/image";
import submitComment from "../_actions/submit-comment";

interface EditableCommentBoxProps {
  //user: Prisma.UserGetPayload<{ include: { image: true } }> | null;
  userId?: string;
  userImage?: Buffer;
  commentId?: string;
}

const EditableCommentBox = ({
  userId,
  userImage,
  commentId,
}: EditableCommentBoxProps) => {
  return (
    <div className="flex bg-cardBg p-6 gap-6 w-full">
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
          await submitComment({ data, commentId, userId: userId });
        }}
      >
        <textarea
          name="comment-content"
          rows={3}
          maxLength={250}
          className="appearance-none w-full border-border border-2 rounded-md resize-none py-3 px-6 flex-1"
        />

        <div className="flex-grow-0 flex-shrink-1">
          <Button type="submit" className="w-[5.6rem] py-3">
            Send
          </Button>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default EditableCommentBox;
