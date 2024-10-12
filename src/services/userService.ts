import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IMe, IUpdateUser } from "@/types";

export const fetchUsers = async () => {
  const { data } = await api.get<IMe[]>(urls.user.getAll);
  return data;
};

export const updateUsers = async ({ id, user }: IUpdateUser) => {
  const { data } = await api.patch(urls.user.update(id), user);
  return data;
};
