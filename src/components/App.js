import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Menu from "./Menu";

import ViewItems from "./ViewItems";
import ViewHistory from "./ViewHistory";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem("_id"),
    };
  }

  setUser(user) {
    this.setState({
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem("_id"),
    });
  }

  unsetUser(user) {
    localStorage.clear();

    this.setState({
      name: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      token: localStorage.getItem("token"),
      id: localStorage.getItem("_id"),
    });
  }

  render() {
    let LoginComponent = (props) => (
      <Login {...props} setUser={this.setUser.bind(this)} />
    );

    let LogoutComponent = (props) => (
      <Logout {...props} unsetUser={this.unsetUser.bind(this)} />
    );

    let MenuComponent = (props) => (
      <Menu {...props} setUser={this.setUser.bind(this)} />
    );

    let ViewItemsComponent = (props) => (
      <ViewItems {...props} role={this.state.role} />
    );

    return (
      <Fragment>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path="/" component={MenuComponent} />

            <Route exact path="/login" component={LoginComponent} />

            <Route exact path="/register" component={Register} />

            <Route exact path="/logout" component={LogoutComponent} />

            <Route exact path="/view-items" component={ViewItemsComponent} />

            <Route exact path="/view-history" component={ViewHistory} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
