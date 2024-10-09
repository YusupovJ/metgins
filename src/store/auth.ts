import { IAuthStore, IMe } from "@/types";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isAuthenticated: true,
  setUser: (user: IMe | null) => set(() => ({ user })),
  setIsAuthenticated: (isAuthenticated: boolean) => set(() => ({ isAuthenticated })),
}));
