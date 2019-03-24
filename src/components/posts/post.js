import React, {Component} from 'react';
import PostAuthor from './postAuthor';
import PostEdit from './postEdit';
import PostBody from './postBody';
import {connect} from 'react-redux';

import '../../style/post.scss';


class Post extends Component{

    render () {
        const {post, postEditorIsOpen} = this.props;
        const postHTML = postEditorIsOpen === post._id ? <PostEdit post={post} /> : <PostBody post={post}/>;
        return(
            <div className="card post" key={post._id}>
                <div className="card-content">
                    <div className="row">
                        <PostAuthor post={post}/>
                        {postHTML}
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postEditorIsOpen: state.post.postEditorIsOpen
    }
};

export default connect(mapStateToProps)(Post);
