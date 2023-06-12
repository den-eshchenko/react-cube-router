export type ResponseAuth = Tokens & {
  login: string;
};
export type RequestAuth = {
  login: string;
  password: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
}

export type ResponseRefreshToken = Pick<Tokens, 'access_token'>

export type RequestRegistration = {
  login: string;
  fullName: string;
  email: string;
  password: string;
}