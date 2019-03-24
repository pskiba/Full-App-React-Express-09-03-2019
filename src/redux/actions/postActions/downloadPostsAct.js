const downloadPostsAct = (dispatch, title) => {
    fetch('http://localhost:3000/api/post/topic/' + title,{
            method: 'GET'
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'DOWNLOAD_POSTS', payload: response.posts})
        });
};

export default downloadPostsAct;
