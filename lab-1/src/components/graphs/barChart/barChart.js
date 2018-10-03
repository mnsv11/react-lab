import React, { Component } from "react";
import "./barChart.scss";
import * as d3 from 'd3';
import PropTypes from 'prop-types';


class BarChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidUpdate() {
        this.createBarChart();

    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        });
    }

    render() {
        return (
            <div id='barChart'/>
        );
    }

    createBarChart() {
        let svg = d3.select("#barChart")
            .append( "svg")
            .attr("width", 1000)
            .attr("height", 500);
        let margin = {top: 20, right: 20, bottom: 30, left: 40};
        let width = +svg.attr("width") - margin.left - margin.right;
        let height = +svg.attr("height") - margin.top - margin.bottom;
        let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        let y = d3.scaleLinear().rangeRound([height, 0]);
        let g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.tsv(this.state.data).then(data => {

            x.domain(data.map(d => { return d.letter; }));
            y.domain([0, d3.max(data, d => { return d.frequency; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => { return x(d.letter); })
                .attr("y", d => { return y(d.frequency); })
                .attr("width", x.bandwidth())
                .attr("height", d => { return height - y(d.frequency); });
        }, (error) => {
            throw error;
        });
    }
}

BarChart.propTypes = {
    data: PropTypes.string.isRequired
};

export default BarChart;