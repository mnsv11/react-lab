import React, { Component } from "react";
import "./table.scss";
import PropTypes from 'prop-types';

let rowToSort = '';
let desc = false;

/**
 * this.props.values {Array} [
 *                              {name: 'Kalle', age: '22'},
 *                              {name: 'Maria', age: '32'}
 *                           ]
 *
 * this.props.header {Array} [
 *                              {value: 'Name', type:'string'},
 *                              {value: 'Age', type: 'number'}
 *                           ]
 */
class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: this.props.values,
            header: this.props.header
        };
        Table.sortNumber = Table.sortNumber.bind(this);
        Table.sortString = Table.sortString.bind(this);
    }

    render() {
        return (<table className="table">
            <tbody>
            <tr onClick={(element) => {this.headerClick(element.target);}}>
                {
                    this.state.header.map((name, i) => {
                        return Table.createHeader(name, i);
                    })
                }
            </tr>
                {
                    this.state.values.map((value, i) => {
                        return this.createRow(value, i);
                    })
                }
            </tbody>
        </table>)
    }

    static createHeader(name, i) {
        return (<th key={i} direction="desc" type={name.type}>{name.value}</th>)
    }

    createRow(value, i) {

        return (
            <tr key={i} onClick={() => {this.rowClick(value ,i);}}>
                {
                    this.state.header.map((name, i) => {
                        return Table.createCell(value, name.value.toLowerCase(), i);
                    })
                }
            </tr>
        )
    }

    static createCell(value, item, i) {
        return(<td key={i}>{value[item]}</td>)
    }

    rowClick(item, i) {
        this.props.tableClick(item, i)
    }

    headerClick(item) {
        if (item.getAttribute('direction') === 'desc') {
            item.setAttribute('direction', 'asc');
            desc = true;
        } else {
            item.setAttribute('direction', 'desc');
            desc = false;

        }

        rowToSort = item.innerHTML.toLowerCase();
        if(item.getAttribute('type') === 'number') {
            this.state.values.sort(Table.sortNumber);
        } else {
            this.state.values.sort(Table.sortString);
        }

        this.setState({
            value: this.state.values
        });
    }

    static sortNumber(a, b) {

        if(desc) {
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

    static sortString(a, b) {
        if(desc) {
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
    values: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
    tableClick: PropTypes.func.isRequired
};

export default Table;