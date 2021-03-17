import React, { Component } from 'react';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Registration from './RegistrationComponent';
import Profile from './ProfileComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { fetchProfile, loginUser, logoutUser, registerUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth,
        registration: state.registration
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchProfile: () => dispatch(fetchProfile()),
    registerUser: (details) => dispatch(registerUser(details))
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchProfile();
    }

    render() {

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }} />
            )} />
        );

        if (!this.props.auth.isAuthenticated) {
            return (
                <Switch>
                    <Route exact path="/" component={() => <Login loginUser={this.props.loginUser} auth={this.props.auth} />} />
                    <Route exact path="/signup" component={() => <Registration registerUser={this.props.registerUser} registration={this.props.registration} />} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        else {
            return (
                <Switch>
                    <PrivateRoute exact path="/" component={() => <Home />} />
                    <PrivateRoute exact path="/profile" component={() => <Profile profile={this.props.profile} />} />
                    <Redirect to="/" />
                </Switch>
            )
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));