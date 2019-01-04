import React from 'react'
import { connect } from 'react-redux'
import { actions } from './ducks'

export const disconnectButton = (props) => {
  const { handleOnClick } = props
  return <button onClick={handleOnClick}>Disconnect</button>
}

const MapDispatchToProps = (dispatch) => {
  return {
    handleOnClick: () => dispatch(actions.disconnectFromWatson())
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.watson
  }
}

export const DisconnectButtonContainer = connect(
  mapStateToProps,
  MapDispatchToProps
)(disconnectButton)
