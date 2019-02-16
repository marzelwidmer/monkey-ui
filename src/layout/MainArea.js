import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

class MainArea extends Component {
  render() {
    return (
        <Container fluid={true} className="Main">
           <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          
        </Container>
    )
  }
}

export default MainArea
