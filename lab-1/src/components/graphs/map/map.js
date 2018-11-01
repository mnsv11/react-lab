import React, { Component } from "react";
import "./map.scss";
import * as d3 from 'd3';
import geoJson from '../../../assets/Westminster_Parliamentary_Constituencies_December_2016_Ultra_Generalised_Clipped_Boundaries_in_Great_Britain.json'
import results from '../../../assets/HoC-GE2017-constituency-results.csv'

class Map extends Component {

    componentDidUpdate() {
        this.createMap({});

    }

    componentDidMount() {
        this.createMap({});
    }

    render() {
        return (
            <div id='map'/>
        );
    }

    createMap() {

        d3.csv(results).then((csv) => {
            let geojson = this.getGeoJSONWithResults(csv, geoJson);
            this.update(geojson);
        }, (error) => {
            throw error;
        });
    }

    getGeoJSONWithResults(csv, geojson) {
        let partyColours = {con: '#6da8e1', lab: '#e25050', ld: '#f0a330', ukip: '#ca6dbf', green: '#65a68c', snp: '#f2d92d', dup: '#827996', sf: '#99bf70', pc: '#99d2d0', alliance: '#ffc660', independent: '#CEC6B9', other: '#CEC6B9', sdlp: '#bed676', uup: '#6da8e1', novote: 'white', spk: '#6da8e1'};

        let featureLookup = {};
        geojson.features.forEach((feature) => {
            featureLookup[feature.properties['pcon16cd']] = feature;
        });

        let newGeojson = {type: 'FeatureCollection', features: []};

        csv.forEach((c) => {
            let feature = featureLookup[c.ons_id];
            if(feature) {
                newGeojson.features.push({
                    type: 'Feature',
                    geometry: feature.geometry,
                    properties: { fill: partyColours[c.first_party.toLowerCase()] }
                });
            }
        });

        return newGeojson;
    }

    update(geojson) {
        let width = 600, height = 900;
        let longitude = -1.9;
        let latitude = 55.5;

        let projection = d3.geoAzimuthalEqualArea()
            .center([longitude, latitude])
            .fitSize([width, height], geojson);

        let geoGenerator = d3.geoPath()
            .projection(projection);

        let svg = d3.select("#map")
            .append( "svg")
            .attr("width", 700)
            .attr("height", 1000);

        let g = svg.append("g");

        g.selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geoGenerator)
            .style('fill', (d) => {
                return d.properties.fill;
            });
    }
}

export default Map;