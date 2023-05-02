import { TMessage, TTransformedGetRoomDataResponse } from "../types/events";
import { transformMessages } from "../utils/transformers";
import { commonApi } from "./commonApi";
import { getSocket } from "./socket";

export const eventsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getRoomData: build.query<TTransformedGetRoomDataResponse, { userLogin: string, roomName: string }>({
      query: ({ roomName, userLogin }) => `rooms/${userLogin}/${roomName}`,
      transformResponse(response: TMessage[], _, args) {
        const roomName = args.roomName
        const transformedData = transformMessages(roomName, response)

        return transformedData
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = getSocket()

        const handleOnConnect = () => {
          console.log('handleOnConnect')
          // updateCachedData((draft) => {
          //   draft.push({ isConnected: true })
          // })
        }
        const handleOnDisconnect = () => {
          console.log('handleOnDisconnect')
        }
        const handleException = () => {
          console.log('handleException')
        }
        const handleOnMessagesEvent = () => {
          console.log('handleOnMessagesEvent')
        }
        const handleRoomsJoinedEvent = () => {
          console.log('handleRoomsJoinedEvent')
        }

        try {
          await cacheDataLoaded

          socket?.on?.('connect', handleOnConnect);
          socket?.on?.('exception', handleException);
          socket?.on?.('disconnect', handleOnDisconnect);
          socket?.on?.('rooms/message', handleOnMessagesEvent);
          socket?.on?.('rooms/joined', handleRoomsJoinedEvent);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved

        socket?.off?.('connect', handleOnConnect);
        socket?.off?.('exception', handleException);
        socket?.off?.('disconnect', handleOnDisconnect);
        socket?.off?.('rooms/message', handleOnMessagesEvent);
        socket?.off?.('rooms/joined', handleRoomsJoinedEvent);
      },
    }),
  }),
});

export const { useGetRoomDataQuery } = eventsApi