import React, { Component } from "react";
import "./lineChart.scss";
import * as d3 from 'd3';
import PropTypes from 'prop-types';

let created = false;

class LineChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
        this.createLineChart = this.createLineChart.bind(this)
    }

    componentDidUpdate() {
        this.createLineChart();

    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        });
    }

    render() {
        return (
            <div id='lineChart'/>
        );
    }

    createLineChart() {
        let svg = d3.select("#lineChart")
            .append( "svg")
            .attr("class", "svg")
            .attr("width", 1000)
            .attr("height", 500);
        let margin = {top: 20, right: 80, bottom: 30, left: 50};
        let width = svg.attr("width") - margin.left - margin.right;
        let height = svg.attr("height") - margin.top - margin.bottom;
        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let bisectDate = d3.bisector(d => { return d.date; }).left;
        let parseTime = d3.timeParse("%Y%m%d");
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);
        let z = d3.scaleOrdinal(d3.schemeCategory10);

        let line = d3.line()
            .curve(d3.curveBasis)
            .x(d => { return x(d.date); })
            .y(d => { return y(d.temperature); });

        d3.tsv(this.state.data, type).then(data => {
            let cities = data.columns.slice(1).map(id => {
                return {
                    id: id,
                    values: data.map(d => {
                        return {date: d.date, temperature: d[id]};
                    })
                };
            });

            x.domain(d3.extent(data, d => { return d.date; }));

            y.domain([
                d3.min(cities, c => { return d3.min(c.values, d => { return d.temperature; }); }),
                d3.max(cities, c => { return d3.max(c.values, d => { return d.temperature; }); })
            ]);

            z.domain(cities.map(c => {return c.id;}));

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Temperature, ºF");

            let tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip");

            let city = g.selectAll(".city")
                .data(cities)
                .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", d => { return line(d.values); })
                .style("stroke", d => { return z(d.id); })
                .on("mouseover", d =>{
                    return tooltip.style("visibility", "visible");
                })
                .on("mouseout", () =>{
                    return tooltip.style("visibility", "hidden");
                })
                .on("mousemove", mousemove);

            city.append("text")
                .datum(d => { return {id: d.id, value: d.values[d.values.length - 1]}; })
                .attr("transform", d => {return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";})
                .attr("x", 3)
                .style("font", "10px sans-serif")
                .text(d => { return d.id; });


            function mousemove(a, b) {
                let x0 = x.invert(d3.mouse(this)[0]);
                let i = bisectDate(data, x0, 1);
                if(data[i]) {
                    let d0 = data[i - 1];
                    let d1 = data[i];
                    let d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text(d[a.id] + ' ºF');
                }
            }

        }, (error) => {
            throw error;
        });

        function type(d, _, columns) {
            d.date = parseTime(d.date);
            for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            return d;
        }
    }
}

LineChart.propTypes = {
    data: PropTypes.string.isRequired
};

export default LineChart;