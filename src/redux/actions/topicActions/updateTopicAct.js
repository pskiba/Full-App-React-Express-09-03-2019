const updateTopicAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch(window.location.origin + '/api/topic/' + data._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.topic) {
                dispatch({type: 'UPDATE_TOPIC', payload: response.topic});
            }
        });
};

export default updateTopicAct;
