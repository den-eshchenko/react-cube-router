import { UserOutlined } from '@ant-design/icons'
import { Avatar, List } from 'antd'
import VirtualList from 'rc-virtual-list'
import { useState } from 'react';
import styles from './Messages.module.css'

interface Message {
  user: string;
  message: string
}

const messages = Array.from(Array(10).keys()).map((_, i) => ({ user: 'Ivan' + i, message: 'New message' + i }))
const ContainerHeight = window.innerHeight - 100;

export const Messages = () => {
  const [data] = useState<Message[]>(messages);

  // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  //   if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
  //     appendData();
  //   }
  // };

  
  return (
    <div className={styles.wrapper}>
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="user"
          // onScroll={onScroll}
        >
          {(item: Message) => (
            <List.Item key={item.user}>
              <List.Item.Meta
                title={
                  <div className={styles.title}>
                    <Avatar size="large" icon={<UserOutlined />} />{item.user}
                  </div>
                }
                description={
                  <div className={styles.description}>{item.message}</div>
                }
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  )
}