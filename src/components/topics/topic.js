import React from 'react';

import {connect} from 'react-redux';

import TopicAuthor from './topicAuthor';
import TopicBody from './topicBody';
import TopicEdit from './topicEdit';

import '../../style/topic.scss';

const Topic = (props) => {
    const {topic, topicEditorIsOpen} = props;

    const topicHTML = topicEditorIsOpen === topic._id ? <TopicEdit topic={topic}/> : <TopicBody topic={topic}/>
    return (
        <li className="collection-item topic" key={topic._id}>
            <div className="row">
                {topicHTML}
                <TopicAuthor topic={topic}/>
            </div>
        </li>
    )
};

const mapStateToProps = (state) => {
    return {
        topicEditorIsOpen: state.topic.topicEditorIsOpen
    }
};

export default connect(mapStateToProps)(Topic);
