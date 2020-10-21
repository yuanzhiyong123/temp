
import React, { Component } from "react";
import "./nav.scss";
export default class Nav extends Component {

  render() {
    return (
      <div className="menu columns">
        <div className="columns column nav is-8">
          <div className="nav-item"><a href="/">Home</a></div>
          <div className="nav-item"><a href="/todo.html">Todo</a></div>
        </div>
        <div className="column is-2"></div>
      </div>
    );
  }
}
