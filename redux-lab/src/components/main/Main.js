import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import "./main.scss";
import InputField from '../input/input';
import * as topicActions from '../../reduxComponents/actions/topicActions';

class Main extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            topic: {
                title: ""
            },
            header: [
                {
                    value: 'Name',
                    type: "string"
                }
            ]
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.topicRow = this.topicRow.bind(this);
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

    onKeyDown (key) {
        console.log(key);
    }

    onClickSave() {
        if(this.state.topic.title) {
            this.props.actions.createTopic(this.state.topic);
            this.setState({
                topic: {
                    title: ""
                }
            })
        }
    }

    topicRow(topic, index) {
        //debugger;


        setTimeout(() => {
            this.refs.lastRow.style.opacity = 1;
        }, 500);

        return <div className='main-row hidden' key={index} ref="lastRow">{topic.title}</div>;
    }
}

Main.propTypes = {
    actions: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        topics: state.topics
    }
}

function mapsDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(topicActions, dispatch)
    }
    
}

export default connect(mapStateToProps, mapsDispatchToProps)(Main);