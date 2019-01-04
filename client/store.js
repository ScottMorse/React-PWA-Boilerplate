import { createStore, combineReducers, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { all } from "redux-saga/effects"
import {
  watsonReducer,
  watsonSaga,
  customMiddleware
} from "./modules/watson/ducks"
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({
  watson: watsonReducer
})
function* rootSaga() {
  yield all([watsonSaga()])
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, customMiddleware))
)
sagaMiddleware.run(rootSaga)
export default store
