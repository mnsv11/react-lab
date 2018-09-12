import React, { Component } from "react";
import "./main-page.scss";
import DetailPage from "../detail-page/detail-page";
import Table from "../table/table";
import UsersActions from "../../flux/actions/usersActions"
import UsersStore from "../../flux/stores/usersStore"

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: null,
                name: "",
                surname: "",
                age: 0,
                gender: "",
                street: "",
                streetNumber: "",
                city: "",
                zip: "",
                phone: "",
                country: ""
            },
            pos: null,
            users: UsersStore.getAllUsers()
        };

        this.save = this.save.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.tableClick = this.tableClick.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.detail = React.createRef();
    }

    render() {
        return (
            <div className="mainPage">
                <header className="mainPage-header">
                    <h1 className="mainPage-header-title">Users</h1>
                </header>
                <div>
                    <Table users={this.state.users} tableClick={this.tableClick}/>
                    <button className="mainPage-button" type='button' onClick={this.addNewUser}>Add new user</button>
                </div>
                <DetailPage state={this.state.user} updateUser={this.updateUser} save={this.save} ref={this.detail}/>
            </div>
        );
    }

    addNewUser() {
        this.setState({
            user: {
                id: null,
                name: "",
                surname: "",
                gender: "",
                age: 0,
                street: "",
                streetNumber: "",
                city: "",
                zip: "",
                country: "",
                phone: "",
            },
            pos: null
        });
        this.detail.current.view();
    }

    tableClick(item, i) {
        this.setState({
            user: {
                id: item.id,
                name: item.name,
                surname: item.surname,
                gender: item.gender,
                age: item.age,
                street: item.street,
                streetNumber: item.streetNumber,
                city: item.city,
                zip: item.zip,
                country: item.country,
                phone: item.phone,
            },
            pos: i
        });
        this.detail.current.view();
    }


    updateUser(event) {
        this.state.user[event.target.name] = event.target.value;
        this.setState({
            user: this.state.user
        });
    }

    save() {

        if (this.state.user.id === null) {
           this.state.user.id = this.state.users.length;
            UsersActions.saveUser(this.state.user);
        } else {
            UsersActions.updateUser(this.state.user);
        }

        this.setState({
            users: UsersStore.getAllUsers()
        });
        this.detail.current.close();
    }
}

export default MainPage;