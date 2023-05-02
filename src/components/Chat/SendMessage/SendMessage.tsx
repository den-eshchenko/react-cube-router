import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space } from 'antd'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { getSocket } from '../../../api/socket'
import { useAppSelector } from '../../../app/store'
import styles from './SendMessage.module.css'

type TSendMessage = {
  roomName: string
}

export const SendMessage: React.FC<TSendMessage> = ({ roomName }) => {
  const userLogin = useAppSelector((state) => state.auth.login);
  const [form] = Form.useForm()
  const socket = getSocket()

  const handleSend = async () => {
    try {
      const values = await form.validateFields()
      
      socket?.emit?.('rooms/message', { message: values.message, userLogin, roomName })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
          <Form form={form}>
            <Space.Compact style={{ width: '100%' }}>
              <Form.Item name="message" >
                <Input size="large" placeholder="Enter message" prefix={<UserOutlined />} />
              </Form.Item>
              <Button
                type="primary"
                icon={<SendOutlined className={styles.sendButton} />}
                size="large"
                onClick={handleSend}
              >
                Send
              </Button>
            </Space.Compact>
          </Form>
        </div>
      </div>
  )
}