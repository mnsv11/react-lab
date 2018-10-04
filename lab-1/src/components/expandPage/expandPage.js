import React, { Component } from "react";
import "./expandPage.scss";
import Header from "../header/header";
import ExpandItem from '../expandItem/expandItem';
import expandItems from '../../assets/expandItems';

class ExpandPage extends Component {
    render() {
        return (
            <div className="expandPage">
                <Header title="Expand page"/>
                <div className='expandPage-content'>
                    <ExpandItem items={expandItems}/>
                </div>
            </div>
        );
    }
}

export default ExpandPage;