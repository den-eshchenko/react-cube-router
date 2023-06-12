import { TRooms, TTransformedGetRoomDataResponse } from "../types/events";
import { transformMessages } from "../utils/transformers";
import { commonApi } from "./commonApi";
import { getSocket } from "./socket";

export const eventsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getRoomData: build.query<TTransformedGetRoomDataResponse, { userLogin: string }>({
      query: ({ userLogin }) => `users/rooms/${userLogin}`,
      transformResponse(response: TRooms) {
        const transformedData = transformMessages(response);

        return transformedData;
      },
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
        const socket = getSocket();

        const handleOnConnect = () => {
          console.log("handleOnConnect");
          updateCachedData((draft) => {
            draft.isConnected = true;
          });
        };
        const handleOnDisconnect = () => {
          console.log("handleOnDisconnect");
          updateCachedData((draft) => {
            draft.isConnected = false;
          });
        };
        const handleException = () => {
          console.log("handleException");
        };
        const handleOnMessagesEvent = ({ userLogin, email, message, roomName }: { userLogin: string; email: string; message: string; roomName: string }) => {
          updateCachedData((draft) => {
            draft.rooms[roomName] = {
              ...draft.rooms[roomName],
              messages: [...draft.rooms[roomName].messages, { message, userLogin, email }]
            };
          });
          console.log("handleOnMessagesEvent");
        };
        const handleRoomsJoinedEvent = ({ roomName, message }: {
          roomName: string;
          message?: {
            email: string;
            message: string;
            userLogin: string;
            isJoin: boolean;
          }
      }) => {
          // dispatch(commonApi.util.invalidateTags(['ROOMS']))
          updateCachedData((draft) => {
            const aldMessages = draft.rooms[roomName]?.messages || [];
            const oldUsers = draft.rooms[roomName]?.users || [];

            if (message) {
              draft.rooms = {
                ...draft.rooms,
                [roomName]: {
                  messages: [
                    ...aldMessages,
                    message,
                  ],
                  users: [...oldUsers, message.userLogin],
                }
              };
            } else {
              draft.rooms = {
                ...draft.rooms,
                [roomName]: {
                  messages: [],
                  users: [],
              }
            };
            }
          });
          console.log("handleRoomsJoinedEvent");
        };
        // const handleRoomsJoinEvent = (roomName: string) => {
        //   updateCachedData((draft) => {
        //     draft.rooms = {
        //       ...draft.rooms,
        //       [roomName]: {
        //         messages: [],
        //         users: [],
        //       }
        //     }
        //   })
        //   // dispatch(commonApi.util.invalidateTags(['ROOMS']))
        //   console.log('handleRoomsJoinEvent')
        // }

        try {
          await cacheDataLoaded;

          socket.connect();

          socket.on("connect", handleOnConnect);
          socket.on("exception", handleException);
          socket.on("disconnect", handleOnDisconnect);
          socket.on("rooms/message", handleOnMessagesEvent);
          // socket.on('rooms/join', handleRoomsJoinEvent);
          socket.on("rooms/joined", handleRoomsJoinedEvent);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;

        // socket.close()
        socket.off("connect", handleOnConnect);
        socket.off("exception", handleException);
        socket.off("disconnect", handleOnDisconnect);
        socket.off("rooms/message", handleOnMessagesEvent);
        // socket.off('rooms/join', handleRoomsJoinEvent)
        socket.off("rooms/joined", handleRoomsJoinedEvent);
      },
    }),
  }),
});

export const { useGetRoomDataQuery } = eventsApi;