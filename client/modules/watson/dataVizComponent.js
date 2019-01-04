import React from 'react'
import { connect } from 'react-redux'

export const dataViz = (props) => {
  return <div>Hello</div>
}

const mapStateToProps = (state) => {
  return {
    ...state.watson
  }
}

export const DataVizContainer = connect(mapStateToProps)(dataViz)
