import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

type ResponseAuth = {
  access_token: string;
  refresh_token: string;
};
type RequestAuth = {
  username: string;
  password: string;
};

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

type ResponseRefreshToken = {
  access_token: string;
};

const responseRefreshToken = (response: unknown): response is ResponseRefreshToken => {
  if (typeof response === 'object' && response !== null && 'access_token' in response) {
    return true
  }
  return false;
};

export type RefreshToken = Omit<Tokens, "access_token">;
export type AccessToken = Omit<Tokens, "refresh_token">;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/',
  prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json;charset=UTF-8');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token-access')}`);

      return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  const isAuthorizationEndpoint = typeof args === 'string' ? args === 'auth/authorization' : args.url === 'auth/authorization';

  if (result.error && result.error.status === 401 && !isAuthorizationEndpoint) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh-accessToken',
        method: 'POST',
        body: { refresh_token: localStorage.getItem('token-refresh') }
      },
      api,
      extraOptions
    );

    if (refreshResult.data && responseRefreshToken(refreshResult.data)) {
      localStorage.setItem('token-access', refreshResult.data.access_token);

      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem('token-access');
      localStorage.removeItem('token-refresh');
      console.log('logout');
    }
  }
  return result
}

export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // tagTypes: ['Post', 'Post2'],
  endpoints: _ => ({}),
});

export const authApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
      auth: builder.mutation<ResponseAuth, RequestAuth>({
        query: (body) => ({
          url: 'auth/authorization',
          method: 'POST',
          body,
        }),
      }),
    }),
  });

  export const { useAuthMutation } = authApi;

  export const testApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
      test: builder.mutation<any, any>({
        query: (body) => ({
          url: 'test/data',
          method: 'POST',
          body,
        }),
      }),
    }),
  });

  export const { useTestMutation } = testApi;

  export const messageApi = commonApi.injectEndpoints({
    endpoints: (build) => ({
      getMessages: build.query<any, any>({
        query: (channel) => `messages/${channel}`,
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          // create a websocket connection when the cache subscription starts
          const ws = new WebSocket('ws://localhost:8080')
          try {
            // wait for the initial query to resolve before proceeding
            await cacheDataLoaded
  
            // when data is received from the socket connection to the server,
            // if it is a message and for the appropriate channel,
            // update our query result with the received message
            const listener = (event: MessageEvent) => {
              const data = JSON.parse(event.data)
              if (!data || data.channel !== arg) return
  
              updateCachedData((draft) => {
                draft.push(data)
              })
            }
  
            ws.addEventListener('message', listener)
          } catch {
            // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            // in which case `cacheDataLoaded` will throw
          }
          // cacheEntryRemoved will resolve when the cache subscription is no longer active
          await cacheEntryRemoved
          // perform cleanup steps once the `cacheEntryRemoved` promise resolves
          ws.close()
        },
      }),
    }),
  });