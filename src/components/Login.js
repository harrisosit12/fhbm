import React, { Component } from "react";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import api from "../api-proxy";

document.title = "Login";

const Login = (props) => {
  if (localStorage.getItem("token") != null) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3>
                <i className="fas fa-lock"></i> Login
              </h3>
            </div>

            <div className="card-body">
              <LoginForm
                urlParam={props.location.search}
                setUser={props.setUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      gotoMenu: false,
    };
  }

  emailChangeHandler(e) {
    this.setState({ email: e.target.value });
  }

  passwordChangeHandler(e) {
    this.setState({ password: e.target.value });
  }

  formSubmitHandler(e) {
    e.preventDefault();

    let payload = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };

    fetch(api.url + "/user/login", payload)
      .then((response) => response.json())
      .then((response) => {
        if (response.result == "authenticated") {
          localStorage.setItem("role", response.role);
          localStorage.setItem("name", response.name);
          localStorage.setItem("token", response.token);
          // localStorage.setItem('stripeCustomerId', response.stripeCustomerId)
          // localStorage.setItem('_id', response._id)
          // localStorage.setItem('email', response.email)
          this.props.setUser();
          this.setState({ gotoMenu: true });
        } else {
          this.setState({
            errorMessage: (
              <div className="alert alert-danger">{response.error}</div>
            ),
          });
        }
      });
  }

  render() {
    if (this.state.gotoMenu) {
      return <Redirect to="/" />;
    }

    let url = this.props.urlParam;
    let params = queryString.parse(url);
    let registerSuccessMessage = null;
    let message = null;

    if (params.register_success) {
      registerSuccessMessage = (
        <div className="alert alert-success">
          Registration successful, you may now login
        </div>
      );
    } else if (params.auth_failed) {
      registerSuccessMessage = (
        <div className="alert alert-danger">
          Authentication Failed, re-login
        </div>
      );
    }

    if (this.state.errorMessage == "" && registerSuccessMessage != null) {
      message = registerSuccessMessage;
    } else {
      message = this.state.errorMessage;
    }

    return (
      <form onSubmit={this.formSubmitHandler.bind(this)}>
        {message}

        <div className="form-group">
          <label htmlFor="txt-username">Email</label>
          <input
            value={this.state.email}
            onChange={this.emailChangeHandler.bind(this)}
            type="email"
            className="form-control form-control-lg"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="txt-password">Password</label>
          <input
            value={this.state.password}
            onChange={this.passwordChangeHandler.bind(this)}
            type="password"
            className="form-control form-control-lg"
            name="password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success btn-block mt-4">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
