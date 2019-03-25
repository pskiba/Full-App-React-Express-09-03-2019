const deletePostAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch(window.location.origin + '/api/post/' + data._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.message !== 'Auth failed') {
                dispatch({type: 'DELETE_POST', payload: data._id});
            }

        })
};
export default deletePostAct;
