import React, { Component } from "react";
import "./main.scss";
import InputField from '../input/input';


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
        //this.props.dispatch(createTopic(this.state.topic))

        console.log(this.state.topic)
    }

    topicRow(topic, index) {
        return <div key={index}>{topic.title}</div>;
    }
}


function mapStateToProps(state, ownProps) {
    return {
        topics: state.topics
    }
}





export default Main;