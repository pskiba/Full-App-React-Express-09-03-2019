import React, {Component} from 'react';
import {connect} from 'react-redux';
import downloadPostsAct from '../../redux/actions/postActions/downloadPostsAct';

import Post from './post';
import PostCreator from './postCreator';
import TopicBare from './postBar';

class PostList extends Component {

    constructor(props) {

        super(props);

        this.getPostsToDisplay = (posts) => {
            const newPosts = [...posts];
            if(newPosts.length > 10) {
                const hashNumber = window.location.hash ? Number(window.location.hash.replace('#', '')) : 0;
                const startPoint = newPosts.length > hashNumber * 10 ? hashNumber * 10 : 0;
                const endPoint = newPosts.length > startPoint + 10 ? startPoint + 10 : newPosts.length;
                return newPosts.splice(startPoint, endPoint);
            } else {
                return newPosts;
            }
        }
    }

    componentDidMount() {
        this.props.downloadPosts(this.props.match.params.title);
    }

    render() {
        const {posts} = this.props;
        const postHTML = posts.length ? this.getPostsToDisplay(posts).map((post) =>  (<Post post={post} key={post._id}/>)) : <div>no post yet</div>;
        const postCreatorHtml = this.props.postCreatorIsOpen ? <PostCreator/> : '';
        return (
            <div className="container">
                <h5 className="center">POSTS</h5>
                {postCreatorHtml}
                <TopicBare/>
                {postHTML}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
        postCreatorIsOpen: state.post.postCreatorIsOpen
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        downloadPosts: (id) => {downloadPostsAct(dispatch, id)},
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
