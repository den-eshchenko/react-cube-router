import { useCallback, useEffect, useState } from 'react';
import { socket } from '../../../api/socket';
import { Chat } from '../../Chat/Chat'
import styles from './ChatPage.module.css'

export const ChatPage = () => {
  const [io] = useState(socket.connect())
  const [isConnected, setIsConnected] = useState(io.connected);
  const [fooEvents, setFooEvents] = useState<{ text: string }[]>([]);

  console.log('isConnected', isConnected)
  console.log('fooEvents', fooEvents)

  const handleOnConnect = useCallback(() => {
    setIsConnected(true)
  }, [])

  const handleOnDisconnect = useCallback(() => {
    setIsConnected(false)
  }, [])

  const handleOnMessagesEvent = useCallback((message: { text: string }) => {
    setFooEvents(previous => [...previous, message])
  }, [])

  useEffect(() => {
    socket.on('connect', handleOnConnect);
    socket.on('disconnect', handleOnDisconnect);
    socket.on('messages', handleOnMessagesEvent);

    socket.emit('messages', { hello: 'kek' })

    return () => {
      socket.off('connect', handleOnConnect);
      socket.off('disconnect', handleOnDisconnect);
      socket.off('messages', handleOnMessagesEvent);
    };
  }, [handleOnConnect, handleOnDisconnect, handleOnMessagesEvent]);

  return (
  <div className={styles.wrapper}>
    <Chat isConnected={isConnected} />
  </div>
  )
}