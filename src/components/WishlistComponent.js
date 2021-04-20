import React, { Component } from 'react';
import Home from './HomeComponent';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, Spinner, Label, CardHeader, CardBody } from 'reactstrap';

class WishList extends Component {

    render() {
        if (this.props.wish.isLoading) {
            return (
                <div>
                    <Home />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.wish.errMess) {
            return (
                <div>
                    <Home />
                    <h3>Unable to load wish</h3>
                    <h4>{this.props.wish.errMess}</h4>
                </div>
            );
        }
        else if(this.props.wish.wish.success && this.props.profile.profile.success){
            const RenderWishes = this.props.wish.wish.story.filter((wish) => wish.touristusername == this.props.profile.profile.user.username).map((wish) => {
                if(wish.service === 'Flight') {
                    return (
                        <Card className="m-3">
                        <CardHeader>
                            {wish.service} - {wish.flightname}
                            <a
                            style={{textDecoration: 'none'}}
                            className="fa fa-trash fa-lg d-flex justify-content-end"
                             onClick={() => {
                                this.props.removeWishes(wish);
                            }}></a>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <CardSubtitle className="col-3" >Manager Name</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.name}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.mobnumber}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Source</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.source}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Destination</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.destination}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Day</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.date}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Departure Time</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.time}</CardSubtitle>
                            </div>
                        </CardBody>
                    </Card>
                    );
                }
                else if(wish.service === 'Bus') {
                    return (
                        <Card className="m-3">
                        <CardHeader>
                            {wish.service} - {wish.busname}
                            <a
                            style={{textDecoration: 'none'}}
                            className="fa fa-trash fa-lg d-flex justify-content-end"
                             onClick={() => {
                                this.props.removeWishes(wish);
                            }}></a>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <CardSubtitle className="col-3" >Manager Name</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.name}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.mobnumber}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Source</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.source}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Destination</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.destination}</CardSubtitle>
                            </div>
                        </CardBody>
                    </Card>
                    );
                }
                else if(wish.service === 'Taxi') {
                    return (
                        <Card className="m-3">
                        <CardHeader>
                            {wish.service}
                            <a
                            style={{textDecoration: 'none'}}
                            className="fa fa-trash fa-lg d-flex justify-content-end"
                             onClick={() => {
                                this.props.removeWishes(wish);
                            }}></a>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <CardSubtitle className="col-3" >Manager Name</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.name}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.mobnumber}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">City</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.city}</CardSubtitle>
                            </div>
                        </CardBody>
                    </Card>
                    );
                }
                else if(wish.service === 'Hotel') {
                    return (
                        <Card className="m-3">
                        <CardHeader>
                            {wish.service} - {wish.hotelname}
                            <a
                            style={{textDecoration: 'none'}}
                            className="fa fa-trash fa-lg d-flex justify-content-end"
                             onClick={() => {
                                this.props.removeWishes(wish);
                            }}></a>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <CardSubtitle className="col-3" >Manager Name</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.name}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.mobnumber}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">City</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.city}</CardSubtitle>
                            </div>
                        </CardBody>
                    </Card>
                    );
                }
                else if(wish.service === 'Ristorante') {
                    return (
                        <Card className="m-3">
                        <CardHeader>
                            {wish.service} - {wish.ristorantename}
                            <a
                            style={{textDecoration: 'none'}}
                            className="fa fa-trash fa-lg d-flex justify-content-end"
                             onClick={() => {
                                this.props.removeWishes(wish);
                            }}></a>
                        </CardHeader>
                        <CardBody>
                            <div className="row">
                                <CardSubtitle className="col-3" >Manager Name</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.name}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.mobnumber}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">City</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.city}</CardSubtitle>
                            </div>
                            <div className="row">
                                <CardSubtitle className="col-3">Home Delivery</CardSubtitle>
                                <CardSubtitle className="col-3">{wish.radio1}</CardSubtitle>
                            </div>
                        </CardBody>
                    </Card>
                    );
                }
            })
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser}/>
                    <Label className="d-flex justify-content-center" style={{color: 'green', fontSize: '20px'}}>WishList</Label>
                    <div className="container">
                        {RenderWishes}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Home />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
    }
}

export default WishList;