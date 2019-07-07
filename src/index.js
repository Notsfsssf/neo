import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import {BrowserRouter, Route} from "react-router-dom";
import SignInSide from "./SignInSide";
axios.defaults.baseURL="http://localhost:8080"
ReactDOM.render(    <BrowserRouter basename='/'>
    <Route path={`/`} component={App}/>
    <Route path="/signin" component={SignInSide}/>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
