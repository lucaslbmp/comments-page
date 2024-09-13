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
import { getImageUrl } from "../_utils";
import { Prisma } from "@prisma/client";
import TextArea from "./text-area";
import Button from "./button";
import submitComment from "../_actions/submit-comment";
import Modal, {
  ButtonClose,
  ButtonDanger,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "./modal";
import deleteComment from "../_actions/delete-comment";

type CommentBoxProps = {
  comment: FullCommentWithReplies | FullComment;
  user: Prisma.UserGetPayload<{ include: { image: true } }>;
};

const CommentBox = ({ comment, user }: CommentBoxProps) => {
  const { id, score } = comment;
  const isFromUser = comment.user.id === user?.id;

  const [editCommentIsOpen, setEditCommentIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
                <button
                  className="flex items-center gap-2"
                  onClick={() => setDeleteModalIsOpen(true)}
                >
                  <Image
                    width={14}
                    height={14}
                    alt="delete"
                    src="/icons/icon-delete.svg"
                  />
                  <span className="text-danger font-bold">Delete</span>
                </button>

                <button
                  className="flex items-center gap-2"
                  // onClick={(e) =>
                  //   handleEditComment(comment.id, e?.currentTarget?.value)
                  // }
                  onClick={() => setEditCommentIsOpen((state) => !state)}
                >
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
        <form
          className="mt-4"
          action={async (data) => {
            await submitComment({
              data,
              commentId: comment.id,
              userId: user.id,
            });
            setEditCommentIsOpen(false);
          }}
        >
          {!editCommentIsOpen ? (
            <>
              <span className="text-fgSecondary font-semibold">
                @{comment.user.username}{" "}
              </span>
              <span>{comment.content}</span>
            </>
          ) : (
            <>
              <TextArea name="comment-content" defaultValue={comment.content} />
              <Button
                type="submit"
                //onClick={() => setEditCommentIsOpen(false)}
              >
                Update
              </Button>
            </>
          )}
        </form>
      </div>

      <Modal
        isOpen={deleteModalIsOpen}
        onClose={() => setDeleteModalIsOpen(false)}
      >
        <ModalHeader>Delete comment</ModalHeader>
        <ModalBody>
          {
            "Are you sure do you want to delete this comment? This will remove the comment and can't be undone."
          }
        </ModalBody>
        <ModalFooter>
          <form
            action={async () => {
              await deleteComment({ id: comment.id });
              setDeleteModalIsOpen(false);
            }}
            className="flex justify-between w-full"
          >
            <ButtonClose onClick={() => setDeleteModalIsOpen(false)}>
              No, cancel
            </ButtonClose>
            <ButtonDanger type="submit">Yes, delete</ButtonDanger>
          </form>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CommentBox;
