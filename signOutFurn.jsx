import React, { Component } from "react";
import auth from "../services/authServiceFurn";
class SignOut extends Component {
  state = {};
  componentDidMount() {
    let response = auth.logout();
    if (response === "success") {
      this.props.history.push("/");
      window.location.reload();
    }
  }
  render() {
    return <div className="container"></div>;
  }
}

export default SignOut;
