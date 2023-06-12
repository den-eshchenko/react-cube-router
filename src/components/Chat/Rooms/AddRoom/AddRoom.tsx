import { Form, Input, Modal } from "antd"
import { FC, useState } from "react";
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
      socket.emit('rooms/join', { roomName: values.roomName, userLogin })
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
        </Form>
      </Modal>
  )
}