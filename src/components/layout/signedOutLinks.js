import React from 'react';
import {NavLink} from 'react-router-dom';

const signedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/login">Log In</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
        </ul>
    )
};

export default signedOutLinks;
