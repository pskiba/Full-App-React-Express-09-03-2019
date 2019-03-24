import React from 'react';
import {connect} from 'react-redux';
import openPostCreatorAct from '../../redux/actions/postActions/openPostCreatorAct';
import closePostCreatorAct from '../../redux/actions/postActions/closePostCreatorAct';

const TopicBare = (props) => {
    const togglePostCreator = (e) => {
        if(props.postCreatorIsOpen){
            props.closePostCreator();
        } else {
            props.openPostCreator();
        }
    };
    const getPagination = (paginationNumber) => {
        let arr = [];
        for(let i = 1; i <= paginationNumber; i++) {
            arr.push(<li key={i} className="waves-effect"><a href={'#' + (i -1)}>{i}</a></li>);
        }
        return arr;
    };
    const btnDisabled = props.user && !props.user.nick;
    const paginationNumber = props.posts ? Math.ceil(props.posts.length / 10) : 0;
    const paginationItem = paginationNumber > 1 ? getPagination(paginationNumber) : '';
    const paginationHtml = paginationItem ? (
        <ul className="pagination right">
            <li className="disabled"><a href="#">&#60;</a></li>
            {paginationItem}
            <li className="waves-effect"><a href="#">&#62;</a></li>
        </ul>) : '';

    return(
        <ul className="collection">
            <li className="collection-item">
                <button className="btn" disabled={btnDisabled} onClick={togglePostCreator}>Create New Post</button>
                {paginationHtml}
            </li>

        </ul>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        posts: state.post.posts,
        postCreatorIsOpen: state.post.postCreatorIsOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPostCreator: () => {openPostCreatorAct(dispatch)},
        closePostCreator: () => {closePostCreatorAct(dispatch)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBare);


