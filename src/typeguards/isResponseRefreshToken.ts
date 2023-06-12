import { ResponseRefreshToken } from "../types/auth";

export const isResponseRefreshToken = (response: unknown): response is ResponseRefreshToken => {
  if (typeof response === 'object' && response !== null && 'access_token' in response) {
    return true
  }
  return false;
};