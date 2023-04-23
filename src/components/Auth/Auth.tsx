import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { useAuthMutation } from "../../api/authApi";
import { changeAuth } from "../../app/auth";
import styles from './Auth.module.css'

export function Auth() {
    const [form] = Form.useForm()
    const [sendAuthData] = useAuthMutation();
    const dispatch = useDispatch()

    const sendAuth = async () => {
        try {
            const { username, password } = await form.validateFields()
            
            const response = await sendAuthData({ username, password });
            if ('data' in response) {
                localStorage.setItem('token-access', response.data.access_token);
                localStorage.setItem('token-refresh', response.data.refresh_token);
                dispatch(changeAuth())
            }
            // if ('error' in response) {
            //     notification.error({
            //         message: 'Ошибка получения токена',
            //         description: 'Что-то пошло не так',
            //     })
            // }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className={styles.wrapper}>
            <Form form={form} colon={false}>
                <Form.Item
                    name="username"
                    label={<Avatar style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />} />}
                    rules={[{ required: true, message: "Username is required" }]}
                >
                    <Input placeholder="Enter username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={<Avatar style={{ backgroundColor: '#87d068' }}
                    icon={<KeyOutlined />} />}
                    rules={[{ required: true, message: "Password is required" }]}
                >
                    <Input placeholder="Enter password" />
                </Form.Item>
                <div className={styles.actionWrapper}>
                    <Button>Clear</Button>
                    <Button onClick={sendAuth}>Send</Button>
                </div>
            </Form>
        </div>
    );
}
