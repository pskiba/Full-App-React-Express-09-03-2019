import React from 'react';

const postAuthor = (props) => {
    const {post} = props;

    const editDataHTML = post.edited ? (

        <div className="edit-data">
            <div>
                <span className="red-text text-darken-1">
                    Edited by :
                </span>
                <span className="red-text text-darken-4">
                    <strong><i>{' ' + post.edited.nick}</i></strong>
                </span>
            </div>
            <div>
                <span className="red-text text-darken-1">
                    At :
                </span>
                <span className="red-text text-darken-4">
                    <strong><i>{' ' + new Date(post.edited.date).toLocaleString()}</i></strong>
                </span>
            </div>
        </div>

    ) : '';
    return (
        <div className="col s3 author">
            <div className="create-data">
                <div>
                    <span className="grey-text text-darken-1">
                        Created by :
                    </span>
                    <span className="grey-text text-darken-4">
                        <strong><i>{' ' + post.user.nick}</i></strong>
                    </span>
                </div>
                <div>
                    <span className="grey-text text-darken-1">
                        At :
                    </span>
                    <span className="grey-text text-darken-4">
                        <strong><i>{' ' + new Date(post.date).toLocaleString()}</i></strong>
                    </span>
                </div>
            </div>
            {editDataHTML}
        </div>
    )
};

export default postAuthor;
