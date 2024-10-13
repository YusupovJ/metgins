import { useChatList } from "@/hooks/useChat";
import { cn, cutTextOnLimit } from "@/lib/utils";
import { Dispatch, FC, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import { UserAvatar } from "../userAvatar";

interface Props {
  className?: string;
  setSize?: Dispatch<SetStateAction<boolean>>;
}

export const ChatList: FC<Props> = ({ className }) => {
  const { id } = useParams();
  const { data: chatList } = useChatList();

  if (!chatList?.length) {
    return <h4 className={cn("text-muted-foreground text-lg text-center mt-10", className)}>У вас нету чатов</h4>;
  }

  return (
    <div className={cn("flex flex-col overflow-auto", className)}>
      {chatList.map((chat) => {
        return (
          <Link
            to={`/chat/${chat.id}`}
            key={chat.id}
            className={cn(
              "flex py-5 px-3 gap-3 items-center hover:bg-muted transition-all",
              id === chat.id && "bg-muted"
            )}
          >
            <UserAvatar src={chat.img} name={chat.name} />
            <p className="font-semibold mb-1">{cutTextOnLimit(chat.name, 20)}</p>
          </Link>
        );
      })}
    </div>
  );
};
