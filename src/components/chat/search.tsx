import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useFriends } from "@/hooks/useUser";
import { UserAvatar } from "../userAvatar";
import { cn } from "@/lib/utils";
import { useChatCreate, useChatList } from "@/hooks/useChat";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const { data: users, refetch } = useFriends(value);
  const { mutate: createChat } = useChatCreate();
  const { refetch: refetchChatList } = useChatList();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [value]);

  const writeToFriend = (id: number) => {
    createChat(
      { companionId: id, type: "personal" },
      {
        onSuccess({ id }) {
          navigate(`/chat/${id}`);
          refetchChatList();
        },
      }
    );
  };

  return (
    <div className="relative flex m-4">
      <Input
        className="w-full min-w-0"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск..."
      />
      <ul
        className={cn(
          "absolute w-full bottom-0 left-0 translate-y-full bg-accent z-20 transition-all",
          !focused && "invisible opacity-0"
        )}
      >
        {users?.map((user) => (
          <li
            className="p-3 flex items-center space-x-3 hover:bg-muted transition-all"
            onClick={() => writeToFriend(user.id)}
            key={user.id}
          >
            <UserAvatar src={user.avatar} name={user.username} />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
