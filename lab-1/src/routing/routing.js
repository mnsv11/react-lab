import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './routing.scss';
import MainPage from '../components/main-page/main-page';
import About from "../components/about/about"

class Routing extends Component {
    render() {
        return (
            <Router>
                <div className="menu">
                    <div className="menu-links">
                        <MenuLink activeOnlyWhenExact={true} to="/" label="Home" />
                        <MenuLink to="/topics" label="Topics" />
                        <MenuLink to="/about" label="About" />
                    </div>

                    <Route exact path="/" component={MainPage} />
                    <Route path="/topics" component={MainPage} />
                    <Route path="/about" component={About} />
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