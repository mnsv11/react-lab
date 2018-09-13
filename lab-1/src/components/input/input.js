import React, { Component } from "react";
import "./input.scss";

class Input extends Component {

    render() {

        let className = '';
        console.log(this.props.error)
        if(this.props.error) {
            className = 'input-error'
        }

        return (
                <div className='input'>
                    <input
                        className={className}
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