import React from 'react';
import {connect} from 'react-redux';

import closeTopicCreatorAct from '../../redux/actions/topicActions/closeTopicCreatorAct';
import openTopicCreatorAct from '../../redux/actions/topicActions/openTopicCreatorAct';

const TopicBare = (props) => {

    const toggleTopicCreator = () => {
        if(props.topicCreatorIsOpen) {
            props.closeTopicCreator();
        } else {
            props.openTopicCreator();
        }
    };

    const getPagination = (paginationNumber) => {
        let arr = [];
        for(let i = 1; i <= paginationNumber; i++) {
            arr.push(<li key={i} className="waves-effect"><a href={'#' + (i -1)}>{i}</a></li>);
        }
        return arr;
    };

    const paginationNumber = props.topics ? Math.ceil(props.topics.length / 10) : 0;
    const paginationItem = paginationNumber > 1 ? getPagination(paginationNumber) : '';
    const paginationHtml = paginationItem ? (
        <ul className="pagination right">
            <li className="disabled"><a href="#!" onClick={(e) => {e.preventDefault();}}>&#60;</a></li>
            {paginationItem}
            <li className="waves-effect"><a href="#!"  onClick={(e) => {e.preventDefault();}}>&#62;</a></li>
        </ul>) : '';
    const btnDisabled = props.user && !props.user.nick;
    return(
        <li className="collection-item">
            <button className="btn" disabled={btnDisabled} onClick={toggleTopicCreator}>Create New Topic</button>
            {paginationHtml}
        </li>
    )
};

const mapStateToProps = (state) => {
    return {
        topicCreatorIsOpen: state.topic.topicCreatorIsOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openTopicCreator: () => {openTopicCreatorAct(dispatch)},
        closeTopicCreator: () => {closeTopicCreatorAct(dispatch)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBare);