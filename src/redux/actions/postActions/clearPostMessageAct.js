const clearPostMessageAct = (dispatch) => {
    dispatch({type: 'CLEAR_POST_MESSAGE', payload: null});
};

export default clearPostMessageAct;