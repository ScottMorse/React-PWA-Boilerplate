import { combineReducers } from 'redux'

const exampleReducer = (action, state = {}) => {
  switch(action.type){
    case 'EXAMPLE_REDUCER':
      return {}
    default:
      return state
  }
}

export default rootReducer = combineReducers({
  exampleReducer
})