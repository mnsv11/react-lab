import React, { Component } from "react";
import "./topics.scss";
import "../header/header"
import Header from "../header/header";
import PieChart from "../graphs/pieChart/pieChart"
import dataCsv from '../../assets/graphData.csv';

class Topics extends Component {



    render() {
        return (
            <div className="topics">
                <Header title="Topics"/>
                <div className='topics-content'>
                    <PieChart dataCsv={dataCsv}/>
                </div>
            </div>
        );
    }


}

export default Topics;