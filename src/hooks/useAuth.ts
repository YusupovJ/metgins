import { LOGIN_KEY, LOGOUT_KEY, ME_KEY, REGISTER_KEY } from "@/lib/constants";
import { getLocalStorage } from "@/lib/utils";
import { fetchLogin, fetchLogout, fetchMe, fetchRegister } from "@/services/authService";
import { useAuthStore } from "@/store/auth";
import { ILoginData, IRegisterData, ITokens, TError } from "@/types";
import { useMutation, useQuery } from "react-query";

export const useSignIn = () => {
  return useMutation<ITokens, TError, ILoginData>(LOGIN_KEY, fetchLogin);
};

export const useSignUp = () => {
  return useMutation<ITokens, TError, IRegisterData>(REGISTER_KEY, fetchRegister);
};

export const useLogout = () => {
  return useMutation<void, TError, null>(LOGOUT_KEY, fetchLogout);
};

export const useMe = () => {
  const { setIsAuthenticated, setUser } = useAuthStore();
  const accessToken = getLocalStorage("accessToken");

  return useQuery(ME_KEY, fetchMe, {
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
    },
    onError: () => {
      setIsAuthenticated(false);
      setUser(null);
    },
    enabled: !!accessToken,
  });
};
