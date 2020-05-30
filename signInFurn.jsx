import React, { Component } from "react";
import auth from "../services/authServiceFurn";
class SignIn extends Component {
  state = {
    user: { email: "", password: "" },
  };
  handleChange = (e) => {
    let { currentTarget: input } = e;
    console.log(input.name, input.value);
    let { user } = this.state;
    user[input.name] = input.value;
    this.setState({ user });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { user } = this.state;
    let response = auth.login(user.email, user.password);
    if (response === "success") {
      this.props.history.push("/");
      window.location.reload();
    } else {
      alert("Invalid Email or Password");
    }
  };
  render() {
    let { user } = this.state;
    return (
      <div className="container mt-2">
        <div className="row d-flex justify-content-center">
          <h2>Login</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              value={user.email}
              name="email"
              id="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={user.password}
              name="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;
