import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import HomepageLayout from './layout/HomepageLayout';
 
class App extends Component {
  render() {
    document.title = "MonkeyUI"
    return (
      <div>

        <HomepageLayout />
    
      </div>
    )
  }
}

export default App
