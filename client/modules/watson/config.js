import Secrets from "./secrets"
import * as Client from "ibmiotf"

const DOMAIN = "internetofthings.ibmcloud.com"
const AUTH_METHOD = "token"

const config = {
  org: Secrets.org,
  id: Secrets.id,
  domain: DOMAIN,
  type: "shared",
  "auth-method": AUTH_METHOD,
  "auth-key": Secrets.key,
  "auth-token": Secrets.token
}

/**
 * APP CLIENT CONFIG
 */
export const appClient = new Client.IotfApplication(config)

appClient.log.setLevel("error")

appClient.on("connect", () => {
  console.log("[App IBM Client] Connection Successful 🚀")
  appClient.subscribeToDeviceEvents()
})

appClient.on("disconnect", () => {
  console.log("[App IBM Client] Disconnection Successful 💔 ")
})

// appClient.on(
//   'deviceEvent',
//   (deviceType, deviceId, eventType, format, payload) => {
//     console.log(
//       `[App IBM Client] Device Event (${eventType}) from ${deviceType} sensor [${deviceId}]:\n\t${payload}\n`
//     )
//   }
// )

/**
 * DEVICE CLIENT CONFIG
 */
// export const deviceClient = new Client.IotfDevice(config)
