import React, { Component } from 'react';
import Home from './HomeComponent';
import { Col, Row, Button, Form, FormGroup, Label, Input, Collapse, Card, CardTitle, Alert, CardText, Spinner, CardGroup, CardSubtitle, CardImg, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MakeTrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            source: '',
            destination: '',
            isOpen: false,
            flightOpen: false,
            busOpen: false,
            taxiOpen: false,
            hotelOpen: false,
            ristoranteOpen: false,
            alertType: '',
            alertMess: '',
            isAlert: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFlight = this.handleFlight.bind(this);
        this.handleBus = this.handleBus.bind(this);
        this.handleHotel = this.handleHotel.bind(this);
        this.handleRistorante = this.handleRistorante.bind(this);
        this.handleTaxi = this.handleTaxi.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    componentDidMount() {
        if (this.props.request.errMess) {
            this.setState({
                isAlert: true,
                alertType: 'danger',
                alertMess: this.props.request.errMess
            })
        }
        if (this.props.request.request.success) {
            this.setState({
                isAlert: true,
                alertType: 'success',
                alertMess: this.props.request.request.status
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearch() {
        this.setState({
            isOpen: true
        })
    }

    handleFlight() {
        this.setState({
            flightOpen: !this.state.flightOpen
        })
    }

    handleBus() {
        this.setState({
            busOpen: !this.state.busOpen
        })
    }

    handleHotel() {
        this.setState({
            hotelOpen: !this.state.hotelOpen
        })
    }

    handleTaxi() {
        this.setState({
            taxiOpen: !this.state.taxiOpen
        })
    }

    handleRistorante() {
        this.setState({
            ristoranteOpen: !this.state.ristoranteOpen
        })
    }

    handleRequest(details) {
        this.props.addRequests(details);
    }

    render() {

       

        if (this.props.trip.isLoading) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.trip.errMess) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <h3>Unable to load Profile</h3>
                    <h4>{this.props.profile.errMess}</h4>
                </div>
            );
        }
        else if (this.props.profile.profile.success) {
            const renderFlight = this.props.trip.trip.filter(flight => flight.service === 'Flight' && flight.source == this.state.source && flight.destination == this.state.destination).map(flight => {
                return (
                    <Card className="m-3 p-3">
                        
                        <div className="row">
                            <CardTitle className="col-4">Flight Name</CardTitle>
                            <CardTitle className="col-6">{flight.flightname}</CardTitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Contact Name</CardSubtitle>
                            <CardSubtitle className="col-6">{flight.name}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Mobile No.</CardSubtitle>
                            <CardSubtitle className="col-6">{flight.mobnumber}</CardSubtitle>
                        </div>
                        <Button className="mt-3" outline color="success" onClick={() => {
                            this.props.addRequests({
                                username: flight.username,
                                service: 'Flight',
                                touristusername: this.props.profile.profile.user.username,
                                firstname: this.props.profile.profile.user.firstname,
                                lastname: this.props.profile.profile.user.lastname,
                                email: this.props.profile.profile.user.email
                            })
                        }}>Request Call</Button>{' '}
                    </Card>
                );
            })

            const renderBus = this.props.trip.trip.filter(flight => flight.service === 'Bus' && flight.source == this.state.source && flight.destination == this.state.destination).map(bus => {
                return (
                    <Card className="m-3 p-3">
                        <div className="row">
                            <CardTitle className="col-4">Bus Name</CardTitle>
                            <CardTitle className="col-6">{bus.busname}</CardTitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Contact Name</CardSubtitle>
                            <CardSubtitle className="col-6">{bus.name}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Mobile No.</CardSubtitle>
                            <CardSubtitle className="col-6">{bus.mobnumber}</CardSubtitle>
                        </div>
                        <Button className="mt-3" outline color="success" onClick={() => {
                            this.props.addRequests({
                                username: bus.username,
                                service: 'Bus',
                                touristusername: this.props.profile.profile.user.username,
                                firstname: this.props.profile.profile.user.firstname,
                                lastname: this.props.profile.profile.user.lastname,
                                email: this.props.profile.profile.user.email
                            })
                        }}>Request Call</Button>{' '}
                    </Card>
                );
            })

            const renderTaxi = this.props.trip.trip.filter(flight => flight.service === 'Taxi' && flight.city == this.state.destination).map(taxi => {
                return (
                    <Card className="m-3 p-3">
                        <div className="row">
                            <CardTitle className="col-4">Contact Name</CardTitle>
                            <CardTitle className="col-6">{taxi.name}</CardTitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Mobile No.</CardSubtitle>
                            <CardSubtitle className="col-6">{taxi.mobnumber}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">City</CardSubtitle>
                            <CardSubtitle className="col-6">{taxi.city}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">State</CardSubtitle>
                            <CardSubtitle className="col-6">{taxi.state}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Pin Code</CardSubtitle>
                            <CardSubtitle className="col-6">{taxi.pincode}</CardSubtitle>
                        </div>
                        <Button className="mt-3" outline color="success" onClick={() => {
                            this.props.addRequests({
                                username: taxi.username,
                                service: 'Taxi',
                                touristusername: this.props.profile.profile.user.username,
                                firstname: this.props.profile.profile.user.firstname,
                                lastname: this.props.profile.profile.user.lastname,
                                email: this.props.profile.profile.user.email
                            })
                        }}>Request Call</Button>{' '}
                    </Card>
                );
            })

            const renderHotel = this.props.trip.trip.filter(flight => flight.service === 'Hotel' && flight.city == this.state.destination).map(hotel => {
                return (
                    <Card className="m-3 p-3">
                        <div className="row">
                            <CardTitle className="col-4">Hotel Name</CardTitle>
                            <CardTitle className="col-6">{hotel.hotelname}</CardTitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Contact Name</CardSubtitle>
                            <CardSubtitle className="col-6">{hotel.name}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Mobile No.</CardSubtitle>
                            <CardSubtitle className="col-6">{hotel.mobnumber}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">City</CardSubtitle>
                            <CardSubtitle className="col-6">{hotel.city}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">State</CardSubtitle>
                            <CardSubtitle className="col-6">{hotel.state}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Pin Code</CardSubtitle>
                            <CardSubtitle className="col-6">{hotel.pincode}</CardSubtitle>
                        </div>
                        <Button className="mt-3" outline color="success" onClick={() => {
                            this.props.addRequests({
                                username: hotel.username,
                                service: 'Hotel',
                                touristusername: this.props.profile.profile.user.username,
                                firstname: this.props.profile.profile.user.firstname,
                                lastname: this.props.profile.profile.user.lastname,
                                email: this.props.profile.profile.user.email
                            })
                        }}>Request Call</Button>{' '}
                    </Card>
                );
            })

            const renderRistorante = this.props.trip.trip.filter(flight => flight.service === 'Ristorante' && flight.city == this.state.destination).map(ristorante => {
                return (
                    <Card className="m-3 p-3">
                        <div className="row">
                            <CardTitle className="col-4">Ristorante Name</CardTitle>
                            <CardTitle className="col-6">{ristorante.ristorantename}</CardTitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Contact Name</CardSubtitle>
                            <CardSubtitle className="col-6">{ristorante.name}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Mobile No.</CardSubtitle>
                            <CardSubtitle className="col-6">{ristorante.mobnumber}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">City</CardSubtitle>
                            <CardSubtitle className="col-6">{ristorante.city}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">State</CardSubtitle>
                            <CardSubtitle className="col-6">{ristorante.state}</CardSubtitle>
                        </div>
                        <div className="row">
                            <CardSubtitle className="col-4">Pin Code</CardSubtitle>
                            <CardSubtitle className="col-6">{ristorante.pincode}</CardSubtitle>
                        </div>
                        <Button className="mt-3" outline color="success" onClick={() => {
                            this.props.addRequests({
                                username: ristorante.username,
                                service: 'Ristorante',
                                touristusername: this.props.profile.profile.user.username,
                                firstname: this.props.profile.profile.user.firstname,
                                lastname: this.props.profile.profile.user.lastname,
                                email: this.props.profile.profile.user.email
                            })
                        }}>Request Call</Button>{' '}
                    </Card>
                );
            })

            const closeBtn = <button className="close" onClick={this.handleFlight}>&times;</button>;
            const closeBtnBus = <button className="close" onClick={this.handleBus}>&times;</button>;
            const closeBtnTaxi = <button className="close" onClick={this.handleTaxi}>&times;</button>;
            const closeBtnHotel = <button className="close" onClick={this.handleHotel}>&times;</button>;
            const closeBtnRistorante = <button className="close" onClick={this.handleRistorante}>&times;</button>;

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
            
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Alert color={this.state.alertType} isOpen={this.state.isAlert} toggle={this.onDismiss}>
                        {this.state.alertMess}
                    </Alert>
                    <Form className="row ml-5 pl-5">
                        <FormGroup className="col-5 ml-5">
                            <Label for="source">Source</Label>
                            <Input type="text" id="source" name="source" value={this.state.source} onChange={this.handleChange} placeholder="Source" />
                        </FormGroup>
                        <FormGroup className="col-5">
                            <Label for="destination">Destination</Label>
                            <Input type="text" id="destination" name="destination" value={this.state.destination} onChange={this.handleChange} placeholder="Destination" />
                        </FormGroup>
                    </Form>
                    <div className="d-flex justify-content-center">
                        <Button outline color="success" size="md" onClick={this.handleSearch}>Search <i className="fa fa-search" /></Button>
                    </div>
                    <Collapse isOpen={this.state.isOpen}>
                        <div className="container">
                            <div className="row ml-5 pl-5 mt-5">
                                <Button className="col-3 m-2" size="lg" color="primary" onClick={this.handleFlight}><span className="fa fa-plane fa-lg"></span> Flight</Button>{' '}
                                <Button className="col-3 m-2" size="lg" color="secondary" onClick={this.handleBus}><span className="fa fa-bus fa-lg"></span> Bus</Button>{' '}
                                <Button className="col-3 m-2" size="lg" color="success" onClick={this.handleTaxi}><span className="fa fa-taxi fa-lg"></span> Taxi</Button>{' '}
                            </div>
                            <div className="row ml-5 pl-5">
                                <Button className="col-4 m-2 ml-5 " size="lg" color="info" onClick={this.handleHotel}><span className="fa fa-hotel fa-lg"></span> Hotel</Button>{' '}
                                <Button className="col-4 m-2" size="lg" color="danger" onClick={this.handleRistorante}><span className="fa fa-cutlery fa-lg"></span> Ristorante</Button>{' '}
                            </div>
                        </div>
                    </Collapse>
                    <Modal isOpen={this.state.flightOpen} toggle={this.handleFlight}>
                        <ModalHeader toggle={this.handleFlight} close={closeBtn}>Flight From <u>{this.state.source}</u> to <u>{this.state.destination}</u></ModalHeader>
                        <ModalBody>
                            {renderFlight}
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.busOpen} toggle={this.handleBus}>
                        <ModalHeader toggle={this.handleBus} close={closeBtnBus}>Bus From <u>{this.state.source}</u> to <u>{this.state.destination}</u></ModalHeader>
                        <ModalBody>
                            {renderBus}
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.taxiOpen} toggle={this.handleTaxi}>
                        <ModalHeader toggle={this.handleTaxi} close={closeBtnTaxi}>Taxi in city <u>{this.state.destination}</u></ModalHeader>
                        <ModalBody>
                            {renderTaxi}
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.hotelOpen} toggle={this.handleHotel}>
                        <ModalHeader toggle={this.handleHotel} close={closeBtnHotel}>Hotel in city <u>{this.state.destination}</u></ModalHeader>
                        <ModalBody>
                            {renderHotel}
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={this.state.ristoranteOpen} toggle={this.handleRistorante}>
                        <ModalHeader toggle={this.handleRistorante} close={closeBtnRistorante}>Ristorante in city <u>{this.state.destination}</u></ModalHeader>
                        <ModalBody>
                            {renderRistorante}
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
    }
}

export default MakeTrip;