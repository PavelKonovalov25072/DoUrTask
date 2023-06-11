import DoUrTaskButton from 'components/UI/DoUrTaskButton';
import DoUrTaskInput from 'components/UI/DoUrTaskInput';
import './styles/login.css'
import {React, useState, useEffect} from 'react';
import { authPage, addAuthToken, addUserMail } from 'middleware/AuthPage';

const Login = () => {
    const [email, setEmail] = useState("");
    const [havePasswordError, setPasswordError] = useState(false);
    const getEmail = (t) => {
        setEmail(t);
    };

    const [password, setPassword] = useState("");
    const getPassword = (t) => {
        setPassword(t);
    };
    const SignIn = () => {
        getData();
    }    

    const [pageRoute, setPageRoute] = useState(authPage());
    useEffect(() => {
        setPageRoute(authPage());
      }, [])

    async function getData() {
        const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ 
                email: email,
                password: password
            }), 
            headers: {
                "Accept": "application/json", "Content-Type": "application/json",
                'ngrok-skip-browser-warning':true
        }
        })
        let actualData = await response.json();
        if (response.ok) {
            addAuthToken(actualData.access_token, actualData.expires_in);
            addUserMail(email);
            /* state().token = actualData.access_token; */
            setPageRoute(authPage());
            return actualData;
        }
        else {
            console.error(response.status + " " + actualData.message);
            setPasswordError(true);
        }
        
    }
    return (
        <div className='login'>
            {pageRoute}
            <div className='login__logo'>DoUrTask</div>
            <div className='login__body'>
                <div className='login__body__input'>
                    <DoUrTaskInput placeholder='Email' getInput={getEmail} value={email} isError={havePasswordError}></DoUrTaskInput>
                    <DoUrTaskInput placeholder='Пароль' getInput={getPassword} value={password} isError={havePasswordError} type='password'></DoUrTaskInput>
                </div>
                <div className='login__body__signin'>
                    <DoUrTaskButton name='Войти' onClick={SignIn}></DoUrTaskButton>
                    <div className='login__body__signin__signup'>Нет аккаунта?<br/><a href='/register'>Зарегистрируйтесь</a> прямо сейчас!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;