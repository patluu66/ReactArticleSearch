import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './Search';
import Saved from './Saved';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Main = () => (
  <Router>
    <div>
      <div className="jumbotron">
        <h1 className="display-3 text-center"><Link to="/">New York Times Article Scrubber</Link></h1>
        <p className="lead text-center">Search for and annotate articles of interest</p>
        <hr className="my-4" />
      </div>
      <div className="container">
        <Route exact path="/" component={Search}/>
        <Route exact path="/saved" component={Saved}/>
        <Route path="empty" component={null} key="empty"/>
      </div>
    </div>
  </Router>
)

export default Main;
