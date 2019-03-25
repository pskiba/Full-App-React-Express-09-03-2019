const downloadUsersAct = (dispatch) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch(window.location.origin + '/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.users) {
                dispatch({type: 'DOWNLOAD_USERS', payload: response.users});
            }
        });

};

export default downloadUsersAct;