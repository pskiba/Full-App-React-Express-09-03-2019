import React, {Component} from 'react';
import {connect} from 'react-redux';
import logInAct from '../../redux/actions/userActions/logInAct';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = (e) => {
            this.setState({
                [e.target.id]: e.target.value
            });
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.logIn(this.state);

        };
    }

    componentDidUpdate() {
        if(this.props.logInStatus === 'login') {
            this.props.history.push('/');
        }
    }

    render() {
        const alertHTML = this.props.logInStatus ?  (
            <div className="row">
                <div className="col s12">
                    {this.props.logInStatus}
                </div>
            </div>
        ) : '';
        return (
            <div className="container">
                {alertHTML}
                <form action="#" onSubmit={this.handleSubmit}>
                    <div className="field-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="field-container">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (data) => {logInAct(dispatch, data)}
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        logInStatus: state.user.logInStatus
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);