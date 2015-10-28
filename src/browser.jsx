import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './style.css';

window.React = React;
ReactDOM.render(<App config={process.env.VISUALIZER_CONFIG}/>, document.getElementById('App'));
