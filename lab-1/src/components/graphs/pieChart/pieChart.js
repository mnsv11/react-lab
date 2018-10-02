import React, { Component } from "react";
import "./pieChart.scss";
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class PieChart extends Component {

    constructor(props){
        super(props);
        this.createPieChart = this.createPieChart.bind(this)
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
            .attr("width", 400)
            .attr("height", 400);
        let width = +svg.attr("width");
        let height = +svg.attr("height");
        let radius = Math.min(width, height) / 2;
        let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        let color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let pie = d3.pie()
            .sort(null)
            .value(d => { return d.users; });

        let path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let label = d3.arc()
            .outerRadius(radius - 60)
            .innerRadius(radius - 60);

        let tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip");

        let arc = g.selectAll(".arc")
            .data(pie(this.props.data))
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover", d =>{
                return tooltip.style("visibility", "visible").text("Users: " +  d.data.users);
            })
            .on("mousemove", () =>{
                return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
            })
            .on("mouseout", () =>{
                return tooltip.style("visibility", "hidden");
            });

        arc.append("path")
            .attr("d", path)
            .attr("fill", d => {
                if(d.data.users > 0) {
                    return color(d.data.age);
                }
            });

        arc.append("text")
            .attr("transform", d => { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .style("font-size", "15px")
            .text(d => {
                if(d.data.users > 0) {
                    return d.data.age;
                }
            });

    }
}

PieChart.propTypes = {
    data: PropTypes.array.isRequired
};

export default PieChart;