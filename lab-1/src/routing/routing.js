import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './routing.scss';
import Users from '../components/users/users';
import About from "../components/about/about"
import PageNotFound from "../components/pageNotFound/pageNotFound"
import Topics from "../components/topics/topics"

class Routing extends Component {


    render() {
        return (
            <Router>
                <div className="menu">
                    <div className="menu-links">
                        <MenuLink activeOnlyWhenExact={true} to="/" label="Users" />
                        <MenuLink to="/topics" label="Topics" />
                        <MenuLink to="/about" label="About" />
                    </div>
                    <div className="menu-route">
                        <Route exact path="/" component={Users} />
                        <Route path="/topics" component={Topics} />
                        <Route path="/about" component={About} />
                        <Route component={PageNotFound} />
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