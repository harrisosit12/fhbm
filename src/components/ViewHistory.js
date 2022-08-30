import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Accordion, Card, Button } from "react-bootstrap";
import api from "../api-proxy";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// with es5
var ReactBsTable = require("react-bootstrap-table");

var moment = require("moment");

const ViewHistory = (props) => (
  <div className="container-fluid mt-3">
    <div className="row">
      <div className="col-12 mx-auto">
        <div className="card">
          <div className="card-header">View Items</div>

          <div className="card-body">
            <ViewHistoryForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

class ViewHistoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  componentWillMount() {
    let payload = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        _id: localStorage.getItem("_id"),
        name: localStorage.getItem("name"),
        role: localStorage.getItem("role"),
      }),
    };

    fetch(api.url + "/find-history", payload)
      .then((response) => response.json())
      .then((history) => {
        this.setState({
          history: history,
        });
      });
  }

  render() {
    let cnt = 1;

    let admin = (
      <Fragment>
        {this.state.history.map((history) => {
          return (
            <tr>
              <th scope="row" key={history._id}>
                {cnt++}
              </th>
              <td>{history.name}</td>
              <td>{history.roomNo}</td>
              <td>{moment(history.date).format("LLL")}</td>
              <td>{history.timeIn}</td>
              <td>{history.timeOut}</td>
              <td>&#8369;{history.price}</td>
              <td>{moment(history.dateRequested).format("LLL")}</td>
              <td>{moment(history.dateApproved).format("LLL")}</td>
              <td>{moment(history.createdAt).format("LLL")}</td>
            </tr>
          );
        })}
      </Fragment>
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">RoomNo</th>
            <th scope="col">Date</th>
            <th scope="col">Time In</th>
            <th scope="col">Time Out</th>
            <th scope="col">Price</th>
            <th scope="col">Date Requested</th>
            <th scope="col">Date Approved</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>

        <tbody>{admin}</tbody>
      </table>
    );
  }
}

export default ViewHistory;
