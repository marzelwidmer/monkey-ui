import React, { Component } from "react"
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"
import "./Layout.css"
import { Clock } from "../timer/Clock"
 
class TopNav extends Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="xl" >
          <NavbarBrand href="/">MonkeyApp <Clock clockColor="#1ac545" /></NavbarBrand>
           
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/c3smonkey/">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
         
      </div>
    )
  }
}

export default TopNav
