import { state } from "data/Auth";

export const getToken = () => {
    return state.token;
}

export const getUserMail = () => {
    return state.user.mail;
}