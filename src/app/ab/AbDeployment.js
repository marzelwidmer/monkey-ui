import React, { Component } from "react"
import { Alert } from "reactstrap"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import imgA from "./ab-testing-1.png"
import imgB from "./ab-testing-2.png"

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
    fetch(this.props.service_url)
      .then(response => response.json())
      .then(result => this.setState({ actuator: result, isFetching: false }))
      .catch(e => console.log(e))
  }

  render() {
    if (!this.state.actuator) return <p>Loading...</p>
    return (    
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list"> 
        <p> Set router 80/20 : <br/>
        <code>
            oc set route-backends ab-route feature1=80 feature2=20
        </code> 
        </p>
        <p>Set +10% for feature1 : <br/>
        <code>
          oc set route-backends ab-route --adjust feature1=+10%
        </code> 
        </p>
          <div>
            <RoutingTable />
          </div>
          <div>&nbsp;</div>
          <div>
            <Alert color={`${this.state.actuator.git.branch === "feature2" ? "success" : "primary"}`} className="code">
              Hit service <i><b>{this.state.actuator.build.artifact} </b></i>  {this.state.count} times. <br/>
              Version : <i><b> {this.state.actuator.build.version} </b></i>
            </Alert>
            <img src={`${this.state.actuator.git.branch === "feature2" ? imgB : imgA}`} width="400" height="200" alt="ab" />
          </div>
        </div>
      </div>
    )
  }
}
const RoutingTable = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>NAME</Table.HeaderCell>
        <Table.HeaderCell>HOST/PORT</Table.HeaderCell>
        <Table.HeaderCell>SERVICES</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label ribbon>ab-route</Label>
        </Table.Cell>
        <Table.Cell>ab-route-dev.apps.c3smonkey.ch</Table.Cell>
        <Table.Cell>feature1(80%),<br/>feature2(20%)</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)
