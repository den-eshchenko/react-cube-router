import { Form, Input, Modal, Select } from "antd"
import { FC, useState } from "react";

type TAddRoom = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddRoom: FC<TAddRoom> = ({ isOpen, setIsOpen }) => {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      const values = await form.validateFields()
      console.log('values', values) // отправить создание комнаты
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
            label="Add new room name"
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'Field is required' }]}
          >
            <Input placeholder="New room name" />
          </Form.Item>
          <Form.Item
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
          </Form.Item>
        </Form>
      </Modal>
  )
}