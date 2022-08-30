import React, { Fragment, Component } from "react";
import { Redirect, Link } from "react-router-dom";
import api from "../api-proxy";
import ViewItems from "./ViewItems";

const Menu = (props) => {
  document.title = "Menu";

  let user = null;

  if (localStorage.getItem("role") == null) {
    return <Redirect to="/login" />;
  } else {
    user = (
      <Fragment>
        <ViewItems role={localStorage.getItem("role")} />
      </Fragment>
    );
  }

  return <div className="container-fluid mt-3">{user}</div>;
};

export default Menu;
