import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import deleteTopicAct from '../../redux/actions/topicActions/deleteTopicAct';
import openTopicEditorAct from '../../redux/actions/topicActions/openTopicEditorAct';

const topicBody = (props) => {

    const {topic, deleteTopic, openTopicEditor, setTopic} = props;
    const getDate = (date) => {
        return date;
    };

    return (
        <div className="col s9">
            <Link to={'/topic/' +encodeURI(topic.title)}><h6 className="grey-text text-darken-4"><strong>{topic.title}</strong></h6></Link>
            <div className="topic-action">
                <button className="btn" disabled={!props.user.admin} onClick={openTopicEditor.bind(this, topic._id)}>Edit</button>
                <button className="btn red" disabled={!props.user.admin} onClick={deleteTopic.bind(this, topic)}>Delete</button>
            </div>

        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        openTopicEditor: (id) => {openTopicEditorAct(dispatch, id)},
        deleteTopic: (data) => {deleteTopicAct(dispatch, data)}
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(topicBody);
