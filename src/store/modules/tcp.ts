import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
const net: typeof import("net") = require("net")
export const useTcpStore = defineStore("tcpclient", () => {
  const client = new net.Socket()
  const state = ref("UNCONNECTED")

  client.on("close", (s) => {
    state.value = "UNCONNECTED"
    console.log("close")
  })
  client.on("end", (s) => {
    state.value = "UNCONNECTED"
    console.log("end")
  })

  const conn = async (port: number, host: string): Promise<string> => {
    const res = new Promise<any>((resolve, reject) => {
      if (state.value != "CONNECTED") {
        try {
          client.connect(port, host, () => {
            state.value = "CONNECTED"
            resolve(state.value)
          })
        } catch (error: any) {
          reject(error)
        }
      } else {
        resolve(state.value)
      }
    })
    return res
  }

  const sent = async (msg: any): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      try {
        client.write(msg, (error) => {
          if (error) {
            state.value = "UNCONNECTED"
            reject(error)
          }
        })
        resolve(msg)
      } catch (error) {
        state.value = "UNCONNECTED"
        reject(error)
      }
    })
    return res
  }

  const recv = async (): Promise<any> => {
    const res = new Promise<any>((resolve, reject) => {
      client.on("data", (data) => {
        resolve(data)
      })
    })
    return res
  }

  return { client, conn, sent, recv, state }
})

/** 在 setup 外使用 */
export function useTcpStoreHook() {
  return useTcpStore(store)
}
