import { Dispatch, FC, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types";
import { useAuthStore } from "@/store/auth";
import { Message } from "./message";
import { MessageWrapper } from "./messageWrapper";

interface Props {
  messages?: IMessage[];
  className?: string;
  setPage?: Dispatch<SetStateAction<number>>;
}

export const MessageList: FC<Props> = ({ messages, className }) => {
  const { user } = useAuthStore();

  return (
    <div className={cn("flex flex-col gap-10 sm:gap-6 py-2 px-4 bg-muted", className)}>
      {messages?.map((message, index) => {
        const isMe = user?.id === message.user.id;

        return (
          <div
            className={cn("flex gap-2 sm:gap-4 items-end", isMe && "flex-row-reverse")}
            data-index={index}
            key={message.id}
          >
            <img
              src={message.user.avatar}
              alt={message.user.username}
              className="w-12 h-12 object-cover rounded-full"
            />
            <MessageWrapper message={message} isMe={isMe}>
              <Message message={message} />
            </MessageWrapper>
          </div>
        );
      })}
    </div>
  );
};
