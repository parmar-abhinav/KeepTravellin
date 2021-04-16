import React, { Component } from 'react';
import Home from './HomeComponent';
// import { Card, CardTitle, CardText, CardGroup, CardSubtitle, CardImg, CardBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, Alert, Navbar, NavbarBrand,Button, NavLink, Spinner } from 'reactstrap';

class EditProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            Title: '',
            Description: '',
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
        if (this.state.Title === '' || this.state.Description === '') {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: 'Complete all the fields before updating profile'
            })
        }
        else {
            this.props.addStory({...this.state, username: this.props.profile.profile.user.username, firstname: this.props.profile.profile.user.firstname, lastname: this.props.profile.profile.user.lastname})
        }
    }

    componentDidMount() {
        if (this.props.story.errMess) {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: this.props.story.errMess
            })
        }
        if (this.props.story.story.success) {
            this.setState({
                isAlert: true,
                alertType: 'success',
                alertMess: this.props.story.story.status
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

        if (this.props.story.isLoading) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.story.errMess) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <h3>Unable to Edit Profile</h3>
                    <h4>{this.props.story.errMess}</h4>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Label className="d-flex justify-content-center" style={{ color: 'green', fontSize: '20px' }}>Add Story</Label>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="ml-5 mt-3">
                        <FormGroup>
                            <Label for="Title   ">Firstname</Label>
                            <Input type="text" name="Title" id="Title" className="col-6" placeholder="Title" value={this.state.Title} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Description">Lastname</Label>
                            <Input type="textarea" name="Description" id="Description" className="col-6" placeholder="Description" value={this.state.Description} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Button outline color="success" size="lg" onClick={this.handleSignUp} className="mr-2"> Add Story <i className="fa fa-plus" /></Button>
                        </FormGroup>
                    </Form>
                </div>
            );
        }

    }
}

export default EditProfile;