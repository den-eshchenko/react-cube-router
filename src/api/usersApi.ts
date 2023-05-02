import { commonApi } from "./commonApi";

export const usersApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    rooms: builder.query<string[], string>({
      query: (userLogin) => ({
        url: `users/rooms/${userLogin}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useRoomsQuery } = usersApi