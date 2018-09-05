import React, { Component } from "react";
import "./detail-page.scss";
import chevron from "../../assets/images/chevron.png";

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    render() {
        return (
            <div className="details" ref="details">
                <div className="details-header">
                    <div className="details-header-close" onClick={() => {this.close();}}>
                        Close
                        <img src={chevron} alt="" />
                    </div>
                    <h1>User details</h1>
                </div>
                <div className='details-content'>
                    <div className='details-content-row1'>
                        <input type="text" name='name' value={this.props.state.name} onChange={this.save}/>
                        <input type="text" name='surname' value={this.props.state.surname} onChange={this.save}/>
                        <input type="text" name='age' value={this.props.state.age} onChange={this.save}/>
                        <input type="text" name='gender' value={this.props.state.gender} onChange={this.save}/>
                    </div>
                    <div className='details-content-row2'>
                        <input type="text" name='street' value={this.props.state.street} onChange={this.save}/>
                        <input type="text" name='streetNumber' value={this.props.state.streetNumber} onChange={this.save}/>
                        <input type="text" name='zip' value={this.props.state.zip} onChange={this.save}/>
                        <input type="text" name='city' value={this.props.state.city} onChange={this.save}/>
                    </div>
                    <div className='details-content-row3'>
                        <input type="text" name='country' value={this.props.state.country} onChange={this.save}/>
                        <input type="text" name='phone' value={this.props.state.phone} onChange={this.save}/>
                    </div>
                </div>
            </div>
        );
    }

    save(event) {
        this.props.save(event)
    }

    view() {
        this.refs.details.style.left = 0;
    }

    close() {

        this.refs.details.style.left = "100%";
    }
}

export default DetailPage;