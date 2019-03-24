const logOutAct = (dispatch) => {
    dispatch({type: 'LOG_OUT_USER', payload: null});
};
export default logOutAct;
