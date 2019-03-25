const signUpAct = (dispatch, data) => {
    fetch(window.location.origin + '/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'SIGN_UP_USER', payload: response.message});
        });
};

export default signUpAct;
