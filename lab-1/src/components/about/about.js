import React, { Component } from "react";
import "./about.scss";
import Header from "../header/header";

class About extends Component {
    render() {
        return (
            <div className="about">
                <Header title="About"/>
            </div>
        );
    }
}

export default About;