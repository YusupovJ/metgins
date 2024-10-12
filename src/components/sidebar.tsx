import { cn } from "@/lib/utils";
import { FC } from "react";
import { User, MessageCirclePlus } from "lucide-react";
import { useModalStore } from "@/store/modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

export const Sidebar: FC<Props> = ({ className }) => {
  const { openModal } = useModalStore();

  return (
    <div className={cn("flex flex-col justify-between py-7", className)}>
      <div className="flex flex-col items-center px-3">
        <h2 className="text-lg mt-2">Logo</h2>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Tooltip message="Создать чат">
          <Button variant="ghost" aria-label="Создать чат" onClick={() => openModal("newchat")}>
            <MessageCirclePlus stroke="inherit" size="32" />
          </Button>
        </Tooltip>
        <Tooltip message="Информация о пользователе">
          <Button variant="ghost" aria-label="Информация о пользователе" onClick={() => openModal("userinfo")}>
            <User stroke="inherit" size="32" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
