import React, { Component } from "react";
import './pageNotFound.scss';
import Link from "react-router-dom/es/Link";

class PageNotFound extends Component {
    render() {
        return(
            <div className="pageNotFound">
                <h1>404 Page not found</h1>
                <Link to={'/'}>home</Link>
            </div>
        )
    }
}


export default PageNotFound;