import React, { Component } from 'react';
import Home from './HomeComponent';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, Spinner, Label, CardImg, CardBody } from 'reactstrap';

class Destination extends Component {

    render() {
        if (this.props.destination.isLoading) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser}/>
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.destination.errMess) {
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser}/>
                    <h3>Unable to load Destination</h3>
                    <h4>{this.props.destination.errMess}</h4>
                </div>
            );
        }
        else {
            const RenderDestination = this.props.destination.destination.map((destination) => {
                return (
                    <Card className="col-4">
                        <CardImg top src={destination.Uri} alt="Tiger Image" />
                        <CardBody>
                            <CardTitle><u>{destination.Name}</u></CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{destination.Besttime}</CardSubtitle>
                            <CardText>{destination.Description}</CardText>
                        </CardBody>
                    </Card>
                );
            })
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser}/>
                    <Label className="d-flex justify-content-center" style={{ color: 'green', fontSize: '20px' }}>Destination</Label>
                    <div className="row">
                        {RenderDestination}
                    </div>
                </div>
            );
        }

    }
}

export default Destination;