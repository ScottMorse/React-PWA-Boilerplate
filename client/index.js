import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./index.css"
import App from "./App"
import store from "./store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

if ('serviceWorker' in navigator){
  navigator.serviceWorker
    .register('./sw.js')
      .then(() => console.log('[App] Service Worker Registered'))
      .catch((e) => console.log('[App] SW Registration error\n',e))
}