export const baseURL = import.meta.env.VITE_BASEURL;

export const urls = {
  auth: {
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  chat: {
    create: "/chat",
    getAll: "/chat",
    getOne: (id?: string) => `/chat/${id}`,
  },
  message: {
    getAll: (chatId?: string) => `/message?chatId=${chatId}`,
  },
  upload: {
    add: "/upload",
    multi: "/upload/multiple",
  },
  user: {
    getAll: (page?: string | null) => `/user?page=${page || 1}&limit=10`,
    update: (id: number) => `/user/${id}`,
    getFriends: (value: string) => `/user/friend?search=${value}`,
  },
};
