import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./css/navbar.css"

class Navbar extends Component {
  render() {
    return(
      <ul className="navbar">
        <li className="navbar__link"><Link to="/"><p>Home</p></Link></li>
        <li className="navbar__link"><Link to="/create"><p>Create</p></Link></li>
        <li className="navbar__link"><Link to="/cities"><p>Cities</p></Link></li>
      </ul>
    )
  }
}

export default Navbar;