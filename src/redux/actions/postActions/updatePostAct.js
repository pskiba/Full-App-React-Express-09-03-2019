const updatePostAct = (dispatch, data) => {
    const authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    fetch('http://localhost:3000/api/post/' + data._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
            body: JSON.stringify({content: data.content, edited: {_id: '5c894ea85425a32bdceb3933', nick: 'aaa@interia.pl'}})
        })
        .then((response) => response.json())
        .then((response) => {
            if(response && response.post) {
                dispatch({type: 'UPDATE_POST', payload: response.post});
            }

        });
};

export default updatePostAct;
