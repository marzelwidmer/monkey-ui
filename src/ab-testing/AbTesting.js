import React, { Component } from "react"
import { Alert } from "reactstrap"
import abTestingImg from "./a-b-testing.png"

const ACTUATOR_SERVICE_URL = `http://ab-route-dev.apps.c3smonkey.ch/actuator/info`

const divStyle = {
  padding: "10px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "50%",
  color: "#4db1e8",
  textAlign: "center",
  fontFamily: "sans-serif"
}

const ImageAbTesting = () => (
  <div style={divStyle}>
    <img src={abTestingImg} width="500" height="200" alt="abTesting" />
  </div>
)
 

export default class AbTesting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.fetchData()
    this.timer = setInterval(() => this.fetchData(), 500)
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
        <h2 class="text-center ">A-B Testing - service call {this.state.count}</h2>
        <ImageAbTesting />
        <div className="panel-list">
          <Alert color={`${this.state.actuator.git.branch === "feature2" ? "success" : "primary"}`} className="code">
          Call service feature1(90%) and feature2(10%) - Service {this.state.actuator.build.artifact} with version {this.state.actuator.build.version}
          </Alert>
        <p></p>
        </div>
      </div>
    )
  }
}
