import React from 'react'
import { connect } from 'react-redux'
import { actions } from './ducks'

export const connectButton = (props) => {
  const { handleOnClick } = props
  return <button onClick={handleOnClick}>Connect</button>
}

const MapDispatchToProps = (dispatch) => {
  return {
    handleOnClick: () => dispatch(actions.connectToWatson())
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.watson
  }
}

export const ConnectButtonContainer = connect(
  mapStateToProps,
  MapDispatchToProps
)(connectButton)
