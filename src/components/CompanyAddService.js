import React, { Component } from 'react';
import CompanyHome from './CompanyHomeComponent';
import { Alert, Spinner, Form, Input, FormGroup, Label, Button } from 'reactstrap';



class AddService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            service: "select",
            name: '',
            mobnumber: '',
            hotelname: '',
            city: '',
            state: '',
            pincode: '',
            busname: '',
            source: '',
            destination: '',
            flightname: '',
            radio1: '',
            ristorantename: '',
            username: this.props.auth.user.username,
            isAlert: false,
            alertMess: '',
            alertType: '',
            date: 'select',
            time: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleHotelReset = this.handleHotelReset.bind(this);
        this.handleBusReset = this.handleBusReset.bind(this);
        this.handleFlightReset = this.handleFlightReset.bind(this);
        this.handleTaxiReset = this.handleTaxiReset.bind(this);
        this.handleRistoranteReset = this.handleRistoranteReset.bind(this);
        this.handleServices = this.handleServices.bind(this);
    }

    componentDidMount() {
        if (this.props.services.errMess) {
            this.setState({
                isAlert: true,
                alertMess: this.props.services.errMess,
                alertType: 'danger'
            })
        }

        if (this.props.services.services.success) {
            this.setState({
                isAlert: true,
                alertType: 'success',
                alertMess: this.props.services.services.status
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleRistoranteReset() {
        this.setState({
            service: "Ristorante",
            name: '',
            mobnumber: '',
            hotelname: '',
            city: '',
            state: '',
            pincode: '',
            busname: '',
            source: '',
            destination: '',
            flightname: '',
            radio1: '',
            ristorantename: '',
            image: ''
        })
    }

    handleTaxiReset() {
        this.setState({
            service: "Taxi",
            name: '',
            mobnumber: '',
            city: '',
            state: '',
            pincode: ''
        })
    }
    handleFlightReset() {
        this.setState({
            service: "Flight",
            name: '',
            flightname: '',
            mobnumber: '',
            source: '',
            destination: '',
            date: 'select',
            time: ''
        })
    }

    handleBusReset() {
        this.setState({
            service: "Bus",
            name: '',
            busname: '',
            mobnumber: '',
            source: '',
            destination: ''
        })
    }


    handleHotelReset() {
        this.setState({
            service: "Hotel",
            name: '',
            mobnumber: '',
            hotelname: '',
            city: '',
            state: '',
            pincode: ''
        })
    }

    handleServices() {
        this.props.addServices(this.state);
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

        if (this.props.services.isLoading) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }

        else if (this.state.service === 'select') {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-2">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                    </Form>
                </div>
            );
        }
        else if (this.state.service === 'Hotel') {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-3">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                        <FormGroup >
                            <Label for="name" >Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="mobnumber" >Mobile Number</Label>
                            <Input type="number" name="mobnumber" id="mobnumber" placeholder="Mobile Number" value={this.state.mobnumber} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="hotelname" >Hotel Name</Label>
                            <Input type="text" name="hotelname" id="hotelname" placeholder="Hotel Name" value={this.state.hotelname} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="city" >City</Label>
                            <Input type="text" name="city" id="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="state" >State</Label>
                            <Input type="text" name="state" id="state" placeholder="State" value={this.state.states} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="pin" >Pin Code</Label>
                            <Input type="number" name="pincode" id="pincode" placeholder="Pin Code" value={this.state.pincode} onChange={this.handleChange} />
                        </FormGroup>
                        <Button outline color="success" size="lg" onClick={this.handleServices}>Add Hotel <i className="fa fa-plus" /></Button>
                        <Button outline color="secondary" size="lg" onClick={this.handleHotelReset} className="m-2">Reset <i className="fa fa-ban" /></Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.service === "Bus") {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-2">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                        <FormGroup >
                            <Label for="name" >Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="mobnumber" >Mobile Number</Label>
                            <Input type="number" name="mobnumber" id="mobnumber" placeholder="Mobile Number" value={this.state.mobnumber} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="busname" >Bus Name</Label>
                            <Input type="text" name="busname" id="busname" placeholder="Bus Name" value={this.state.busname} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="source" >Source</Label>
                            <Input type="text" name="source" id="source" placeholder="Source" value={this.state.source} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="destination" >Destination</Label>
                            <Input type="text" name="destination" id="destination" placeholder="Destination" value={this.state.destination} onChange={this.handleChange} />
                        </FormGroup>
                        <Button outline color="success" size="lg" onClick={this.handleServices}>Add Bus <i className="fa fa-plus" /></Button>
                        <Button outline color="secondary" size="lg" onClick={this.handleBusReset} className="m-2">Reset <i className="fa fa-ban" /></Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.service === "Flight") {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-2">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                        <FormGroup >
                            <Label for="name" >Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="mobnumber" >Mobile Number</Label>
                            <Input type="number" name="mobnumber" id="mobnumber" placeholder="Mobile Number" value={this.state.mobnumber} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="flightname" >Flight Name</Label>
                            <Input type="text" name="flightname" id="flightname" placeholder="Flight Name" value={this.state.flightname} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="source" >Source</Label>
                            <Input type="text" name="source" id="source" placeholder="Source" value={this.state.source} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="destination" >Destination</Label>
                            <Input type="text" name="destination" id="destination" placeholder="Destination" value={this.state.destination} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date" >Day</Label>
                            <Input type="select" name="date" id="date" value={this.state.date} onChange={this.handleChange}>
                                <option value="select">Select</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="time" >Time</Label>
                            <Input type="time" name="time" id="time" placeholder="Time" value={this.state.time} onChange={this.handleChange} />
                        </FormGroup>
                        <Button outline color="success" size="lg" onClick={this.handleServices}>Add Flight <i className="fa fa-plus" /></Button>
                        <Button outline color="secondary" size="lg" onClick={this.handleFlightReset} className="m-2">Reset <i className="fa fa-ban" /></Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.service === "Taxi") {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-2">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                        <FormGroup >
                            <Label for="name" >Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="mobnumber" >Mobile Number</Label>
                            <Input type="number" name="mobnumber" id="mobnumber" placeholder="Mobile Number" value={this.state.mobnumber} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="city" >City</Label>
                            <Input type="text" name="city" id="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="state" >State</Label>
                            <Input type="text" name="state" id="state" placeholder="State" value={this.state.states} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="pin" >Pin Code</Label>
                            <Input type="number" name="pincode" id="pincode" placeholder="Pin Code" value={this.state.pincode} onChange={this.handleChange} />
                        </FormGroup>
                        <Button outline color="success" size="lg" onClick={this.handleServices}>Add Taxi <i className="fa fa-plus" /></Button>
                        <Button outline color="secondary" size="lg" onClick={this.handleTaxiReset} className="m-2">Reset <i className="fa fa-ban" /></Button>
                    </Form>
                </div>
            );
        }
        else if (this.state.service === "Ristorante") {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3 className="d-flex justify-content-center mt-2" style={{ color: 'green' }}>Add Services</h3>
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="container">
                        <Input type="select" value={this.state.service} name="service" onChange={this.handleChange} className="mb-2">
                            <option value="select">Select</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Bus">Bus</option>
                            <option value="Flight">Flight</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Ristorante">Ristorante</option>
                        </Input>
                        <FormGroup >
                            <Label for="name" >Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="mobnumber" >Mobile Number</Label>
                            <Input type="number" name="mobnumber" id="mobnumber" placeholder="Mobile Number" value={this.state.mobnumber} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="ristorante" >Ristorante Name</Label>
                            <Input type="text" name="ristorantename" id="ristorante" placeholder="Ristorante Name" value={this.state.ristorantename} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="city" >City</Label>
                            <Input type="text" name="city" id="city" placeholder="City" value={this.state.city} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="state" >State</Label>
                            <Input type="text" name="state" id="state" placeholder="State" value={this.state.states} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup >
                            <Label for="pin" >Pin Code</Label>
                            <Input type="number" name="pincode" id="pincode" placeholder="Pin Code" value={this.state.pincode} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup tag="fieldset" onChange={this.handleChange}>
                            <Label>Home Delivery</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" value="Yes" name="radio1" />{' '}
                                    Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" value="No" name="radio1" />{' '}
                                    No
                            </Label>
                            </FormGroup>
                        </FormGroup>
                        <Button outline color="success" size="lg" onClick={this.handleServices}>Add Ristorante <i className="fa fa-plus" /></Button>
                        <Button outline color="secondary" size="lg" onClick={this.handleRistoranteReset} className="m-2">Reset <i className="fa fa-ban" /></Button>
                    </Form>
                </div>
            );
        }
    }
}

export default AddService;