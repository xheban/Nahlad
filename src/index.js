import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import App from './App'
import { HashRouter as Router } from 'react-router-dom';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.trim';
import 'core-js/modules/es.object.values';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);