import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import "./main.scss";
import InputField from '../input/input';
import * as topicActions from '../../reduxComponents/actions/topicActions'

class Main extends Component {

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
            <div className="main">
                <div className='main-head'><h1>Main</h1></div>
                <div className="main-content">
                    <InputField type='text' value={this.state.topic.title} onChange={this.onTitleChange}/>
                    <input type='submit' value='Save' onClick={this.onClickSave}/>
                </div>
                {this.props.topics.map(this.topicRow)}
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
        if(this.state.topic.title) {
            this.props.dispatch(topicActions.createTopic(this.state.topic));
            this.setState({
                topic: {
                    title: ""
                }
            })
        }
    }

    topicRow(topic, index) {
        //debugger;
        return <div className='main-row' key={index}>{topic.title}</div>;
    }
}

Main.propTypes = {
    dispatch: PropTypes.func.isRequired,
    topics: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        topics: state.topics
    }
}

export default connect(mapStateToProps)(Main);