import React, { Component } from 'react';
import CompanyHome from './CompanyHomeComponent';
// import { Card, CardTitle, CardText, CardGroup, CardSubtitle, CardImg, CardBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, Alert, Navbar, NavbarBrand,Button, NavLink, Spinner } from 'reactstrap';

class CEditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            alertType: '',
            alertMess: '',
            isAlert: false,
            usertype: 'Tourist'
        }
        this.handlechange = this.handlechange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSignUp() {
        if (this.state.firstname === '' || this.state.lastname === '' || this.state.email === '') {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: 'Complete all the fields before updating profile'
            })
        }
        else {
            console.log({...this.state, username: this.props.profile.profile.user.username})
            this.props.updateProfile({...this.state, username: this.props.profile.profile.user.username})
        }
    }

    componentDidMount() {
        if (this.props.profile.errMess) {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: this.props.profile.errMess
            })
        }
        if (this.props.updateprofile.registration.success) {
            this.setState({
                isAlert: true,
                alertType: 'success',
                alertMess: this.props.updateprofile.registration.status
            })
        }
    }


    render() {

        if (this.state.isAlert) {
            setTimeout(() => {
                this.setState({
                    isAlert: false
                })
            }, 3000);
        }

        const onDismiss = () => {
            this.setState({
                isAlert: false,
                alertType: '',
                alertMess: ''
            })
        }

        if (this.props.profile.isLoading) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.profile.errMess) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3>Unable to Edit Profile</h3>
                    <h4>{this.props.profile.errMess}</h4>
                </div>
            );
        }
        else if(this.props.profile.profile.success) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Label className="d-flex justify-content-center" style={{ color: 'green', fontSize: '20px' }}>Edit Profile</Label>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="ml-5 mt-3">
                        <FormGroup>
                            <Label for="Firstname">Firstname</Label>
                            <Input type="text" name="firstname" id="Firstname" className="col-6" placeholder="Firstname" value={this.state.firstname} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Lastname">Lastname</Label>
                            <Input type="text" name="lastname" id="Lastname" className="col-6" placeholder="Lastname" value={this.state.lastname} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input type="email" name="email" id="Email" className="col-6" placeholder="Email" value={this.state.email} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Button outline color="success" size="lg" onClick={this.handleSignUp} className="mr-2">Update Profile <i className="fa fa-edit" /></Button>
                        </FormGroup>
                    </Form>
                </div>
            );
        }
        else {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }

    }
}

export default CEditProfile;