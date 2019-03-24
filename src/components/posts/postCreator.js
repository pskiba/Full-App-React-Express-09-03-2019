import React from 'react';
import {connect} from 'react-redux';
import openPostCreatorAct from '../../redux/actions/postActions/closePostCreatorAct';
import closePostCreatorAct from '../../redux/actions/postActions/closePostCreatorAct';
import createNewPostAct from '../../redux/actions/postActions/createNewPostAct';

const PostCreator = (props) => {

    const getTopicName = () => {
        const startPoint = window.location.href.indexOf('topic/') + 6;
        const hashIndex = window.location.href.indexOf('#');
        const endPoint = hashIndex !== -1 ? hashIndex : window.location.href.length;
        return window.location.href.slice(startPoint, endPoint);
    };

    const savePost = (e) => {
        e.preventDefault();
        const topic = getTopicName();
        const post = document.getElementById('post');
        const data = {
            content: post.value,
            topic: decodeURIComponent(topic),
            user: {
                date: props.user.date,
                _id: props.user._id,
                nick: props.user.nick
            }
        };
        props.createNewPost(data);
        props.closePostCreator();
    };
    return (
        <div id="postCreator" className="postCreator card">
            <div className="card-content">
                <form onSubmit={savePost} action="">
                    <label htmlFor="post">Topic Name</label>
                    <textarea id="post" defaultValue="New post"></textarea>
                    <button className="btn" type="submit">Save</button>
                    <button className="btn red" onClick={props.closePostCreator}>Cancel</button>
                </form>
            </div>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        postCreatorIsOpen: state.post.postCreatorIsOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPostCreator: () => {openPostCreatorAct(dispatch)},
        closePostCreator: () => {closePostCreatorAct(dispatch)},
        createNewPost: (data) => {createNewPostAct(dispatch, data)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreator);

