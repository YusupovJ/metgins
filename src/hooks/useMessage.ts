import { MESSAGES_KEY } from "@/lib/constants";
import { fetchMessages } from "@/services/messageService";
import { IMessage, TError } from "@/types";
import { useQuery } from "react-query";

export const useMessages = (id?: string) => {
  return useQuery<IMessage[], TError>(
    [MESSAGES_KEY, id],
    async () => {
      const { data } = await fetchMessages(id);
      return data;
    },
    { enabled: !!id }
  );
};
