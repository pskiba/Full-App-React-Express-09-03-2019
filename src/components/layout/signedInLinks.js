import React from 'react';
import {NavLink} from 'react-router-dom';

const signedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/" onClick={props.logOut}>Log Out</NavLink></li>
        </ul>
    )
};

export default signedInLinks;
