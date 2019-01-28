import React, { Component } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Movie from './components/Movie';
import Category from './components/Category';
import MovCat from './components/MovCat';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header navBrand={"MOVIES"} />
        <div>
          <Route exact path ="/" component={Home}/>
          <Route path="/movielist" component={Movie}/>
          <Route path="/categorylist" component={Category}/>
          <Route path="/movcatlist" component={MovCat}/>
        </div>
      </div>
    );
  }
}

export default App;