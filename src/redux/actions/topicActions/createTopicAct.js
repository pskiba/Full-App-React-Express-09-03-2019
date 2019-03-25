const createTopicAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch(window.location.origin + '/api/topic/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'CREATE_TOPIC', payload: response})
        });
};

export default createTopicAct;
