import React from 'react';
import {connect} from 'react-redux';

import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';

const NavBar = (props) => {

    const linksHTML = props.logInStatus === 'login' ? <SignedInLinks/> : <SignedOutLinks/>;

    return(
        <nav className="nav-wrapper">
            <div className="container">
                <span className="logo">LOGO</span>
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

export default connect(mapStateToProps)(NavBar);