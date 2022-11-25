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
        const response = await sendAuthData({ username: login, password: password }).unwrap();
        localStorage.setItem('token-access', response.access_token);
        localStorage.setItem('token-refresh', response.refresh_token);
    };

    useEffect(() => {
        const side = params.side;
        if (!side) {
            navigateWithSearchParams('/front_side', '1, 1, 1')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
