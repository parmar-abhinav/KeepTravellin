import React, { Component } from 'react';
import CompanyHome from './CompanyHomeComponent';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, Spinner, Label, CardHeader, CardBody } from 'reactstrap';

class Check extends Component {

    render() {
        if (this.props.check.isLoading) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.check.errMess) {
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <h3>Unable to load Stories</h3>
                    <h4>{this.props.check.errMess}</h4>
                </div>
            );
        }
        else if(this.props.check.check.success){
            const RenderUser = this.props.check.check.check.filter(user => user.username == this.props.auth.user.username).map((user) => {
                return (
                    <div>
                        <Card className="m-3">
                            <CardHeader>
                                {user.service}
                                <a
                                style={{textDecoration: 'none'}}
                                className="fa fa-trash fa-lg d-flex justify-content-end"
                                 onClick={() => {
                                    this.props.deleteUser(user._id);
                                }}></a>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <CardSubtitle className="col-3" >First Name</CardSubtitle>
                                    <CardSubtitle className="col-3">{user.firstname}</CardSubtitle>
                                </div>
                                <div className="row">
                                    <CardSubtitle className="col-3">Last Name</CardSubtitle>
                                    <CardSubtitle className="col-3">{user.lastname}</CardSubtitle>
                                </div>
                                <div className="row">
                                    <CardSubtitle className="col-3">Mobile Number</CardSubtitle>
                                    <CardSubtitle className="col-3">{user.mobnumber}</CardSubtitle>
                                </div>
                                <div className="row">
                                    <CardSubtitle className="col-3">Email</CardSubtitle>
                                    <CardSubtitle className="col-3">{user.email}</CardSubtitle>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                );
            })
            return (
                <div>
                    <CompanyHome logoutUser={this.props.logoutUser} />
                    <Label className="d-flex justify-content-center" style={{ color: 'green', fontSize: '20px' }}>Check Users</Label>
                    <div className="container">
                        {RenderUser}
                    </div>
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

export default Check;