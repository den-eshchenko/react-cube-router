export type TMessage = {
  form: string
  message: string
  email: string
}

export type TMessages = Record<string, TMessage[]>

export type TTransformedGetRoomDataResponse = {
  isConnected: boolean
  messages: TMessages
}