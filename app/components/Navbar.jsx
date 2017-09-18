import React, {Component} from 'react'
import {Link} from 'react-router'
import store from 'APP/app/store'

const Navbar = (props) =>
 (
    <nav className="navbar navbar-default">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <Link to="/" className="navbar-brand">Home</Link>

      <ul className="nav navbar-nav">
        <li><Link to="/login" activeClassName="active-link">{!props.user ? 'Login' : 'Logout' }</Link></li>
        <li><Link to="/products" activeClassName="active-link">Products</Link></li>
        <li><Link to="/cart" activeClassName="active-link"><span className="glyphicon glyphicon-shopping-cart"></span>{props.cartSize}</Link></li>
      </ul>

      </div>
    </nav>
  )

export default Navbar

// If we want a collapsable hamburger:
// <div className="container-fluid">
//  <div className="navbar-header">
//    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
//          <span className="sr-only">Toggle navigation</span>
//          <span className="icon-bar"></span>
//          <span className="icon-bar"></span>
//          <span className="icon-bar"></span>
//        </button>
//  </div>
//  {/*<a className="navbar-brand" href="#">Brand</a>*/}
// </div>

// If we want a drop down:
// <li className="dropdown">
//   <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
//   <ul className="dropdown-menu" role="menu">
//     <li><a href="#">Action</a></li>
//     <li><a href="#">Another action</a></li>
//     <li><a href="#">Something else here</a></li>
//     <li className="divider"></li>
//     <li><a href="#">Separated link</a></li>
//     <li className="divider"></li>
//     <li><a href="#">One more separated link</a></li>
//   </ul>
// </li>
