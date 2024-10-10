import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IMessage } from "@/types";

export const fetchMessages = async (id?: string) => {
  const response = await api.get<IMessage[]>(urls.message.getAll(id));
  return response;
};
