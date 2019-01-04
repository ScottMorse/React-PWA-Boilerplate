import { put, all, takeEvery, call } from "redux-saga/effects"
import { appClient } from "./config"
import Secrets from "./secrets"
/**
 *  ? STATE
 */
const initialState = {
  connected: false,
  temperature: []
}

/**
 *  ? REDUCER
 */
export const watsonReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DATA:
      switch (action.payload.deviceType) {
        case "temperature":
          return {
            ...state,
            temperature: [action.payload.data, ...state.temperature]
          }
        default:
          return state
      }
    case toggleConnectionOn:
      return {
        ...state,
        connected: true
      }
    default:
      return state
  }
}

/**
 *  ? TYPES
 */

// To Redux Saga
const CONNECT = "CONNECT"
const DISCONNECT = "DISCONNECT"
const CONNECTION_ON = "CONNECTION_ON"
const CONNECTION_OFF = "CONNECTION_OFF"

// To Reducer
const POST_DATA = "POST_DATA"

/**
 *  ? ACTION CREATORS
 */
const postData = (data, deviceType) => {
  return {
    type: POST_DATA,
    payload: {
      data,
      deviceType
    }
  }
}

const toggleConnectionOn = () => ({
  type: CONNECTION_ON
})
const toggleConnectionOff = () => ({
  type: CONNECTION_OFF
})

const connectToWatson = () => {
  return {
    type: CONNECT
  }
}
const disconnectFromWatson = () => {
  return {
    type: DISCONNECT
  }
}

export const actions = {
  postData,
  connectToWatson,
  disconnectFromWatson
}

/**
 *  ? SAGAS
 */
export function* watsonSaga() {
  yield all([listenConnect()])
}

export function* listenConnect() {
  yield takeEvery(CONNECT, connectSaga)
  yield takeEvery(DISCONNECT, disconnectSaga)
}

function* connectSaga() {
  yield call(connect)
  yield put(toggleConnectionOn())
}

function* disconnectSaga() {
  yield call(disconnect)
  yield put(toggleConnectionOff())
}

function connect() {
  try {
    appClient.connect()
  } catch (err) {
    console.log("Error in connecting to app client")
  }
}

function disconnect() {
  /**
   * TODO Maybe Check State for connection instead of disconnect() method.
   */
  try {
    appClient.unsubscribeToDeviceEvents(Secrets.DEVICE_TYPE)
    appClient.disconnect()
  } catch (err) {
    console.log(err)
    console.log("Error: no connection to disconnect")
  }
}

/**
 * TODO add IS_LISTENER_ON to state
 */
let IS_LISTENER_ON = false
export const customMiddleware = store => next => action => {
  if (!IS_LISTENER_ON) {
    IS_LISTENER_ON = true
    appClient.on(
      "deviceEvent",
      (deviceType, deviceId, eventType, format, payload) => {
        let data = JSON.parse(payload)
        store.dispatch(postData(data, "temperature"))
      }
    )
    console.log("Middleware triggered:", action)
  }
  next(action)
}
