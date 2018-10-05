import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './routing.scss';
import Users from '../components/users/users';
import About from "../components/about/about";
import ChartPage from "../components/chartPage/chartPage";
import ExpandPage from "../components/expandPage/expandPage";
import menu from "../assets/images/menu.png";

class Routing extends Component {

    constructor(props) {
        super(props);
        this.displayMenu = this.displayMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
    }

    render() {
        return (
            <Router>
                <div className="menu">
                    <div className="menu-links">
                        <div className='hamburger'>
                            <img src={menu} alt='' onMouseEnter={this.displayMenu}/>
                            {
                                this.dropDownMenu()
                            }
                        </div>
                        <MenuLink activeOnlyWhenExact={true} to="/" label="Users" />
                        <MenuLink to="/charts" label="Charts" />
                        <MenuLink to="/expandPage" label="ExpandPage" />
                        <MenuLink to="/about" label="About" />
                    </div>
                    <div className="menu-route">
                        <Route exact path="/" component={Users} />
                        <Route path="/charts" component={ChartPage} />
                        <Route path="/expandPage" component={ExpandPage} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
        )
    }


    displayMenu() {
        this.refs.dropDownMenu.style.display = 'block';
    }

    hideMenu() {
        this.refs.dropDownMenu.style.display = 'none';
    }

    dropDownMenu() {
        return (
            <div className='dropDownMenu' ref='dropDownMenu' onMouseLeave={this.hideMenu}>
                <MenuLink activeOnlyWhenExact={true} to="/" label="Users" />
                <MenuLink to="/charts" label="Charts" />
                <MenuLink to="/expandPage" label="ExpandPage" />
                <MenuLink to="/about" label="About" />
            </div>
        )
    }

}

/*
function DropDownMenu() {
    return (
        <div className='dropDownMenu'>
            <MenuLink activeOnlyWhenExact={true} to="/" label="Users" />
            <MenuLink to="/charts" label="Charts" />
            <MenuLink to="/expandPage" label="ExpandPage" />
            <MenuLink to="/about" label="About" />
        </div>
    )
}
*/

export default Routing;


const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
            <div className={match ? "menu-link menu-active" : "menu-link"}>
                <Link to={to}>{label}</Link>
            </div>
        )}
    />
);