import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import logOutAct from '../../redux/actions/userActions/logOutAct';

const signedInLinks = (props) => {
    const {logOut, user} = props;
    const userItemHtml = user.admin ? <li><NavLink to="/users">Users</NavLink></li> : '';
    return (
        <ul className="right">
            <li><NavLink to="/">Home</NavLink></li>
            {userItemHtml}
            <li><NavLink to="/" onClick={logOut}>Log Out</NavLink></li>
        </ul>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => logOutAct(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks);
