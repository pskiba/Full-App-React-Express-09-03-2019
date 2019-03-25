const createNewPostAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('./api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'CREATE_POST', payload: response});
        })
};

export default createNewPostAct;