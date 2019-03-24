import React from 'react';

const User = (props) => {
    const {user} = props;
    return (
        <li className="collection-item user">
            <span className="user-key">Nick: </span><span className="user-value">{user.nick} </span>
            <span className="user-key">Email: </span><span className="user-value">{user.email} </span>
            <span className="user-key">Created account: </span><span className="user-value">{user.date} </span>
        </li>
    )
};

export default User;