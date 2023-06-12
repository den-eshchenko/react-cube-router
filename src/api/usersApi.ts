import { TRooms } from "../types/events";
import { commonApi } from "./commonApi";

export const usersApi = commonApi.injectEndpoints({
  endpoints: (builder) => ({
    rooms: builder.query<TRooms, string>({
      query: (userLogin) => ({
        url: `users/rooms/${userLogin}`,
        method: 'GET',
      }),
      providesTags: ['ROOMS'],
    }),
  }),
})

export const { useRoomsQuery } = usersApi