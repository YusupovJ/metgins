import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IChat, ICreateChat } from "@/types";

export const fetchOneChat = async (id?: string) => {
  const { data } = await api.get<IChat>(urls.chat.getOne(id));
  return data;
};

export const fetchChatList = async () => {
  const { data } = await api.get<IChat[]>(urls.chat.getAll);
  return data;
};

export const fetchChatCreate = async (body: ICreateChat) => {
  const { data } = await api.post<IChat>(urls.chat.create, body);
  return data;
};
