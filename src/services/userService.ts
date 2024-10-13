import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IMe, IUpdateUser } from "@/types";

export const fetchUsers = async (page?: string | null) => {
  const { data, pagination } = await api.get<IMe[]>(urls.user.getAll(page));
  return { data, pagination };
};

export const fetchFriends = async (value: string) => {
  const { data } = await api.get(urls.user.getFriends(value));
  return data;
};

export const updateUsers = async ({ id, user }: IUpdateUser) => {
  const { data } = await api.patch(urls.user.update(id), user);
  return data;
};
