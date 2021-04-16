import React, { Component } from 'react';
import Home from './HomeComponent';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, Spinner, Label } from 'reactstrap';

class Story extends Component {

    render() {
        if (this.props.stories.isLoading) {
            return (
                <div>
                    <Home />
                    <Spinner className="offset-5 mt-5 mb-1" style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                </div>
            );
        }
        else if (this.props.stories.errMess) {
            return (
                <div>
                    <Home />
                    <h3>Unable to load Stories</h3>
                    <h4>{this.props.stories.errMess}</h4>
                </div>
            );
        }
        else {
            const RenderStory = this.props.stories.stories.map((story) => {
                return (
                    <Card body inverse color="danger" className="rounded m-3">
                        <CardTitle tag="h5">{story.Title}</CardTitle>
                        <CardSubtitle>~{story.Name}</CardSubtitle>
                        <CardText>{story.Description}</CardText>
                    </Card>
                );
            })
            return (
                <div>
                    <Home logoutUser={this.props.logoutUser}/>
                    <Label className="d-flex justify-content-center" style={{color: 'green', fontSize: '20px'}}>Stories</Label>
                    <div className="container">
                        {RenderStory}
                    </div>
                </div>
            );
        }

    }
}

export default Story;