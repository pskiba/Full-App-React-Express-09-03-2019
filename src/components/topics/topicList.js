import React, {Component} from 'react';
import {connect} from 'react-redux';

import Topic from './topic';
import TopicBare from './topickBare';
import TopicCreator from './topicCreator';

import downloadTopicsAct from '../../redux/actions/topicActions/downloadTopicsAct';
import clearTopicStatusAct from '../../redux/actions/topicActions/clearTopicStatusAct';
import closeTopicCreatorAct from '../../redux/actions/topicActions/closeTopicCreatorAct';

class TopicsList extends Component {

    constructor(props) {
        super(props);

        this.getTopicsToDisplay = (topics) => {
            const newTopics = [...topics];
            if(newTopics.length > 10) {
                const hashNumber = window.location.hash ? Number(window.location.hash.replace('#', '')) : 0;
                const startPoint = newTopics.length > hashNumber * 10 ? hashNumber * 10 : 0;
                const endPoint = newTopics.length > startPoint + 10 ? startPoint + 10 : newTopics.length;
                return newTopics.splice(startPoint, endPoint);
            } else {
                return newTopics;
            }
        }
    }

    componentDidMount() {
        this.props.downloadTopics();
    }

    componentDidUpdate() {
        if(this.props.topicCreateStatus === 'topic created') {
            this.props.closeTopicCreator();
            this.props.clearTopicStatus()
        }
    }

    render() {
        const {topics} = this.props;

        const topicsHTML = topics.length ? this.getTopicsToDisplay(topics).map((topic) => <Topic user={this.props.user} topic={topic} key={topic._id}/>) : <div>no topics</div>;
        const topicCreatorHTML = this.props.topicCreatorIsOpen ? <TopicCreator /> : '';
        return (
            <div className="container">
                {topicCreatorHTML}
                <ul className="collection">
                    <TopicBare topics={topics} user={this.props.user} />
                    {topicsHTML}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        topicCreatorIsOpen: state.topic.topicCreatorIsOpen,
        topics: state.topic.topics,
        topicCreateStatus: state.topic.topicCreateStatus,
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        downloadTopics: () => {downloadTopicsAct(dispatch)},
        clearTopicStatus: () => {clearTopicStatusAct(dispatch)},
        closeTopicCreator: () => {closeTopicCreatorAct(dispatch)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);
