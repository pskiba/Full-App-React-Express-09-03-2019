const deleteUserAct = (dispatch, id) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('./api/user/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.message === 'user was removed') {
                dispatch({type: 'DELETE_USER', payload: id});
            }
        });
};

export default deleteUserAct;
