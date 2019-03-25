const updatePostAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/post/' + data._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.post) {
                dispatch({type: 'UPDATE_POST', payload: response.post});
            }
        });
};

export default updatePostAct;
