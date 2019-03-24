import {combineReducers} from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';
import topicReducer from './topicReducer';

const rootReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    topic: topicReducer
});

export default rootReducer;
