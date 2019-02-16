import React, { Component } from "react"

export class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    
    componentDidMount() {
      this.timerID = setInterval(
        () => this.setState({date: new Date()}),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    render() {
      return (
        <div>
           <h6 style={{ color: this.props.clockColor }}>{this.state.date.toLocaleTimeString()}</h6>
        </div>
      );
    }
  }