import React, { Component } from "react"
import { Alert } from "reactstrap"

import abTesting1 from "./ab-testing-1.png"
import abTesting2 from "./ab-testing-2.png"
 
const ACTUATOR_SERVICE_URL = `http://ab-route-dev.apps.c3smonkey.ch/actuator/info`
  
export default class AbDeployment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(() => this.fetchData(), 1000)
  }
  componentWillUnmount() {
    this.timer = null
  }

  
  incrementCount(){
    this.setState({
      count: this.state.count + 1
    })
  }

  fetchData = () => {
    this.incrementCount()
    this.setState({ ...this.state, isFetching: true })
    fetch(ACTUATOR_SERVICE_URL)
      .then(response => response.json())
      .then(result => this.setState({ actuator: result, isFetching: false }))
      .catch(e => console.log(e))
  }

  render() {
    if (!this.state.actuator) return <p>Loading...</p>
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">
          <Alert color={`${this.state.actuator.git.branch === "feature2" ? "success" : "primary"}`} className="code">
            Hit service <i><b>{this.state.actuator.build.artifact} </b></i>  {this.state.count} times. <br/>
            Service version :{this.state.actuator.build.version}
          </Alert>

          
          <img src={`${this.state.actuator.git.branch === "feature2" ? abTesting2 : abTesting1}`} width="500" height="200"  alt="ab" />
        </div>
      </div>
    )
  }
}
