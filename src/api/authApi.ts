import { RequestAuth, RequestRegistration, ResponseAuth } from '../types/auth';
import { commonApi } from './commonApi';

export const authApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
      auth: builder.mutation<ResponseAuth, RequestAuth>({
        query: (body) => ({
          url: 'auth/authorization',
          method: 'POST',
          body,
        }),
      }),
      registration: builder.mutation<void, RequestRegistration>({
        query: (body) => ({
          url: 'auth/registration',
          method: 'POST',
          body,
        }),
      }),
      check: builder.query<{ login: string }, void>({
        query: () => ({ 
          url: 'auth/check',
          method: 'GET',
         })
      })
    }),
  });

export const { useAuthMutation, useRegistrationMutation, useLazyCheckQuery } = authApi;

// export const messageApi = commonApi.injectEndpoints({
//   endpoints: (build) => ({
//     getMessages: build.query<any, any>({
//       query: (channel) => `messages/${channel}`,
//       async onCacheEntryAdded(
//         arg,
//         { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
//       ) {
//         // create a websocket connection when the cache subscription starts
//         const ws = new WebSocket('ws://localhost:8080')
//         try {
//           // wait for the initial query to resolve before proceeding
//           await cacheDataLoaded

//           // when data is received from the socket connection to the server,
//           // if it is a message and for the appropriate channel,
//           // update our query result with the received message
//           const listener = (event: MessageEvent) => {
//             const data = JSON.parse(event.data)
//             if (!data || data.channel !== arg) return

//             updateCachedData((draft) => {
//               draft.push(data)
//             })
//           }

//           ws.addEventListener('message', listener)
//         } catch {
//           // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
//           // in which case `cacheDataLoaded` will throw
//         }
//         // cacheEntryRemoved will resolve when the cache subscription is no longer active
//         await cacheEntryRemoved
//         // perform cleanup steps once the `cacheEntryRemoved` promise resolves
//         ws.close()
//       },
//     }),
//   }),
// });