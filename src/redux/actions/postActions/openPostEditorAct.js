const openEditPostAct = (dispatch, id) => {
    dispatch({type: 'OPEN_POST_EDITOR', payload: id});
};

export default openEditPostAct;
