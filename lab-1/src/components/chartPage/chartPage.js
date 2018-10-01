import React, { Component } from "react";
import "./chartPage.scss";
import "../header/header"
import Header from "../header/header";
import PieChart from "../graphs/pieChart/pieChart"
import dataCsv from '../../assets/graphData.csv';

class ChartPage extends Component {

    render() {
        return (
            <div className="chartPage">
                <Header title="Charts"/>
                <div className='chartPage-content'>
                    <PieChart dataCsv={dataCsv}/>
                </div>
            </div>
        );
    }
}

export default ChartPage;