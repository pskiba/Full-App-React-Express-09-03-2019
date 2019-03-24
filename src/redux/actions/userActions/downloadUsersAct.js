const downloadUsersAct = (dispatch) => {
    const authorization = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/user/', {
            method: 'GET',
            headers: {
                'Content-Type': 'applications/json',
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