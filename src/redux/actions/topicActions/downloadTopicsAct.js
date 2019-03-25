const downloadTopicsAct = (dispatch) => {
    fetch('http://localhost:3000/api/topic/', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'DOWNLOAD_TOPICS', payload: response.topics})
        });
};

export default downloadTopicsAct;
