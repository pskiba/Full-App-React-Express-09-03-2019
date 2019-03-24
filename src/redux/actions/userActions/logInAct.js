const logInAct = (dispatch, data) => {
    fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'LOG_IN_USER', payload: response});
        })
};

export default logInAct;
