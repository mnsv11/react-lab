import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from "./routing/routing";
import InitializeData from "./flux/actions/initializeData";

InitializeData.initData();

ReactDOM.render(<Routing />, document.getElementById('root'));

