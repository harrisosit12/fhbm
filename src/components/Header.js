import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  let navRight =
    localStorage.getItem("token") == null ? (
      <Fragment>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </Fragment>
    ) : (
      <Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/view-items">
              View Rooms
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/view-history">
              View History
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              {localStorage.getItem("name")}
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </Fragment>
    );

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
      <Link className="navbar-brand" to="/">
        {" "}
        Function Hall Booking Manager
      </Link>

      <div className="collapse navbar-collapse" id="navbar">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {navRight}
      </div>
    </nav>
  );
};

export default Header;
