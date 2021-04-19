import React, { Component } from 'react';
import Home from './HomeComponent';
import './style.css';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, Spinner, Label, CardImg, CardBody, Modal, ModalBody, Badge } from 'reactstrap';

class Destination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Modal: false,
            link: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleClick(destination) {
        this.setState({
            link: destination.Youtube,
            Modal: !this.state.Modal
        }, () => console.log(this.state))
    }

    handleToggle() {
        this.setState({
            Modal: !this.state.Modal
        })
    }

    render() {
        if (this.props.destination.isLoading) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.destination.errMess) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <h3>Unable to load Destination</h3>
                    <h4>{this.props.destination.errMess}</h4>
                </div>
            );
        }
        else {
            const RenderDestination = this.props.destination.destination.map((destination) => {
                return (
                    <Card className="col-4" style={{cursor: 'pointer'}} onClick={() => this.handleClick(destination)}>
                        <CardImg top src={destination.Uri} alt="Tiger Image" />
                        <CardBody>
                            <CardTitle><u>{destination.Name}</u></CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted"><Badge color="info" pill>{destination.Besttime}</Badge></CardSubtitle>
                            <CardText>{destination.Description}</CardText>
                        </CardBody>
                    </Card>
                );
            })
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser} />
                    <Label className="d-flex justify-content-center" style={{ color: 'green', fontSize: '20px' }}>Destination</Label>
                    <div className="row">
                        {RenderDestination}
                    </div>
                    <Modal isOpen={this.state.Modal} toggle={this.handleToggle}>
                        {/* <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody> */}
                        <ModalBody>
                        <div className="video-responsive">
                            <iframe
                                width="853"
                                height="480"
                                src={`https://www.youtube.com/embed/${this.state.link}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Popular Destination"
                            />
                        </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }

    }
}

export default Destination;