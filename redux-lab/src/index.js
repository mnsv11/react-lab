import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './reduxComponents/store/configureStore';
import {Provider} from 'react-redux';
import './index.scss';
import Main from './components/main/Main';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root'));

