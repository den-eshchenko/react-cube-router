import { io } from 'socket.io-client';

let socket: ReturnType<typeof io> | null = null

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3003', { autoConnect: false });
  }

  return socket
}