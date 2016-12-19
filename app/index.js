"use strict";
// some initial stuff, like css and mobile detection
require('app/init');

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Home from 'app/components/home';
import storeCreator from 'app/store';

const store = storeCreator();

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>
    , document.getElementById('react-container'));
