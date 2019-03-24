import React, {Component} from 'react';
import {connect} from 'react-redux';

import downloadUsersAct from '../../redux/actions/userActions/downloadUsersAct';


import User from './user';

class UsersList extends Component {
    componentDidMount() {
        this.props.downloadUsers();
    }
    render() {
        const {users} = this.props;
        const usersHtml = users.length ? users.map((user) => <User user={user} key={user._id}/>) : '';
        return (
            <div className="container">
                <h4>Users</h4>
                <ul className="collection">
                    {usersHtml}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        downloadUsers: () => {downloadUsersAct(dispatch)}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);