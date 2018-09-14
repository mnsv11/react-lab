import React, { Component } from "react";
import "./table.scss";
import PropTypes from 'prop-types';

let rowToSort = '';

class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
            desc: false,
        };
        this.sortNumber = this.sortNumber.bind(this);
        this.sortString = this.sortString.bind(this);
    }

    render() {
        return (<table className="table">
            <tbody>
            <tr onClick={(element) => {this.headerClick(element.target);}}>
                <th direction="desc">Name</th>
                <th direction="desc">Surname</th>
                <th direction="desc">Age</th>
                <th direction="desc">Phone</th>
                <th direction="desc">Gender</th>
            </tr>
            {
                this.state.users.map((user, i) => {
                    return this.createRow(user, i);
                })
            }
            </tbody>
        </table>)
    }

    createRow(user, i) {
        return (
            <tr key={i} onClick={() => {this.rowClick(user ,i);}}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
            </tr>
        )
    }

    rowClick(item, i) {
        this.props.tableClick(item, i)
    }

    headerClick(item) {
        if (item.getAttribute('direction') === 'desc') {
            item.setAttribute('direction', 'asc');
            this.setState({
                desc: true
            })
        } else {
            item.setAttribute('direction', 'desc');
            this.setState({
                desc: false
            })
        }

        rowToSort = item.innerHTML.toLowerCase();
        if(item.innerHTML === 'Age' || item.innerHTML === 'Phone') {
            this.state.users.sort(this.sortNumber);
        } else {
            this.state.users.sort(this.sortString);
        }



        this.setState({
            users: this.state.users
        });

    }


    sortNumber(a, b) {

        if(this.state.desc) {
            if (Number(a[rowToSort]) < Number(b[rowToSort])) {
                return -1;
            }
            return 1;
        } else {
            if (Number(a[rowToSort]) < Number(b[rowToSort])) {
                return 1;
            }
            return -1;
        }
    }

    sortString(a, b) {
        if(this.state.desc) {
            if (a[rowToSort] < b[rowToSort]) {
                return -1;
            }
            return 1;
        } else {
            if (a[rowToSort] < b[rowToSort]) {
                return 1;
            }
            return -1;
        }
    }
}

Table.propTypes = {
    users: PropTypes.array.isRequired,
    tableClick: PropTypes.func.isRequired
};

export default Table;