"use client";

import { FullComment, FullCommentWithReplies } from "../_types";
import Image from "next/image";
import {
  User as UserIcon,
  Plus as PlusSign,
  Minus as MinusSign,
} from "lucide-react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import updateComment from "../_actions/update-comment";

type CommentCardProps = {
  comment: FullCommentWithReplies | FullComment;
  isFromUser: boolean;
};

const CommentCard = ({ comment, isFromUser }: CommentCardProps) => {
  const { id, score } = comment;

  const getImageUrl = (image: Buffer) => {
    // const blob = new Blob([image]);
    // const url = URL.createObjectURL(blob);
    const base64String = Buffer.from(image)?.toString("base64");
    const url = `data:image/jpeg;base64,${base64String}`;
    return url;
  };

  const timePastDate = (date: Date) =>
    formatDistance(date, new Date(), { addSuffix: true });

  const handleRaiseScore = async (id: string, score: number) => {
    await updateComment({ id, score: score + 1 });
  };

  const handleLowerScore = async (id: string, score: number) => {
    await updateComment({ id, score: score - 1 });
  };

  return (
    <div className="flex bg-cardBg p-6 gap-6 w-full">
      {/* Score Counter */}
      <div className="basis-[42px] flex flex-col">
        <div className="bg-background rounded-lg flex flex-col gap-6 items-center my-auto">
          <button
            className="text-xl font-extrabold leading-4 mt-3 text-fgSecondaryLight"
            onClick={() => handleRaiseScore(id, score)}
          >
            <PlusSign size={11} />
          </button>

          <div className="text-fgSecondary font-semibold">{comment.score}</div>

          <button
            className="text-xl font-extrabold leading-4 mb-3 text-fgSecondaryLight"
            onClick={() => handleLowerScore(id, score)}
          >
            <MinusSign size={11} />
          </button>
        </div>
      </div>

      <div className="w-full">
        {/* Header */}
        <div className="flex gap-4 items-center text-sm">
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
          <div className="font-bold">{comment.user.username}</div>

          {/* Tag */}
          {isFromUser && (
            <div className="bg-fgSecondary text-white px-1">you</div>
          )}

          {/* Comment date */}
          <div>{timePastDate(new Date(comment.createdAt))}</div>

          {/* Buttons button */}
          <div className="flex-1 flex justify-end gap-6">
            {!isFromUser ? (
              <button className="flex items-center gap-2">
                <Image
                  width={14}
                  height={14}
                  alt="reply"
                  src="/icons/icon-reply.svg"
                />
                <span className="text-fgSecondary font-bold">Reply</span>
              </button>
            ) : (
              <>
                <button className="flex items-center gap-2">
                  <Image
                    width={14}
                    height={14}
                    alt="delete"
                    src="/icons/icon-delete.svg"
                  />
                  <span className="text-danger font-bold">Delete</span>
                </button>

                <button className="flex items-center gap-2">
                  <Image
                    width={14}
                    height={14}
                    alt="edit"
                    src="/icons/icon-edit.svg"
                  />
                  <span className="text-fgSecondary font-bold">Edit</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <span className="text-fgSecondary font-semibold">
            @{comment.user.username}{" "}
          </span>
          <span>{comment.content}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
