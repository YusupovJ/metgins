import { ModalProps } from "@/components/ui/modal";
import { loginSchema } from "@/validations/loginSchema";
import { registerSchema } from "@/validations/registerSchema";
import { AxiosError } from "axios";
import { ReactNode } from "react";
import { InferType } from "yup";

/* Base types ------------ */

export interface IError {
  error: string;
  message: string;
  statusCode: number;
}

export type TError = AxiosError<IError>;

export interface IPagination {
  totalItems: number;
  offset: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface IApiReponse<T> {
  data: T;
  date: string;
  pagination: IPagination | null;
  status: number;
}

export interface IRoutes {
  id: number;
  path: string;
  component: ReactNode;
}

/* Auth -------------- */

export interface IMe {
  username: string;
  avatar: string;
  id: number;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type ILoginData = InferType<typeof loginSchema>;
export type IRegisterData = InferType<typeof registerSchema>;

export interface IRefreshData {
  refreshToken: string;
}

/* Store --------------- */

export interface IAuthStore {
  user: IMe | null;
  isAuthenticated: boolean;
  setUser: (user: IMe | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export type TTheme = "dark" | "light";

export interface IThemeStore {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  setThemeState: (theme: TTheme) => void;
}

export interface IModalStore {
  openModals: IModal;
  openModal: (name: TModal) => void;
  closeModal: (...names: TModal[]) => void;
}

export type TModal = "newchat" | "userinfo" | "logout";
export type IModal = { [key in TModal]?: boolean };

export interface IModalList {
  id: number;
  component: ReactNode;
  props: ModalProps;
}

/* --------------------- */

export interface IChat {
  id: string;
  name: string;
  img: string;
  type: "personal" | "group";
  messages: IMessage[];
  created_at: string;
  updated_at: string;
}

export interface IMessage {
  id: number;
  content: string;
  user: IMe;
  type: TMessageType;
  chat: IChat;
  created_at: string;
  updated_at: string;
}

export interface ICreateChat {
  name: string;
  img: string;
}

export interface IUploadFile {
  url: string;
  filename: string;
  size: number;
  originalname: string;
  mimetype: string;
}

export type TMessageType = "sticker" | "text" | "image";

export interface IUpdateUserData {
  username?: string;
  avatar?: string;
  password?: string;
}

export interface IUpdateUser {
  id: number;
  user: IUpdateUserData;
}
