import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { notification } from "antd";
import { isResponseRefreshToken } from "../typeguards/isResponseRefreshToken";

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3003/',
  prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token-access')}`);

      return headers;
  },
});

export const executeQueryWrapper: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    notification.error({
      message: result.error.status,
      description: 'Что-то пошло не так',
    })
  }

  const isAuthorizationEndpoint = typeof args === 'string' ? args === 'auth/authorization' : args.url === 'auth/authorization';

  if (result.error && result.error.status === 401 && !isAuthorizationEndpoint) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh-token',
        method: 'POST',
        body: { refresh_token: localStorage.getItem('token-refresh') }
      },
      api,
      extraOptions
    );
    if (refreshResult.error) {
      notification.error({
        message: 'Ошибка получения токена!',
        description: 'Сессия истекла, авторизуйтесь',
      })
    }

    if (refreshResult.data && isResponseRefreshToken(refreshResult.data)) {
      localStorage.setItem('token-access', refreshResult.data.access_token);

      result = await baseQuery(args, api, extraOptions)

      if (result.error) {
        notification.error({
          message: result.error.status,
          description: 'Что-то пошло не так',
        })
      }
    } else {
      localStorage.removeItem('token-access');
      localStorage.removeItem('token-refresh');
    }
  }
  return result
}