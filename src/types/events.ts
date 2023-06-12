export type TMessage = {
  userLogin: string
  message: string
  email: string
  isJoin?: boolean
}

export type TMessages = Record<string, TMessage[]>

export type TTransformedGetRoomDataResponse = {
  isConnected: boolean
  rooms: TRooms
}

export type TRoom = {
  users: string[];
  messages: TMessage[];
  roomCreator?: string;
};

export type TRooms = Record<string, TRoom>;