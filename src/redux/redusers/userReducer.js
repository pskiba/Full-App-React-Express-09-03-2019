const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
const initState = {
    signUpStatus: null,
    logInStatus: user.nick ? 'login' : null,
    user: user,
    users: [

    ]
};

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case 'DOWNLOAD_USERS':
            return {
                ...state,
                users: [...action.payload]
            };
            break;
        case 'LOG_IN_USER':
            if(action.payload.user && action.payload.user.token) {
                sessionStorage.setItem('user', JSON.stringify(action.payload.user));
                sessionStorage.setItem('token', 'Bearer ' + action.payload.user.token);
            }
            return {
                ...state,
                user: action.payload.user,
                logInStatus: action.payload.message
            };
            break;
        case 'LOG_OUT_USER':
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            return {
                ...state,
                logInStatus: null,
                user: {}
            };
        case 'SIGN_UP_USER':
            return {
                ...state,
                signUpStatus: action.payload
            };
            break;
        case 'CLEAR_SIGN_UP_STATE':
            return {
                ...state,
                signUpStatus: action.payload
            };
            break;
        default:
            return {
            ...state
        };
    }
};

export default userReducer;