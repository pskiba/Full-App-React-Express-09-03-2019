const openTopicEditorAct = (dispatch, id) => {
    dispatch({type: 'OPEN_TOPIC_EDITOR', payload: id});
};

export default openTopicEditorAct;

