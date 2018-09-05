import React, { Component } from "react";
import "./table.scss";

class Table extends Component {

    render() {
        return (<table className="table">
            <tbody>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Gender</th>
            </tr>
            {
                this.props.data.users.map((user, i) => {
                    return this.createUser(user, i);
                })
            }
            </tbody>
        </table>)
    }

    createUser(user, i) {
        return (
            <tr key={i} onClick={() => {this.tableClick(user ,i);}}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
            </tr>
        )
    }

    tableClick(item, i) {
        this.props.tableClick(item, i)
    }


}

export default Table;