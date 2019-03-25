import React from 'react';
import {connect} from 'react-redux';
import deleteUserAct from '../../redux/actions/userActions/deleteUserAct';

const User = (props) => {
    const {user, deleteUser, admin} = props;
    return (
        <li className="collection-item user">
            <div className="row">
                <div className="col s10">
                    <ul>
                        <li><span className="user-key">Nick: </span><span className="user-value">{user.nick} </span></li>
                        <li><span className="user-key">Email: </span><span className="user-value">{user.email} </span></li>
                        <li><span className="user-key">Created account: </span><span className="user-value">{new Date(user.date).toLocaleString()} </span></li>
                    </ul>
                </div>
                <div className="col s2">
                    <button className="btn red right" disabled={admin._id === user._id} onClick={deleteUser.bind(this, user._id)}>Remove</button>
                </div>
            </div>

        </li>
    )
};

const mapStateToProps = (state) => {
    return {
        admin: state.user.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => {deleteUserAct(dispatch, id)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);