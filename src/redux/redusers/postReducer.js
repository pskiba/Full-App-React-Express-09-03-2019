const initState = {
    posts: [],
    postCreatorIsOpen: false,
    postMessage: null,
    postEditorIsOpen: false
};

const postReducer = (state = initState, action) => {
    switch(action.type) {
        case 'OPEN_POST_EDITOR':
            return {
                ...state,
                postEditorIsOpen: action.payload
            };
            break;
        case 'CLOSE_POST_EDITOR':
            return {
                ...state,
                postEditorIsOpen: false
            };
            break;
        case 'OPEN_POST_CREATOR':
            return {
                ...state,
                postCreatorIsOpen: true
            };
            break;
        case 'CLOSE_POST_CREATOR':
            return {
                ...state,
                postCreatorIsOpen: false
            };
            break;
        case 'CREATE_POST':
            return {
                ...state,
                postMessage: action.payload.message,
                posts: action.payload.post ? [action.payload.post, ...state.posts] : [...state.posts]
            };
            break;
        case 'CLEAR_POST_MESSAGE':
            return {
                ...state,
                postMessage: action.payload
            };
            break;
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            };
            break;
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => {return post._id === action.payload._id ? action.payload : post})
            };
            break;
        case 'DOWNLOAD_POSTS':
            return {
                ...state,
                posts: [...action.payload].sort((postA, postB) => {return postB.date - postA.date})
            };
            break;
        default:
            return {
            ...state
        };
    }
};

export default postReducer;
