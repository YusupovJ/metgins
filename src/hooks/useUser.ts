import { USER_KEY, USER_UPDATE_KEY } from "@/lib/constants";
import { fetchUsers, updateUsers } from "@/services/userService";
import { IMe, IUpdateUser, TError } from "@/types";
import { useMutation, useQuery } from "react-query";

export const useUsers = () => {
  return useQuery<IMe[], TError>(USER_KEY, fetchUsers);
};

export const useUserUpdate = () => {
  return useMutation<IMe, TError, IUpdateUser>(USER_UPDATE_KEY, updateUsers);
};
