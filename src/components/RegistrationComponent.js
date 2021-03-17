import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Alert, Navbar, NavbarBrand, Button, NavLink, Spinner } from 'reactstrap';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            alertType: '',
            alertMess: '',
            isAlert: false
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
        if (this.state.username === '' || this.state.password === '' || this.state.firstname === '' || this.state.lastname === '' || this.state.email === '') {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: 'Complete all the fields before registration'
            })
        }
        else {
            this.props.registerUser(this.state)
        }
    }

    componentDidMount() {
        if (this.props.registration.errMess) {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: this.props.registration.errMess
            })
        }
        if (this.props.registration.registration.success) {
            this.setState({
                isAlert: true,
                alertType: 'success',
                alertMess: this.props.registration.registration.status
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

        if (this.props.registration.isLoading) {
            return (
                <div>
                    <Navbar color="light" light>
                        <NavbarBrand href="/">KeepTravellin'</NavbarBrand>
                    </Navbar>
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Navbar color="light" light>
                        <NavbarBrand href="/">KeepTravellin'</NavbarBrand>
                    </Navbar>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="ml-5 mt-3">
                        <FormGroup>
                            <Label for="Username">Username</Label>
                            <Input type="text" name="username" id="Username" className="col-6" placeholder="Username" value={this.state.username} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" className="col-6" placeholder="Password" value={this.state.password} onChange={this.handlechange} />
                        </FormGroup>
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
                            <Button outline color="success" size="lg" onClick={this.handleSignUp} className="mr-2">Signup <i className="fa fa-user-plus" /></Button>
                            <Button outline color="primary" size="lg" href="http://localhost:3000/"> Login <i className="fa fa-sign-in" /></Button>
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }
}

export default Registration;