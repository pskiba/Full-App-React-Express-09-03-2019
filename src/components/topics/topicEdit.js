import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import updateTopicAct from '../../redux/actions/topicActions/updateTopicAct';
import closeTopicEditorAct from '../../redux/actions/topicActions/closeTopicEditorAct';

const topicEditor = (props) => {

    const {topic, closeTopicEditor, updateTopic} = props;

    const saveTopic = () => {
        const newTopicTitle = document.getElementById('newTopicTitle');
        updateTopic({...topic, title: newTopicTitle.value});
        closeTopicEditor();
    };

    return (
        <div className="col s9">
            <textarea id="newTopicTitle" defaultValue={topic.title}></textarea>
            <div className="card-action">
                <div className="right">
                    <button className="btn" onClick={saveTopic}>Save</button>
                    <button className="btn red" onClick={closeTopicEditor}>Cancel</button>
                </div>
            </div>

        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateTopic: (data) => {updateTopicAct(dispatch, data)},
        closeTopicEditor: () => {closeTopicEditorAct(dispatch)}
    }
};

export default connect(null, mapDispatchToProps)(topicEditor);