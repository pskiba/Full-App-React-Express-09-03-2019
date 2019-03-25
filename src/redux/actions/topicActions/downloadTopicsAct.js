const downloadTopicsAct = (dispatch) => {
    fetch(window.location.origin + '/api/topic/', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type: 'DOWNLOAD_TOPICS', payload: response.topics})
        });
};

export default downloadTopicsAct;
