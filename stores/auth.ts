import { create } from "zustand";
import { persist } from "zustand/middleware";

import { login, logout, getMe } from "@/services/auth";
import { getCookies, setCookies, deleteCookie } from "@/utils/cookie";
import { IAuthStore, IAuthPersistStore, TResponseMe } from "@/types/auth";

const useAuth = create<IAuthStore>((set, get) => ({
  // state
  token: "a",
  wsToken: "",
  tempUser: "",

  // actions
  getToken: async () => {
    if (get().token) {
      return get().token;
    }

    try {
      const tokenCookie = await getCookies("token");
      if (tokenCookie?.value) {
        setCookies("token", tokenCookie.value);
        set({ token: tokenCookie.value });
        return tokenCookie.value;
      }
    } catch (error) {
      console.error("Error store getToken:", error);
      throw error;
    }

    return null;
  },
  login: async (data) => {
    try {
      const response = await login(data);
      if (response) {
        setCookies("tempUser", data.email);
      }
      return response;
    } catch (error) {
      console.error("Error store setToken:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const res = await logout();
      if (res) {
        deleteCookie("isLoggedIn");
      }
      return res;
    } catch (error) {
      console.error("Error store logout:", error);
      throw error;
    }
  },
}));

export const useAuthPersist = create<IAuthPersistStore>()(
  persist(
    (setState) => ({
      // state
      me: {} as TResponseMe,
      permission: [],
      menu: [],

      // actions
      checkMe: async () => {
        try {
          const me = await getMe();
          setState((state) => ({
            ...state,
            me: me || {},
          }));
          return me;
        } catch (error) {
          console.error("Error store checkMe:", error);
          throw error;
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuth;
