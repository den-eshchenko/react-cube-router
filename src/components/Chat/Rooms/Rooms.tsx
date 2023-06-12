import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { AddRoom } from './AddRoom/AddRoom'
import { Room } from './Room/Room'
import { TRooms } from '../../../types/events'
import styles from './Rooms.module.css'

type TProps = {
  rooms?: TRooms
  isConnected: boolean
  activeRoom: string
  setActiveRoom: React.Dispatch<React.SetStateAction<string>>
}

export const Rooms: React.FC<TProps> = ({ isConnected, activeRoom, setActiveRoom, rooms }) => {
  console.log('rooms', rooms)
  // const userLogin = useAppSelector((state) => state.auth.login)
  const [isOpen, setIsOpen] = useState(false);

  // const { data: rooms } = useRoomsQuery(userLogin || '', { skip: !userLogin })

  const handleOpen = () => {
    setIsOpen(true)
  }

  // useEffect(() => {
  //   if (!activeRoom && rooms && userLogin) {
  //     setActiveRoom(userLogin)
  //   }
  // }, [activeRoom, rooms, setActiveRoom, userLogin])


  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.iconWithTitle} onClick={handleOpen}>
          <div><PlusCircleTwoTone className={styles.plus} /></div>
          <div>Add new room</div>
        </div>
        {/* <div className={styles.iconWithTitle}>
          <div>
            <Badge dot status={isConnected ? 'success' : 'error' }>
              <Avatar size="large" icon={<UserOutlined />} />
            </Badge>
          </div>
          <div>{userLogin}</div>
        </div> */}
        {Object.keys(rooms || {}).map((roomName) => {
          return (
            <Room
              key={roomName}
              roomName={roomName}
              isActive={activeRoom === roomName}
              setActiveRoom={setActiveRoom}
            />
          )
        })}
      </div>
      <AddRoom isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}