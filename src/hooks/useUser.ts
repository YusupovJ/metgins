import { FRIEND_KEY, USER_KEY, USER_UPDATE_KEY } from "@/lib/constants";
import { fetchFriends, fetchUsers, updateUsers } from "@/services/userService";
import { IMe, IPagination, IUpdateUser, TError } from "@/types";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

interface IUseUsers {
  data: IMe[];
  pagination: IPagination | null;
}

export const useUsers = () => {
  const [searchParams] = useSearchParams();
  const page = useMemo(() => searchParams.get("page"), [searchParams]);
  return useQuery<IUseUsers, TError>([USER_KEY, page], () => fetchUsers(page));
};

export const useUserUpdate = () => {
  return useMutation<IMe, TError, IUpdateUser>(USER_UPDATE_KEY, updateUsers);
};

export const useFriends = (value: string) => {
  return useQuery<IMe[], TError>(FRIEND_KEY, () => fetchFriends(value), {
    enabled: value.length > 2,
  });
};
