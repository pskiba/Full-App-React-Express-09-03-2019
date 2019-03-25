const deleteTopicAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/topic/' + data._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.topic) {
                dispatch({type: 'DELETE_TOPIC', payload: data._id});
            }
        });
};

export default deleteTopicAct