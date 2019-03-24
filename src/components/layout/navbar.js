import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import SignedInLinks from './signedInLinks';
import SignrdOutLinks from './signedOutLinks';

import logOutAct from '../../redux/actions/userActions/logOutAct';

const NavBar = (props) => {

    const linksHTML = props.logInStatus === 'login' ? <SignedInLinks logOut={props.logOut}/> : <SignrdOutLinks/>;

    return(
        <nav className="nav-wrapper">
            <div className="container">
                <div className="brand-logo">LOGO</div>
                <ul className="right">
                    {linksHTML}

                </ul>
            </div>
        </nav>
    )
};

const mapStateToProps = (state) => {
    return {
        logInStatus: state.user.logInStatus
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => logOutAct(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);