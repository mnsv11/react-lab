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
            header: this.props.header
        };
        this.sortNumber = this.sortNumber.bind(this);
        this.sortString = this.sortString.bind(this);
    }

    render() {
        return (<table className="table">
            <tbody>
            <tr onClick={(element) => {this.headerClick(element.target);}}>
                {
                    this.state.header.map((name, i) => {
                        return this.createHeader(name, i);
                    })
                }
            </tr>
                {
                    this.state.users.map((user, i) => {
                        return this.createRow(user, i);
                    })
                }
            </tbody>
        </table>)
    }

    createHeader(name, i) {
        return (<th key={i} direction="desc" type={name.type}>{name.value}</th>)
    }

    createRow(user, i) {
        return (
            <tr key={i} onClick={() => {this.rowClick(user ,i);}}>
                {
                    this.state.header.map((name, i) => {
                        return this.createCell(user, name.value.toLowerCase(), i);
                    })
                }
            </tr>
        )
    }

    createCell(user, item, i) {
        return(<td key={i}>{user[item]}</td>)
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
        if(item.getAttribute('type') === 'number') {
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
    header: PropTypes.array.isRequired,
    tableClick: PropTypes.func.isRequired
};

export default Table;