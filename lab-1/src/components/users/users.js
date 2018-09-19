import React, { Component } from "react";
import "./users.scss";
import DetailPage from "../detail-page/detail-page";
import Table from "../table/table";
import UsersActions from "../../flux/actions/usersActions"
import UsersStore from "../../flux/stores/usersStore"
import Header from "../header/header";

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
                <Header title="Users"/>
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
        const state = this.state.user;
        state[event.target.name] = event.target.value;
        this.setState({
            user: state
        });
    }

    validateInput(errorMessage, objectTypeName, valueToCompare, mainValue, messages ) {
        if (mainValue < valueToCompare) {
            messages[objectTypeName] = errorMessage;
        }
    }

    inputsIsValid() {

        let messages = {};
        this.setState({
            errors: {}
        });

        this.validateInput("Require at least 3 characters", 'name', 3, this.state.user.name.length, messages);
        this.validateInput("Require at least 3 characters", 'surname', 3, this.state.user.surname.length, messages);
        this.validateInput("Age must be larger then 0", 'age', !Number(this.state.user.age), 0, messages);
        this.validateInput("Require at least 3 characters", 'gender', 3, this.state.user.gender.length, messages);
        this.validateInput("Require at least 3 characters", 'street', 3, this.state.user.street.length, messages);
        this.validateInput("Street number must be larger then 0", 'streetNumber', !Number(this.state.user.streetNumber), 0, messages);
        this.validateInput("Require at least 3 characters", 'zip', 3, this.state.user.zip.length, messages);
        this.validateInput("Require at least 3 characters", 'city', 3, this.state.user.city.length, messages);
        this.validateInput("Require at least 3 characters", 'country', 3, this.state.user.country.length, messages);
        this.validateInput("Require at least 3 characters", 'phone', 3, this.state.user.phone.length, messages);

        this.setState({
            errors: messages
        });

        return !Object.keys(messages).length > 0;
    }

    save() {
        if (!this.inputsIsValid()) {
            return;
        }

        if (this.state.user.id === null) {
            const state = this.state.user;
            state.id = this.state.users.length;
            UsersActions.saveUser(state);
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