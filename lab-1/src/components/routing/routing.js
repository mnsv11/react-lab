import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './routing.scss';
import MainPage from '../main-page/main-page';

class Routing extends Component {
    render() {
        return (
            <Router>
                <div className="menu">
                    <div className="menu-links">
                        <MenuLink activeOnlyWhenExact={true} to="/" label="Home" />
                        <MenuLink to="/about" label="About" />
                        <MenuLink to="/topics" label="Topics" />
                    </div>

                    <Route exact path="/" component={MainPage} />
                    <Route path="/about" component={MainPage} />
                    <Route path="/topics" component={MainPage} />
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