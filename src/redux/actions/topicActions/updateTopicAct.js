const updateTopicAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/topic/' + data._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            dispatch({type: 'UPDATE_TOPIC', payload: response.topic})
        });
};

export default updateTopicAct;
