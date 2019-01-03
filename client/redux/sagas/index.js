import * as actions from '../actions'
import { take, put, call, fork, select, all } from 'redux-saga/effects'

function* exampleSaga(){

}

export default function* root() {
  yield all([
    take(exampleSaga)
  ])
}