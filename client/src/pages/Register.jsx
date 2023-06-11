import DoUrTaskButton from 'components/UI/DoUrTaskButton';
import DoUrTaskInput from 'components/UI/DoUrTaskInput';
import './styles/register.css'
import {React, useEffect, useState} from 'react';
import { authPage, addAuthToken, addUserMail } from 'middleware/AuthPage';

const Register = () => {
    const [email, setEmail] = useState("");
    const getEmail = (m) => {
        setEmail(m);
    };

    const [password, setPassword] = useState("");
    const getPassword = (p) => {
        setPassword(p);
    };

    const [repeatingPassword, setRepeatingPassword] = useState("");
    const getRepeatingPassword = (rp) => {
        setRepeatingPassword(rp);
        setPasswordError(false);
    };
    const [havePasswordError, setPasswordError] = useState(false);

    const SignIn = () => {
        if (password === repeatingPassword) {
            getData();
        }
        else {
            setPasswordError(true);
            setRepeatingPassword('');
        }    
    }    

    const [pageRoute, setPageRoute] = useState(authPage());
    useEffect(() => {
        setPageRoute(authPage());
      }, [])

    async function getData() {
        const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signup`, {
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
            addAuthToken(actualData.access_token);
            addUserMail(email);
            setPageRoute(authPage());
            return actualData;
        }
        else {
            console.error(response.status + " " + actualData.message);
        }
    }

    return (
        <div className='register'>
            {pageRoute}
            <div className='register__logo'>DoUrTask</div>
            <div className='register__body'>
                <div className='register__body__text'>Регистрация</div>
                <div className='register__body__input'>
                    <DoUrTaskInput placeholder='Введите email' getInput={getEmail} value={email}></DoUrTaskInput>
                    <DoUrTaskInput placeholder='Введите пароль' getInput={getPassword} value={password} type='password'></DoUrTaskInput>
                    <DoUrTaskInput placeholder='Повторите пароль' getInput={getRepeatingPassword} value={repeatingPassword} isError={havePasswordError} type='password'></DoUrTaskInput>
                </div>
                <div className='register__body__signin'>
                    <DoUrTaskButton name='Зарегистрироваться' onClick={SignIn}></DoUrTaskButton>
                </div>
            </div>
        </div>
    );
};

export default Register;