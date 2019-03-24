import React from 'react';
import {connect} from 'react-redux';

import closeTopicCreatorAct from '../../redux/actions/topicActions/closeTopicCreatorAct';
import openTopicCreatorAct from '../../redux/actions/topicActions/openTopicCreatorAct';
import createTopicAct from '../../redux/actions/topicActions/createTopicAct';

const TopicCreator = (props) => {
    const saveTopic = () => {
        const data = {
            title: document.getElementById('topicName').value,
            user: {
                nick: props.user.nick,
                date: props.user.date,
                _id: props.user._id
            }
        };
        props.createTopic(data);
    };

    const alertHTML = props.topicCreateStatus ?  (
        <div className="row">
            <div className="col s12">
                {props.topicCreateStatus}
            </div>
        </div>
    ) : '';
    return (
        <div id="topicCreator" className="topicCreator card">
            <div className="card-content">
                {alertHTML}
                <label htmlFor="topicName">Topic Name</label>
                <textarea id="topicName" defaultValue="New topic" onChange={props.updateTopicName}></textarea>
                <button className="btn" onClick={saveTopic}>Save</button>
                <button className="btn red" onClick={props.closeTopicCreator}>Cancel</button>
            </div>

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        topicCreatorIsOpen: state.topic.topicCreatorIsOpen,
        topicCreateStatus: state.topic.topicCreateStatus,
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openTopicCreator: () => {openTopicCreatorAct(dispatch)},
        closeTopicCreator: () => {closeTopicCreatorAct(dispatch)},
        createTopic: (data) => {createTopicAct(dispatch, data)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicCreator);
