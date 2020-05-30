import React, { Component } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ user }) => {
  console.log(user);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Furniture
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            {user.role === "customer" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            ) : user.role === "admin" ? (
              <li className="nav-item">
                <Link className="nav-link" to="/new">
                  Add a New Product
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {user.username ? (
                <Link className="nav-link" to="/sign-out">
                  Sign Out
                </Link>
              ) : (
                <Link className="nav-link" to="/sign-in">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
