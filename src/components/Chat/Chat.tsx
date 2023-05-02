import { useState } from 'react'
import { Messages } from './Messages/Messages'
import { SendMessage } from './SendMessage/SendMessage'
import { Rooms } from './Rooms/Rooms'
import { useAppSelector } from '../../app/store'
import { useGetRoomDataQuery } from '../../api/events'
import styles from './Chat.module.css'


export const Chat: React.FC = () => {
  const userLogin = useAppSelector((state) => state.auth.login)
  const [rooms, setRooms] = useState<string[]>([])
  const [activeRoom, setActiveRoom] = useState('')
  const { data: messagesSocket } = useGetRoomDataQuery({ userLogin: userLogin || '', roomName: activeRoom }, { skip: !userLogin || !activeRoom })

  const isConnected = !!messagesSocket?.isConnected

  return (
    <>
      <Rooms isConnected={isConnected} />
      <div className={styles.wrapper}>
        <Messages />
        <SendMessage roomName={activeRoom} />
      </div>
    </>
  )
}