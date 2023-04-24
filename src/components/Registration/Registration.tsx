import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { useRegistrationMutation } from "../../api/authApi";
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams";
import styles from './Registration.module.css'

export const Registration = () => {
    const [form] = Form.useForm()
    const [sendRegistrationData] = useRegistrationMutation();
    const { navigateWithSearchParams } = useNavigateWithSearchParams()

    const handleClear = () => {
        form.resetFields()
    }

    const handleSend = async () => {
        try {
            const values = await form.validateFields()
            
            const response = await sendRegistrationData(values);
            if ('data' in response) {
                handleClear()
                navigateWithSearchParams({ nextSide: '/front_side' })
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
                    name="fullName"
                    label={<Avatar style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />} />}
                    rules={[{ required: true, message: "Full name is required" }]}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label={<Avatar style={{ backgroundColor: '#87d068' }}
                    icon={<UserOutlined />} />}
                    rules={[
                        {
                            required: true,
                            message: "Email is required",
                        },
                        { 
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email is not valid"
                        }
                    ]}
                >
                    <Input placeholder="Enter email" />
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
                <NavLink to="/front_side">Sign In</NavLink>
            </div>
        </div>
    );
}
