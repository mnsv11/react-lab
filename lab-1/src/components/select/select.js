import React, { Component } from "react";
import "./select.scss";

class Select extends Component {

    render() {

        let className = '';
        if(this.props.error) {
            className = 'select-error'
        }

        return (
            <div className='select'>
                <select className={className} name={this.props.name} value={this.props.value} onChange={this.props.onChange}>
                    <option value=""> </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <div className='select-error'>{this.props.error}</div>
            </div>
        );
    }
}

export default Select;