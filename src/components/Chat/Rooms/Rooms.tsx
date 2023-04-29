import { useState } from 'react'
import { PlusCircleTwoTone, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge,  } from 'antd'
import { AddRoom } from './AddRoom/AddRoom'
import { useAppSelector } from '../../../app/store'
import styles from './Rooms.module.css'

type TRooms = {
  isConnected: boolean
}

export const Rooms: React.FC<TRooms> = ({ isConnected }) => {
  const user = useAppSelector((state) => state.auth.login)
  const [isOpen, setIsOpen] = useState(false);

  const handleAddRoom = () => {
    setIsOpen(true)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.iconWithTitle} onClick={handleAddRoom}>
          <div><PlusCircleTwoTone className={styles.plus} /></div>
          <div>Add new room</div>
        </div>
        <div className={styles.iconWithTitle}>
          <div>
            <Badge dot status={isConnected ? 'success' : 'error' }>
              <Avatar size="large" icon={<UserOutlined />} />
            </Badge>
          </div>
          <div>{user}</div>
        </div>
        {/* <div className={styles.iconWithTitle}>
          <div><Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /></div>
          <div>Комната</div>
        </div> */}
      </div>
      <AddRoom isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}