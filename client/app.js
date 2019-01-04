import React, { Component } from 'react'

import { Home } from "./modules/pages/Home"

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    )
  }
}

// import idb from './utils/idb'
// import bluetooth from './utils/bluetooth'

// class App extends Component {

//   testBluetooth = () => {
//     if(!bluetooth) return alert("Bluetooth is not available!")
//     bluetooth.requestDevice({acceptAllDevices: true})
//   }

//   render(){
//       return <div>
//         <p>What hath God wrought?</p>
//         <button onClick={this.testBluetooth}>Test Bluetooth</button>
//       </div>
//   }
// }