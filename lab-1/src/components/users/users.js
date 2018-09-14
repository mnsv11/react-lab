import React, { Component } from "react";
import "./users.scss";
import DetailPage from "../detail-page/detail-page";
import Table from "../table/table";
import UsersActions from "../../flux/actions/usersActions"
import UsersStore from "../../flux/stores/usersStore"

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: Users.createUserObject(),
            pos: null,
            users: UsersStore.getAllUsers(),
            header: [
                {value: 'Name', type: 'string'},
                {value: 'Surname', type: 'string'},
                {value: 'Age', type: 'number'},
                {value: 'Phone', type: 'number'},
                {value: 'Gender', type: 'string'}
            ],
            errors: {}
        };

        this._onChange = this._onChange.bind(this);
        this.save = this.save.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.tableClick = this.tableClick.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.detail = React.createRef();
    }

    componentWillMount() {
        UsersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UsersStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            users: UsersStore.getAllUsers()
        });
    }

    static createUserObject(data) {
        return {
            id: data ? data.id : null,
            name: data ? data.name : "",
            surname: data ? data.surname : "",
            gender: data ? data.gender : "",
            age: data ? data.age : 0,
            street: data ? data.street : "",
            streetNumber: data ? data.streetNumber : "",
            city: data ? data.city : "",
            zip: data ? data.zip : "",
            country: data ? data.country : "",
            phone: data ? data.phone : "",
        }
    }

    render() {
        return (
            <div className="users">
                <header className="users-header">
                    <h1 className="users-header-title">Users</h1>
                </header>
                <div>
                    <Table users={this.state.users} header={this.state.header} tableClick={this.tableClick}/>
                    <button className="users-button" type='button' onClick={this.addNewUser}>Add new user</button>
                </div>
                <DetailPage state={this.state.user} updateUser={this.updateUser} save={this.save} deleteUser={this.deleteUser} errors={this.state.errors} ref={this.detail}/>
            </div>
        );
    }

    addNewUser() {
        this.setState({
            user: Users.createUserObject(),
            pos: null,
            errors: {}
        });
        this.detail.current.view();
    }

    tableClick(item, i) {
        this.setState({
            user: Users.createUserObject(item),
            pos: i,
            errors: {}
        });
        this.detail.current.view();
    }


    updateUser(event) {
        this.state.user[event.target.name] = event.target.value;
        this.setState({
            user: this.state.user
        });
    }

    inputsIsValid() {
        let inputIsValid = true;
        let messages = {};
        this.setState({
            errors: {}
        });

        if (this.state.user.name.length < 3) {
            messages.name = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (this.state.user.surname.length < 3) {
            messages.surname = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (!Number(this.state.user.age) > 0) {
            messages.age = "Age must be larger then 0";
            inputIsValid = false;
        }

        if (this.state.user.gender.length < 3) {
            messages.gender = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (this.state.user.street.length < 3) {
            messages.street = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (!Number(this.state.user.streetNumber) > 0) {
            messages.streetNumber = "Street number must be larger then 0";
            inputIsValid = false;
        }

        if (this.state.user.zip.length < 3) {
            messages.zip = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (this.state.user.city.length < 3) {
            messages.city = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (this.state.user.country.length < 3) {
            messages.country = "Require at least 3 characters";
            inputIsValid = false;
        }

        if (this.state.user.phone.length < 3) {
            messages.phone = "Require at least 3 characters";
            inputIsValid = false;
        }

        this.setState({
            errors: messages
        });

        return inputIsValid;
    }

    save() {
        if (!this.inputsIsValid()) {
            return;
        }

        if (this.state.user.id === null) {
            this.state.user.id = this.state.users.length;
            UsersActions.saveUser(this.state.user);
        } else {
            UsersActions.updateUser(this.state.user);
        }

        this.detail.current.close();
    }

    deleteUser() {
        UsersActions.deleteUser(this.state.user.id);
        this.detail.current.close();
    }
}

export default Users;