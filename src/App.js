import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import Navbar from "./components/navbar"
import Header from "./components/header"
import cardList from "./components/card"
import CreateCard from "./components/create"
import AddCity from './components/cities'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar />
        <section className="content">
          <Route exact path="/" component={cardList}/>
          <Route path="/create" component={CreateCard}/>
          <Route path="/cities" component={AddCity}/>
        </section>
      </div>
    );
  }
}

export default App;
