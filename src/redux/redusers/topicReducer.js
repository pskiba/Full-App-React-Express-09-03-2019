const initState = {
    topics: [],
    topicCreateStatus: null,
    topicCreatorIsOpen: false,
    topicEditorIsOpen: false
};

const topicReducer = (state = initState, action) => {
    switch(action.type) {
        case 'OPEN_TOPIC_EDITOR':
            return {
                ...state,
                topicEditorIsOpen: action.payload
            };
            break;
        case 'CLOSE_TOPIC_EDITOR':
            return {
                ...state,
                topicEditorIsOpen: false
            };
            break;
        case 'OPEN_TOPIC_CREATOR':
            return {
                ...state,
                topicCreatorIsOpen: true
            };
            break;
        case 'CLOSE_TOPIC_CREATOR':
            return {
                ...state,
                topicCreatorIsOpen: false
            };
            break;
        case 'CREATE_TOPIC':
            return {
                ...state,
                topicCreateStatus: action.payload.message,
                topics: action.payload.topic ? [action.payload.topic, ...state.topics] : state.topics
            };
            break;
        case 'CLEAR_TOPIC_STATUS':
            return {
                ...state,
                topicCreateStatus: action.payload
            };
            break;
        case 'DOWNLOAD_TOPICS':
            return {
                ...state,
                topics: [...action.payload].sort((topicA, topicB) => {return topicB.date - topicA.date})
            };
            break;
        case 'DELETE_TOPIC':
            return {
                ...state,
                topics: state.topics.filter((topic) => topic._id !== action.payload)
            };
            break;
        case 'UPDATE_TOPIC':
            return {
                ...state,
                topics: state.topics.map((topic) => {return topic._id === action.payload._id ? action.payload : topic})
            };
            break;
        default:
            return {
                ...state
            };
    }
};

export default topicReducer;