import React, {Component} from 'react';
import {connect} from 'react-redux';

import closePostEditorAct from '../../redux/actions/postActions/closePostEditorAct';
import updatePostAct from '../../redux/actions/postActions/updatePostAct';

const postEdit = (props) => {
    const { updatePost, closePostEditor, post} = props;

    const savePost = () => {
        const content = document.getElementById('content');
        updatePost({_id: post._id, content: content.value});
        closePostEditor();
    };

    return (
        <div className="col s9">
            <textarea defaultValue={post.content} id="content"></textarea>
            <div className="card-action">
                <div className="right">
                    <button className="waves-effect waves-light btn-small" onClick={savePost}>save</button>
                    <button className="waves-effect waves-light btn-small" onClick={closePostEditor}>cancel</button>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        closePostEditor: () => {closePostEditorAct(dispatch)},
        updatePost: (data) => {updatePostAct(dispatch, data)}
    }
};

export default connect(null, mapDispatchToProps)(postEdit);
