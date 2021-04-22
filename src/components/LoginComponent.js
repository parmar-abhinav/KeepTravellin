import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Navbar, NavbarBrand, Button, NavLink } from 'reactstrap';

import { Alert, Spinner } from 'reactstrap';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAlert: false,
            alertMess: ''
        }
        this.handlechange = this.handlechange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    componentDidMount() {
        if (this.props.auth.errMess) {

            this.setState({
                isAlert: true,
                alertMess: this.props.auth.errMess
            })
        }
    }


    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin() {
        if (this.state.username === '' || this.state.password === '') {
            this.setState({
                isAlert: true,
                alertMess: 'Complete all the fields before login!'
            })
        }
        else {
            this.props.loginUser(this.state);
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
                alertMess: ''
            })
        }

        if (this.props.auth.isLoading) {
            return (
                <div>
                    <Navbar color="light" light>
                        <NavbarBrand href="/">KeepTravellin'</NavbarBrand>
                    </Navbar>
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        return (
            <div>
                <Navbar color="light" light>
                    <NavbarBrand href="/">KeepTravellin'</NavbarBrand>
                </Navbar>
                <Alert color="danger" isOpen={this.state.isAlert} toggle={onDismiss}>
                    {this.state.alertMess}
                </Alert>
                <div className="row mt-5">
                    <div className="col-5"></div>
                    <Form>
                        <FormGroup>
                            <Label for="Username">Username</Label>
                            <Input type="text" name="username" id="Username" className="col" placeholder="Username" value={this.state.username} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input type="password" name="password" id="Password" className="col" placeholder="Password" value={this.state.password} onChange={this.handlechange} />
                        </FormGroup>
                        <FormGroup>
                            <Button outline color="success" size="lg" onClick={this.handleLogin}>Login <i className="fa fa-sign-in" /></Button>
                        </FormGroup>
                        <FormGroup>
                            <Label>Don't have an account <a href="/signup">Create One</a></Label>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;