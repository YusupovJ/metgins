import { useNavigate, useParams } from "react-router-dom";
import { ChatInfo } from "../components/chat/chatInfo";
import { MessageList } from "../components/message/messageList";
import { WriteMessage } from "../components/chat/writeMessage";
import { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import { ChatList } from "../components/chat/chatList";
import { cn, isInDeep, scrollToBottom } from "@/lib/utils";
import { useMessages } from "@/hooks/useMessage";
import { Sidebar } from "@/components/sidebar";

interface Props {
  unselected?: boolean;
}

const Chat: FC<Props> = ({ unselected }) => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuthStore();
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const { data: messages } = useMessages(page, id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    scrollToBottom("instant");
  }, [messages]);

  useEffect(() => {
    const isMe = newMessages[newMessages.length - 1]?.user?.id === user?.id;
    if (isMe || isInDeep()) scrollToBottom();
  }, [newMessages]);

  const onChatChange = () => {
    setPage(1);
    setNewMessages([]);
  };

  useEffect(onChatChange, [id]);

  return (
    <div className="flex relative">
      <aside
        className={cn(
          `sticky transition-all top-0 left-0 max-h-screen flex`,
          unselected ? "basis-full lg:basis-[400px]" : "hidden basis-[400px] lg:flex"
        )}
      >
        <Sidebar className="shrink-0 grow-0 basis-20 bg-accent" />
        <div className="flex flex-col w-full">
          <ChatList className="grow" lastNewMessage={newMessages[newMessages.length - 1]} />
        </div>
      </aside>
      <main className={cn("bg-muted relative grow", unselected && "flex items-center justify-center min-h-[100dvh]")}>
        {!unselected ? (
          <>
            <ChatInfo />
            <div className="min-h-[calc(100dvh-72px-56px)]">
              <MessageList messages={messages} />
              <MessageList messages={newMessages} />
            </div>
            <WriteMessage setNewMessages={setNewMessages} />
          </>
        ) : (
          <p className="bg-background hidden lg:inline-block p-2 font-bold">Выберите чат для общения</p>
        )}
      </main>
    </div>
  );
};

export default Chat;
