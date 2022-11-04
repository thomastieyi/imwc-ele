import fs from "fs"
import logger from "electron-log"
import { contextBridge, ipcRenderer } from "electron"
const remote = require("@electron/remote")
const net = require("net")
const TcpClient: typeof import("./tcp-client").TcpClient = require("./tcp-client").TcpClient
console.log("connecting to server...")

// const a = new TcpClient.TcpClient()
// const client = net.connect({ server: "192.168.23.1", port: 12345 }, function () {
//   console.log("client connected")

//   // send data
//   console.log("send data to server")
// })

// client.sendto = (msg: String) => {
//   client.write(msg)
// }

// --------- Expose some API to Renderer process ---------
contextBridge.exposeInMainWorld("$fs", fs)
contextBridge.exposeInMainWorld("$logger", logger)
contextBridge.exposeInMainWorld("$remote", withPrototype(remote))
contextBridge.exposeInMainWorld("$ipcRenderer", withPrototype(ipcRenderer))
contextBridge.exposeInMainWorld("$tcpClient", TcpClient)

// `exposeInMainWorld` can not detect `prototype` attribute and methods, manually patch it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === "function") {
      // Some native API not work in Renderer-process, like `NodeJS.EventEmitter['on']`. Wrap a function patch it.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}
