import React, { Component } from "react";
import "./pieChart.scss";
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class PieChart extends Component {

    constructor(props){
        super(props);
        this.createPieChart = this.createPieChart.bind(this)
    }

    componentDidMount() {
        this.createPieChart();
    }

    componentDidUpdate() {
        this.createPieChart();
    }

    render() {
        return (
            <div id='content'/>
        );
    }

    createPieChart() {
        let svg = d3.select('#content')
            .append( "svg")
            .attr("width", 500)
            .attr("height", 500);
        let width = +svg.attr("width");
        let height = +svg.attr("height");
        let radius = Math.min(width, height) / 2;
        let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let pie = d3.pie()
            .sort(null)
            .value(d => { return d.population; });

        let path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        let tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip");

        d3.csv(this.props.dataCsv).then(data => {
            let arc = g.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc")
                .on("mouseover", d =>{
                    return tooltip.style("visibility", "visible").text("Population: " +  d.data.population);
                })
                .on("mousemove", () =>{
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", () =>{
                    return tooltip.style("visibility", "hidden");
                });

            arc.append("path")
                .attr("d", path)
                .attr("fill", d => { return color(d.data.age); });

            arc.append("text")
                .attr("transform", d => { return "translate(" + label.centroid(d) + ")"; })
                .attr("dy", "0.35em")
                .text(d => { return d.data.age; });
        }, (error) => {
            throw error;
        });
    }
}

PieChart.propTypes = {
    dataCsv: PropTypes.string.isRequired
};

export default PieChart;