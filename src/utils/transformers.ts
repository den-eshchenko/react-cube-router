import { TMessage, TTransformedGetRoomDataResponse } from "../types/events";

export const transformMessages = (roomName: string, messages: TMessage[]): TTransformedGetRoomDataResponse => {
  return {
    isConnected: false,
    messages: { [roomName]: messages }
  }
}