import { notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthMutation } from "../../api/auth";
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams";

export function Auth() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [sendAuthData] = useAuthMutation();
    const params = useParams();
    const { navigateWithSearchParams } = useNavigateWithSearchParams();

    const sendAuth = async () => {
        const response = await sendAuthData({ username: login, password: password });
        if ('data' in response) {
            localStorage.setItem('token-access', response.data.access_token);
            localStorage.setItem('token-refresh', response.data.refresh_token);
        }
        if ('error' in response) {
            notification.error({
                message: 'Ошибка получения токена',
                description: 'Что-то пошло не так',
            })
        }
    };

    useEffect(() => {
        const side = params.side;
        if (!side) {
            navigateWithSearchParams({ nextSide: '/front_side' })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //TODO: Добавить авторизацию
    return (
        <div>
            Введите логин
            <div>
                <input type="text" onChange={(e) => {setLogin(e.target.value)}}/>
            </div>
            Введите пароль
            <div>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <button onClick={sendAuth}>Send</button>
        </div>
    );
}
