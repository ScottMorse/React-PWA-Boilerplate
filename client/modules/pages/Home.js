import React from 'react'
import { ConnectButtonContainer } from '../watson/connectButton'
import { DisconnectButtonContainer } from '../watson/disconnectButton'
import { DataVizContainer } from '../watson/dataVizComponent'

export const Home = (props) => {
  return (
    <div className="HomeRoot">
      <div className="buttonsWrapper">
        <ConnectButtonContainer />
        <DisconnectButtonContainer />
      </div>
      <div className="dataWrapper">
        <DataVizContainer />
      </div>
    </div>
  )
}
