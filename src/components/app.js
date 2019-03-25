import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './layout/navbar';
import TopicList from './topics/topicList';
import PostList from './posts/postList';
import UsersList from './users/usersList';
import SignUp from './auth/signUp';
import LogIn from './auth/logIn';

import '../style/main.scss';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Route exact path="/" component={TopicList}/>
                    <Route path="/topic/:title" component={PostList}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/users" component={UsersList}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;