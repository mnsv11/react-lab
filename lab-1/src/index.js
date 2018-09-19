import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routing from "./routing/routing";
import InitializeData from "./flux/actions/initializeData";
import configureStore from './redux/store/configureStore';
import {Provider} from 'react-redux';

const store = configureStore();

InitializeData.initData();

ReactDOM.render(
    <Provider store={store}>
        <Routing />
    </Provider>,
    document.getElementById('root')
);

