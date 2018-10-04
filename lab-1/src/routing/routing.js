import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './routing.scss';
import Users from '../components/users/users';
import About from "../components/about/about";
import ChartPage from "../components/chartPage/chartPage";
import ExpandPage from "../components/expandPage/expandPage";

class Routing extends Component {


    render() {
        return (
            <Router>
                <div className="menu">
                    <div className="menu-links">
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
}

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