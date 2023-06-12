import { TRooms, TTransformedGetRoomDataResponse } from "../types/events";

export const transformMessages = (rooms: TRooms): TTransformedGetRoomDataResponse => {
  return {
    isConnected: false,
    rooms,
  }
}