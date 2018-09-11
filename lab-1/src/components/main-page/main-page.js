import React, { Component } from "react";
import "./main-page.scss";
import data from "../../assets/data";
import DetailPage from "../detail-page/detail-page";
import Table from "../table/table";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            age: 0,
            gender: "",
            street: "",
            streetNumber: "",
            city: "",
            zip: "",
            phone: "",
            country: "",
            pos: 0
        };

        this.save = this.save.bind(this);
        this.tableClick = this.tableClick.bind(this);
        this.detail = React.createRef();
    }

    render() {
        return (
            <div className="mainPage">
                <header className="mainPage-header">
                    <h1 className="mainPage-title">Users</h1>
                </header>
                <Table users={data.users} tableClick={this.tableClick}/>
                <DetailPage state={this.state} save={this.save} ref={this.detail}/>
            </div>
        );
    }

    tableClick(item, i) {
        this.setState({name: item.name});
        this.setState({surname: item.surname});
        this.setState({gender: item.gender});
        this.setState({age: item.age});
        this.setState({street: item.street});
        this.setState({streetNumber: item.streetNumber});
        this.setState({city: item.city});
        this.setState({zip: item.zip});
        this.setState({country: item.country});
        this.setState({phone: item.phone});
        this.setState({pos: i});

        this.detail.current.view();
    }

    save(event) {
        this.setState({[event.target.name]: event.target.value});
        data.users[this.state.pos][event.target.name] = event.target.value;
    }
}

export default MainPage;