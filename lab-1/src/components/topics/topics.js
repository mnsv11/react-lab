import React, { Component } from "react";
import "./topics.scss";
import "../header/header"
import Header from "../header/header";
import InputField from "../input/input";
import {connect} from 'react-redux';
import { createTopic } from '../../redux/actions/topicActions'
import PropTypes from 'prop-types';

class Topics extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            topic: {
                title: ""
            }
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    render() {
        return (
            <div className="topics">
                <Header title="Topics"/>
                {this.props.topics.map(this.topicRow)}
                <div className="topics-content">
                    <InputField type='text' value={this.state.topic.title} onChange={this.onTitleChange}/>
                    <input type='submit' value='Save' onClick={this.onClickSave}/>
                </div>
            </div>
        );
    }

    onTitleChange(event) {
        const topic = this.state.topic;
        topic.title = event.target.value;
        this.setState({
            topic: topic
        })

    }

    onClickSave() {
        this.props.dispatch(createTopic(this.state.topic))
    }

    topicRow(topic, index) {
        return <div key={index}>{topic.title}</div>;
    }


}

Topics.prototype = {
    dispatch: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        topics: state.topics
    }
}



export default connect(mapStateToProps)(Topics);