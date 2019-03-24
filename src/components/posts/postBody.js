import React from 'react';
import {connect} from 'react-redux';

import openPostEditorAct from '../../redux/actions/postActions/openPostEditorAct';
import deletePostAct from '../../redux/actions/postActions/deletePostAct';

const postBody = (props) => {
    const {post, openPostEditor, user} = props;

    const removePost = () => {
        props.deletePost(post);
    };

    const isNotAuthorOrAdmin = () => {
        return !(post.user._id === user._id || user.admin);
    };

    return (
        <div className="col s9">
            <p>{post.content}</p>
            <div className="card-action">
                <div className="right">
                    <button className="waves-effect waves-light btn-small" disabled={isNotAuthorOrAdmin()} onClick={removePost}>remove</button>
                    <button className="waves-effect waves-light btn-small" disabled={isNotAuthorOrAdmin()} onClick={openPostEditor.bind(this, post._id)}>edit</button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPostEditor: (id) => {openPostEditorAct(dispatch, id)},
        deletePost: (data) => {deletePostAct(dispatch, data)}
    }
};

const maoStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

export default connect(maoStateToProps, mapDispatchToProps)(postBody);
