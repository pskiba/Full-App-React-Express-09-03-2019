import React, {Component} from 'react';
import {connect} from 'react-redux';
import signUpAct from '../../redux/actions/userActions/signUpAct';
import clearSignUpStateAct from '../../redux/actions/userActions/clearSignUpStateAct';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                nick: '',
                email: '',
                password: ''
            },
            waitForResponse: false
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.signUp(this.state.user);
            this.setState({waitForResponse: true});
        };

        this.handleChange = (e) => {
            let user = {...this.state.user}
            user[e.target.id] = e.target.value
            this.setState({user: user});
        };
    }

    componentDidUpdate() {
        if(this.state.waitForResponse && this.props.signUpStatus === 'user was sign up') {
            this.setState({waitForResponse: false});
            this.props.clearSignUpState();
            this.props.history.push('/login');
        }
    }

    render() {
        const alertHTML = this.props.signUpStatus ?  (
                <div className="row">
                    <div className="col s12">
                        {this.props.signUpStatus}
                    </div>
                </div>
            ) : '';
        return (
            <div className="container">
                {alertHTML}
                <form action="#" onSubmit={this.handleSubmit}>
                    <div className="field-container">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" id="nick" onChange={this.handleChange}/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="field-container">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data) => {signUpAct(dispatch, data)},
        clearSignUpState: () => {clearSignUpStateAct(dispatch)}
    };
};

const mapStateToProps = (state) => {
    return {
        signUpStatus: state.user.signUpStatus
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);