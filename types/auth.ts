export interface IAuthStore {
  token: string;
  wsToken: string;
  getToken: () => Promise<string | null>;
  login: (data: TPayloadLogin) => Promise<TResponseLogin>;
  logout: () => Promise<TResponseLogin>;
}
export interface IAuthPersistStore {
  checkMe: () => Promise<TResponseMe>;
}

export type TPayloadLogin = {
  email: string;
  password: string;
};

export type TResponseLogin = {
  message: string;
};

export type TResponseMe = {
  id: string;
  name: string;
  email: string;
  role: string;
};
