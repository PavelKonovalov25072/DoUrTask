import Cookies from 'js-cookie'

export const state = {
    token: null,
    user: {
        mail: '',
    }
};

/* export const HaveToken = () => {
    return token != null; 
} */

export const isAuthed = ( ) => {
    return state.token != null;
}

export const ResetState = () => {
    state.token = null;
    state.user.mail = '';
}

export const GetFromCookie = () => {
    if (state.token == null) state.token = Cookies.get('token');
    if (state.user.mail == '') state.user.mail = Cookies.get('mail');
}

