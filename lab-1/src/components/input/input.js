import React, { Component } from "react";
import "./input.scss";

class Input extends Component {

    render() {
        return (
                <div className='input'>
                    <input
                        className='input-field'
                        type="text"
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                    <div className='input-error'>{this.props.error}</div>
                </div>
        );
    }
}

export default Input;