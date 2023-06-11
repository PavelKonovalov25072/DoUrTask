import { isAuthed, state, ResetState } from "data/Auth";
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const unauthPage = () => {
    if (!isAuthed()) return <Navigate to='/login'/>;
}

export const LogOut = () => {
    Cookies.remove('token');
    Cookies.remove('mail');
    ResetState();
}