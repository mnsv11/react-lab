import React, { Component } from "react";
import "./detail-page.scss";
import chevron from "../../assets/images/chevron.png";

class DetailPage extends Component {

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
                        <input type="text" placeholder='First name' name='name' value={this.props.state.name} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='Last name' name='surname' value={this.props.state.surname} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='Age' name='age' value={this.props.state.age} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='Gender' name='gender' value={this.props.state.gender} onChange={this.props.updateUser}/>
                    </div>
                    <div className='details-content-row2'>
                        <input type="text" placeholder='Street' name='street' value={this.props.state.street} onChange={this.updateUser}/>
                        <input type="text" placeholder='Street number' name='streetNumber' value={this.props.state.streetNumber} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='Zip' name='zip' value={this.props.state.zip} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='City' name='city' value={this.props.state.city} onChange={this.props.updateUser}/>
                    </div>
                    <div className='details-content-row3'>
                        <input type="text" placeholder='Country' name='country' value={this.props.state.country} onChange={this.props.updateUser}/>
                        <input type="text" placeholder='Phone' name='phone' value={this.props.state.phone} onChange={this.props.updateUser}/>
                        <button className="details-content-row3-button" type='button' onClick={this.props.save}>Save</button>
                    </div>

                </div>
            </div>
        );
    }

    view() {
        this.refs.details.style.left = 0;
    }

    close() {
        this.refs.details.style.left = "100%";
    }
}

export default DetailPage;