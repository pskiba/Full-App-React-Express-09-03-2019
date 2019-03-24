const closeTopicEditorAct = (dispatch) => {
    dispatch({type: 'CLOSE_TOPIC_EDITOR', payload: false});
};

export default closeTopicEditorAct;
