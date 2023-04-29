import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import styles from './SendMessage.module.css'

export const SendMessage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      <Space.Compact style={{ width: '100%' }}>
        <Input size="large" placeholder="Enter message" prefix={<UserOutlined />} />
        <Button type="primary" icon={<SendOutlined className={styles.sendButton} />} size="large">Send</Button>
      </Space.Compact>
        {/* <Input size="large" placeholder="Enter message" prefix={<UserOutlined />} />
        <Button type="primary" icon={<SendOutlined />} size="large">
          Send
        </Button> */}
      </div>
    </div>
  )
}