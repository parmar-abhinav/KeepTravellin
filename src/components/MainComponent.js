import React, { Component } from 'react';
import Home from './HomeComponent';
import Login from './LoginComponent';
import Registration from './RegistrationComponent';
import Profile from './ProfileComponent';
import Story from './StoryComponent';
import Destination from './DestinationComponent';
import MakeTrip from './MakeTripComponent';
import CompanyHome from './CompanyHomeComponent';
import AddService from './CompanyAddService';
import Facility from './CompanyViewService';
import CProfile from './CompanyProfileComponent';
import EditProfile from './EditProfileComponent';
import CEditProfile from './CompanyEditProfile';
import AddStory from './AddStoryComponent';
import CStory from './CompanyStories';
import CompanyCheck from './CompanyCheckUser';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner, Navbar, NavbarBrand } from 'reactstrap';
import { fetchProfile, loginUser, logoutUser, registerUser, fetchStories, fetchDestination, addServices, fetchFacilities, addStory,updateProfile, deleteUser, fetchTrip, addRequests, fetchUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth,
        registration: state.registration,
        stories: state.stories,
        destination: state.destination,
        services: state.services,
        facility: state.facility,
        updateprofile: state.updateprofile,
        trip: state.trip,
        request: state.request,
        check: state.check,
        story: state.story
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchProfile: (username) => dispatch(fetchProfile(username)),
    registerUser: (details) => dispatch(registerUser(details)),
    fetchStories: () => dispatch(fetchStories()),
    fetchDestination: () => dispatch(fetchDestination()),
    addServices: (services) => dispatch(addServices(services)),
    fetchFacilities: () => dispatch(fetchFacilities()),
    updateProfile: (details) => dispatch(updateProfile(details)),
    fetchTrip: () => dispatch(fetchTrip()),
    addRequests: (det) => dispatch(addRequests(det)),
    fetchUser: () => dispatch(fetchUser()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    addStory: (det) => dispatch(addStory(det))
});

class Main extends Component {


    componentDidMount() {
        if(this.props.auth.user) {
            this.props.fetchProfile(this.props.auth.user.username);
        }
        this.props.fetchStories();
        this.props.fetchDestination();
        this.props.fetchFacilities();
        this.props.fetchTrip();
        this.props.fetchUser();
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

        if(this.props.auth.usertype === 'Tourist') {
            return (
                <Switch>
                    <PrivateRoute exact path="/" component={() => <Home logoutUser={this.props.logoutUser} />} />
                    <PrivateRoute exact path="/addstory" component={() => <AddStory profile={this.props.profile} story={this.props.story} addStory={this.props.addStory} logoutUser={this.props.logoutUser} />} />
                    <PrivateRoute exact path="/stories" component={() => <Story stories={this.props.stories}  logoutUser={this.props.logoutUser} />} />
                    <PrivateRoute exact path="/profile" component={() => <Profile profile={this.props.profile} logoutUser={this.props.logoutUser}/>} />
                    <PrivateRoute exact path="/destination" component={() => <Destination destination={this.props.destination} logoutUser={this.props.logoutUser}/>} />
                    <PrivateRoute exact path="/maketrip" component={() => <MakeTrip logoutUser={this.props.logoutUser} trip={this.props.trip} profile={this.props.profile} addRequests={this.props.addRequests} request = {this.props.request} />} />
                    <PrivateRoute exact path="/editprofile" component={() => <EditProfile profile={this.props.profile} logoutUser={this.props.logoutUser} updateProfile={this.props.updateProfile} updateprofile={this.props.updateprofile}/>} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        else if(this.props.auth.usertype === 'Company') {
            return (
                <Switch>
                    <PrivateRoute exact path="/" component={() => <CompanyHome logoutUser={this.props.logoutUser}  />} />
                    <PrivateRoute exact path="/stories" component={() => <CStory stories={this.props.stories}  logoutUser={this.props.logoutUser}/>} />
                    <PrivateRoute exact path="/profile" component={() => <CProfile profile={this.props.profile} logoutUser={this.props.logoutUser}/>} />
                    <PrivateRoute exact path="/addservice" component={() => <AddService auth = {this.props.auth} addServices={this.props.addServices} services={this.props.services} logoutUser={this.props.logoutUser}/>} /> 
                    <PrivateRoute exact path="/viewservice" component={() => <Facility auth = {this.props.auth} facility={this.props.facility} logoutUser={this.props.logoutUser}/>} /> 
                    <PrivateRoute exact path="/editprofile" component={() => <CEditProfile profile={this.props.profile} logoutUser={this.props.logoutUser} updateProfile={this.props.updateProfile} updateprofile={this.props.updateprofile}/>} />
                    <PrivateRoute exact path="/checkusers" component={() => <CompanyCheck deleteUser={this.props.deleteUser} check={this.props.check} auth={this.props.auth} logoutUser={this.props.logoutUser} />} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        else {
            return (
                <Switch>
                    <Route exact path="/" component={() => <Login loginUser={this.props.loginUser} auth={this.props.auth} />} />
                    <Route exact path="/signup" component={() => <Registration registerUser={this.props.registerUser} registration={this.props.registration} />} />
                    <Redirect to="/" />
                </Switch>
            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));