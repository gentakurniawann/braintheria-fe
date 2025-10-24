export interface IAuthStore {
  token: string;
  wsToken: string;
  user: TResponseMe | null;
  getToken: () => Promise<string | null>;
  setToken: (token: string) => void;
  getUserCredential: () => Promise<TResponseMe | null>;
  setUserCredential: (user: TResponseMe) => void;
  logout: () => void;
}
export interface IAuthPersistStore {
  checkMe: () => Promise<TResponseMe>;
}

export type TResponseLogin = {
  message: string;
};

export type TResponseMe = {
  id: number;
  email: string;
  username: string;
  primaryWallet: string;
  walletBalance: TWalletBalance;
};

export interface TWalletBalance {
  address: string;
  wei: string;
  eth: string;
}
