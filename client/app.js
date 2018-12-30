import React, { Component } from 'react'
import { render } from 'react-dom'

//register service worker like normal, built by webpack along with bundle
if ('serviceWorker' in navigator){
  navigator.serviceWorker
    .register('./static/sw.js')
      .then(() => console.log('[App] Service Worker Registered'))
      .catch((e) => console.log('[App] SW Registration error\n',e))
}

import idb from './utils/idb'
import bluetooth from './utils/bluetooth'

class App extends Component {

  testBluetooth = () => {
    if(!bluetooth) return alert("Bluetooth is not available!")
    bluetooth.requestDevice({acceptAllDevices: true})
  }

  render(){
      return <div>
        <p>What hath God wrought?</p>
        <button onClick={this.testBluetooth}>Test Bluetooth</button>
      </div>
  }
}

render(<App/>,document.getElementById('root'))