import React, { Component } from "react";
import "./detail-page.scss";
import chevron from "../../assets/images/chevron.png";
import InputField from '../input/input';
import SelectBox from '../select/select';

class DetailPage extends Component {

    render() {

        let deleteButton;
        if(this.props.state.id !== null) {
            deleteButton = <button className="details-content-row3-button" type='button' onClick={this.props.deleteUser}>Delete user</button>;
        }
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
                        <InputField placeholder='First name' name='name' value={this.props.state.name} error={this.props.errors.name} onChange={this.props.updateUser}/>
                        <InputField placeholder='Last name' name='last name' value={this.props.state['last name']} error={this.props.errors['last name']} onChange={this.props.updateUser}/>
                        <InputField placeholder='Age' name='age' value={this.props.state.age} error={this.props.errors.age} onChange={this.props.updateUser}/>
                        <SelectBox name='gender' value={this.props.state.gender} onChange={this.props.updateUser} error={this.props.errors.gender} />
                    </div>
                    <div className='details-content-row2'>
                        <InputField placeholder='Street' name='street' value={this.props.state.street} error={this.props.errors.street} onChange={this.props.updateUser}/>
                        <InputField placeholder='Street number' name='streetNumber' value={this.props.state.streetNumber} error={this.props.errors.streetNumber} onChange={this.props.updateUser}/>
                        <InputField placeholder='Zip' name='zip' value={this.props.state.zip} error={this.props.errors.zip} onChange={this.props.updateUser}/>
                        <InputField placeholder='City' name='city' value={this.props.state.city} error={this.props.errors.city} onChange={this.props.updateUser}/>
                    </div>
                    <div className='details-content-row3'>
                        <InputField placeholder='Country' name='country' value={this.props.state.country} error={this.props.errors.country} onChange={this.props.updateUser}/>
                        <InputField placeholder='Phone' name='phone' value={this.props.state.phone} error={this.props.errors.phone} onChange={this.props.updateUser}/>
                        <button className="details-content-row3-button" type='button' onClick={this.props.save}>Save</button>
                        {deleteButton}
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