import React, { Component } from "react";
import Link from "react-router-dom/es/Link";
import {Route} from "react-router-dom";


class PageNotFound extends Component {
    render() {
        return(
            <div><p>404 Page not found</p>
                <Link to={'/'}>home</Link>
            </div>
        )
    }
}

export default PageNotFound;