export type ResponseAuth = {
  access_token: string;
  refresh_token: string;
};
export type RequestAuth = {
  username: string;
  password: string;
};

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type ResponseRefreshToken = {
  access_token: string;
};