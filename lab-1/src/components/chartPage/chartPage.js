import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./chartPage.scss";
import "../header/header"
import Header from "../header/header";
import PieChart from "../graphs/pieChart/pieChart";
import LineChart from '../graphs/lineChart/lineChart';
import BarChart from '../graphs/barChart/barChart';
import Map from '../graphs/map/map';
import UsersStore from "../../flux/stores/usersStore";
import graphData from '../../assets/graphData.tsv';
import barData from '../../assets/barData.tsv';

class ChartPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: UsersStore.getAllUsers(),
            totalUsers: 0,
            graphData: graphData,
            barData: barData,
            data: [
                {age: '0-9', users: 0},
                {age: '10-19', users: 0},
                {age: '20-29', users: 0},
                {age: '30-39', users: 0},
                {age: '40-49', users: 0},
                {age: '50-59', users: 0},
                {age: '60-69', users: 0},
                {age: '70-79', users: 0},
                {age: '80-89', users: 0},
                {age: '90-99', users: 0},
                {age: '100<', users: 0}
            ]
        };
    }

    componentDidMount() {
        this.createGraphData();
    }

    render() {
        return (
            <div className="chartPage">
                <Header title="Charts"/>
                <div className='chartPage-content'>
                    <Tabs>
                        <TabList>
                            <Tab>Pie chart</Tab>
                            <Tab>Line chart</Tab>
                            <Tab>Bar chart</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        <TabPanel>
                            <PieChart data={this.state.data} total={this.state.totalUsers}/>
                        </TabPanel>
                        <TabPanel>
                            <LineChart data={this.state.graphData}/>
                        </TabPanel>
                        <TabPanel>
                            <BarChart data={this.state.barData}/>
                        </TabPanel>
                        <TabPanel>
                            <Map />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }

    createGraphData() {
        const state = this.state.data;
        let totUsers = 0;
        this.state.users.forEach(user => {
            if (Number(user.age) < 10) {
                state[0].users++;
                totUsers++;
            } else if (Number(user.age) < 20) {
                state[1].users++;
                totUsers++;
            } else if (Number(user.age) < 30) {
                state[2].users++;
                totUsers++;
            } else if (Number(user.age) < 40) {
                state[3].users++;
                totUsers++;
            } else if (Number(user.age) < 50) {
                state[4].users++;
                totUsers++;
            } else if (Number(user.age) < 60) {
                state[5].users++;
                totUsers++;
            } else if (Number(user.age) < 70) {
                state[6].users++;
                totUsers++;
            } else if (Number(user.age) < 80) {
                state[7].users++;
                totUsers++;
            } else if (Number(user.age) < 90) {
                state[8].users++;
                totUsers++;
            } else if (Number(user.age) < 100) {
                state[9].users++;
                totUsers++;
            } else if (Number(user.age) > 99) {
                state[10].users++;
                totUsers++;
            }
        });

        this.setState({
            data: state,
            totalUsers: totUsers
        });
    }
}

export default ChartPage;