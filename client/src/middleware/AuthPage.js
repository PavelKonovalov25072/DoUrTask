import { isAuthed, state } from "data/Auth";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const authPage = () => {
    if (isAuthed()) return <Navigate to='/tasks'/>;
}

export const addAuthToken = (token, expires_in) => {
    state.token = token;
    Cookies.set('token', token, { expires: new Date(expires_in * 1000), path: '/' })
}

export const addUserMail = (mail) => {
    state.user.mail = mail;
    Cookies.set('mail', mail, { expires: 1, path: '/' })
}