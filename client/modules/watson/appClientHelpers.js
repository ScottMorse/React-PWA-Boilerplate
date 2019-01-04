export const subscribeToDevice = (appClient, callBack) => {
  appClient.on('deviceEvent', callBack)
}

export const rebootDevice = (appClient, deviceType, deviceId) => {
  // appClient.publishDeviceEvent(deviceType, deviceId, 'reboot', 'json')
  appClient.unsubscribeToDeviceEvents(deviceType)
}

export const logData = (deviceType, deviceId, eventType, format, payload) => {
  console.log(
    `[${deviceType}] :: ${payload}`
    // `[App] Device Event (${eventType}) from ${deviceType} sensor [${deviceId}]:\n\t${payload}\n`
  )
}
