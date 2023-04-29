import { Messages } from './Messages/Messages'
import { SendMessage } from './SendMessage/SendMessage'
import { Rooms } from './Rooms/Rooms'
import styles from './Chat.module.css'

type TChat = {
  isConnected: boolean
}

export const Chat: React.FC<TChat> = ({ isConnected }) => {
  return (
    <>
      <Rooms isConnected={isConnected} />
      <div className={styles.wrapper}>
        <Messages />
        <SendMessage />
      </div>
    </>
  )
}