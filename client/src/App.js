import React, {Component} from 'react';
import logo from './logo.svg';
import Home from './components/people/home'
import People from './components/people/people';
import AddPeople from './components/people/addpeople';
import Person from './components/people/person';
import {BrowserRouter, Router, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route path="/home" component={Home}/>
          <Route path="/people" component={People}/>
          <Route path="/add" component={AddPeople}/>
          <Route path="/people/:phoneNumber" component={Person}/>
      </BrowserRouter>
    );
  }
}

export default App;
