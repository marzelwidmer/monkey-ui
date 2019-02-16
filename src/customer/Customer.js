import React, { Component } from "react"

// require traverson and traverson-hal
var traverson = require("traverson")
var JsonHalAdapter = require("traverson-hal")
// register the traverson-hal plug-in for media type 'application/hal+json'
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter)
const url = `http://monkey-app-dev.apps.c3smonkey.ch/`

export default class Customer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: []
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.fetchData(), 5000);  
  }
  componentWillUnmount() {
    this.timer = null;
  }

  fetchData = () => {
    this.setState({...this.state, isFetching: true})
     //  use Traverson to follow links, as usual
     traverson
     .from(url)
     .jsonHal()
     .follow("self", "get-all-customers")
     .getResource((error, document) => {
       if (error) {
         console.error('No luck :-) - problem to fetch resource ')
       } else {
         console.log('We have followed the path and reached our destination.')        
         const myObjStr = JSON.stringify(document)
         console.log(myObjStr)

         this.setState({
           result: JSON.parse(JSON.stringify(document))._embedded.customers
         })
       }
      })
  }
  render() {
    const customers = this.state.result.map((item, i) => (
     
     <div key={item.customerId}>
        <h2>{ item.firstName }, { item.lastName } </h2>
        <span>{ item.address.city }, { item.address.country }</span>
        <br/>
        <span><i>{ item.address.street }</i></span>
        <hr color="#19ff2d"/>
      </div>
    ));
    return (
      <div id="layout-content" className="layout-content-wrapper">
         <div className="panel-list">{customers}</div>
      </div>
    )
  }
}
