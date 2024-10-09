import { cutTextOnLimit } from "@/lib/utils";
import { TMessageType } from "@/types";
import { FC } from "react";

interface Props2 {
  type: TMessageType;
  content: string;
}

export const LastMessage: FC<Props2> = ({ type, content }) => {
  if (type === "sticker") {
    return "Стикер";
  }

  if (type === "image") {
    return "Изображение";
  }

  return cutTextOnLimit(content, 15);
};
