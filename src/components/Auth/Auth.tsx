import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuthMutation } from "../../api/authApi";
import { changeAuth, changeLogin } from "../../app/auth";
import styles from './Auth.module.css'

export const Auth = () => {
    const [form] = Form.useForm()
    const [sendAuthData] = useAuthMutation();
    const dispatch = useDispatch()

    const handleClear = () => {
        form.resetFields()
    }
    
    const handleSend = async () => {
        try {
            const values = await form.validateFields()
            
            const response = await sendAuthData(values);
            if ('data' in response) {
                localStorage.setItem('token-access', response.data.access_token);
                localStorage.setItem('token-refresh', response.data.refresh_token);
                localStorage.setItem('user', response.data.login);
                dispatch(changeLogin(response.data.login))
                dispatch(changeAuth())
                handleClear()
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className={styles.wrapper}>
            <Form form={form} colon={false}>
                <Form.Item
                    name="login"
                    label={<Avatar style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />} />}
                    rules={[{ required: true, message: "Login is required" }]}
                >
                    <Input placeholder="Enter login" />
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
                    <Button onClick={handleClear}>Clear</Button>
                    <Button onClick={handleSend}>Send</Button>
                </div>
            </Form>
            <div className={styles.signUpWrapper}>
                <NavLink to="/right_side">Sign Up</NavLink>
            </div>
        </div>
    );
}
