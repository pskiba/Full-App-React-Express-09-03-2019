const deleteUserAct = (dispatch, id) => {
    const authorization = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/user/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if(response) {

            }
        })
};

export default deleteUserAct;
