import { Form, Input, Modal } from "antd"
import { FC, useState } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { getSocket } from "../../../../api/socket";
import { useAppSelector } from "../../../../app/store";

type TAddRoom = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddRoom: FC<TAddRoom> = ({ isOpen, setIsOpen }) => {
  const userLogin = useAppSelector((state) => state.auth.login)
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false);
  const socket = getSocket()

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      const values = await form.validateFields()
      console.log(socket);
      
      socket?.emit?.('rooms/join', { roomName: values.roomName, userLogin })
      setIsOpen(false)
    } catch(error) {
      console.error(error)
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleCancel = () => {
    setIsOpen(false)
  }


  return (
    <Modal
        title="New room"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="roomName"
            label="New room name"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Field is required' }]}
          >
            <Input placeholder="Enter new room name" />
          </Form.Item>
          {/* <Form.Item
            name="roomUsers"
            label="Add users to a room"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Field is required' }]}
          >
            <Select
              mode="multiple"
              placeholder="Add users"
              options={[{ label: '123', value: '123' }, { label: 456, value: 456 }]} // получить пользователей
            />
          </Form.Item> */}
        </Form>
      </Modal>
  )
}