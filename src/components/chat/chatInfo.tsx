import { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowBigLeft, Share2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cutTextOnLimit, shareLink } from "@/lib/utils";
import { useChatInfo } from "@/hooks/useChat";

interface Props {
  className?: string;
}

export const ChatInfo: FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const { data: chat, refetch } = useChatInfo(id);

  useEffect(() => {
    refetch();
  }, [pathname]);

  const leave = () => {
    navigate("/chat");
  };

  return (
    <div className="sticky flex bg-primary justify-between items-center py-4 top-0 left-0 w-full px-4 shadow-md shadow-muted scroll-margin z-10">
      <Button variant="outline" className="font-bold flex gap-2 p-2 lg:hidden" onClick={leave}>
        <ArrowBigLeft size="20" />
      </Button>
      <h2 className="font-bold text-white break-all px-2">{cutTextOnLimit(String(chat?.name), 40)}</h2>
      <Button variant="outline" className="font-bold flex gap-2 p-2" onClick={shareLink}>
        <p className="hidden lg:block">Пригласить</p> <Share2 size="20" />
      </Button>
    </div>
  );
};
