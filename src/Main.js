import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Starred from "./Starred";
import Deals from "./Deals";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Top Chef</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/starred">Starred Restaurants</NavLink></li>
            <li><NavLink to="/deals">Deals</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/starred" component={Starred}/>
            <Route path="/deals" component={Deals}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;