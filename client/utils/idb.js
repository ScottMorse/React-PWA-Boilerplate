import idb from 'idb'

const idbPromise = 'indexedDB' in window 
  ? 
  idb.open('pwa-idb', 1, 
    updateDb => {
      //add all object stores needed here
      if (!updateDb.objectStoreNames.contains('things')) {
        updateDb.createObjectStore('things', {keyPath: 'id'})
      }
    }
  )
  : 
  null

//id should be int, data should probably be object
export const saveLocal = (storeName, id, data) => {
  if (!('indexedDB' in window)) return null
  return idbPromise.then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName)
    store.put({id, data})
      .catch((e) => {
        tx.abort()
        console.log(e)
        throw Error('Something was not added to the store: ' + storeName)
      })
  })
}

export const getAllLocal = (storeName) => {
  if (!('indexedDB' in window)) return null
  return idbPromise.then(db => {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    return store.getAll()
  })
}

export const getLocalById = (storeName,id) => {
  if (!('indexedDB' in window)) return null
  return idbPromise.then(db => {
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    return store.get(id)
  })
}

//example code from Google, may not be that helpful
export const getNetworkFirst = () => {
// getServerData()
// .then(dataFromNetwork => {
//   updateUI(dataFromNetwork)
//   saveLocal(dataFromNetwork)
//   .then(() => {
//     setLastUpdated(new Date())
//     messageDataSaved()
//   }).catch(err => {
//     messageSaveError()
//     console.warn(err)
//   })
// }).catch(err => {
//   console.log('Network requests have failed, this is expected if offline')
//   getLocal()
//   .then(offlineData => {
//     if (!offlineData.length) {
//       messageNoData()
//     } else {
//       messageOffline()
//       updateUI(offlineData) 
//     }
//   })
// })
}

export default idbPromise